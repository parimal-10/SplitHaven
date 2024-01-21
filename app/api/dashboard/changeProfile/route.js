import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {updates, userID} = await request.json();

        const updateData = {};

        if (updates.name) {
            updateData.name = updates.name;
        }
        if (updates.avatar) {
            updateData.avatar = Number(updates.avatar);
        }
        if (updates.password) {
            const hashedPassword = await hash(updates.password, 10);
            updateData.password = hashedPassword;
        }

        if (Object.keys(updateData).length > 0) {
            try {

                await prisma.users.update({
                    where: {
                        id: userID,
                    },
                    data: updateData,
                });

            } catch (err) {
                console.log("Error in updating user", err);
            }
        }

        return NextResponse.json({ status: 201 });

    } catch (err) {
        return NextResponse.json({ status: 401 });
    } finally {
        await prisma.$disconnect();
    }
}