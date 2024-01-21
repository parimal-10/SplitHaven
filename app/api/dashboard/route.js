import { authOptions } from "@/app/lib/auth"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST() {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;
    const prisma = new PrismaClient();

    try {
        
        const userData = await prisma.users.findUnique({
            where: {
                id: userID
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true
            }
        })

        return NextResponse.json(userData, { status: 201 });
    } catch (err) {
        console.error("Error processing request:", err);
        return NextResponse.json({ error: "Invalid request" }, { status: 401 });
    } finally {
        await prisma.$disconnect();
    }
}
