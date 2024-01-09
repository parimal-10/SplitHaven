import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"

export async function POST(req) {
    const prisma = new PrismaClient();  

    try {
        const body = await req.json();

        const hashedPassword = await hash(body.password, 10);

        const newUser = await prisma.users.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        })

        const {password: newUserPassword, avatar: avatar, ...rest } = newUser;
        return NextResponse.json(rest, {status: 201});

    } catch (err) {
        console.log("Sending duplicate email error");
        return NextResponse.json({error: "*Email already exists"}, {status: 202});
    } finally {
        await prisma.$disconnect();
    }
}