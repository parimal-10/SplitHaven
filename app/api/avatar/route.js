import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    const userID = session.user.id;
    const prisma = new PrismaClient();
    const avatar = await prisma.users.findUnique({
        where: {
            id: userID
        },
        select: {
            avatar: true 
        }
    })
    prisma.$disconnect();

    return NextResponse.json(avatar, {status: 201});
}