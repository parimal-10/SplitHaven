import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try{

        const userID = await request.json();

        const requests = await prisma.friend_requests.findMany({
            where: {
                recieve: userID
            },
            select : {
                id: true,
                users_friend_requests_sendTousers: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                }
            }   
        })

        return NextResponse.json(requests, {status: 201});

    } catch (err) {
        console.log("Error getting friend requests", err);
        return NextResponse.json({status: 401});
    } finally {
        await prisma.$disconnect();
    }
}