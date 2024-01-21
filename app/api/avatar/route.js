import { authOptions } from "@/app/lib/auth"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST() {

    const prisma = new PrismaClient();

    try {

        const session = await getServerSession(authOptions);
        const userID = session.user.id;

        const avatar = await prisma.users.findUnique({
            where: {
                id: userID
            },
            select: {
                avatar: true
            }
        });

        return NextResponse.json(avatar, { status: 201 });

    } catch (err) {
        console.log("Error getting the details in navbar", err);
        return NextResponse.json({ status: 401 });
    } finally {
        await prisma.$disconnect();
    }
}