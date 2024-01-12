import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID} = await request.json();

        const friends = await prisma.friends.findMany({
            where: {
                OR: [
                    {user_id1: userID},
                    {user_id2: userID}
                ]
            },
            select: {
                users_friends_user_id1Tousers: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                },
                users_friends_user_id2Tousers: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        });

        return NextResponse.json(friends, {status: 201});

    } catch (err) {
        console.log("Error getting friends");
        return NextResponse.json({status: 401});
    } finally {
        await prisma.$disconnect();
    }
}