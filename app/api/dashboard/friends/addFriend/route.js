import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {requestID, userID, friendID} = await request.json();

        await prisma.friends.create({
            data: {
                user_id1: userID,
                user_id2: friendID
            }
        });

        await prisma.friend_requests.delete({
            where: {
                id: requestID
            }
        });

        return NextResponse.json({status: 201});
         
    } catch (err) {
        console.log("Error adding friend", err);
        return NextResponse.json({status: 401});
    } finally {
        await prisma.$disconnect();
    }
}