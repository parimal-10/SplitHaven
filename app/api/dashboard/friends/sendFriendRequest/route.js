import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID, friendID} = await request.json();
        
        await prisma.friend_requests.create({
            data: {
                send: userID,
                recieve: friendID
            }
        });

        return NextResponse.json({status: 201});

    } catch (err) {
        console.log("Error adding friend");
        return NextResponse.json({status: 401});
    } finally {
        prisma.$disconnect();
    }
}