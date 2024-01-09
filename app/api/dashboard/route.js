import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    try {
        const prisma = new PrismaClient();

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

        prisma.$disconnect();

        return NextResponse.json(userData, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 202 });
    }
}
