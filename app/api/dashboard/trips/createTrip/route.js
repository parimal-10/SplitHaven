import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID, name, starDate} = await request.json();
        return NextResponse.json({status: 201});

    } catch (err) {
        return NextResponse.json({status: 401});
    } finally {
        prisma.$disconnect();
    }
}