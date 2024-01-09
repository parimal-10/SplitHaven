import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID, searchQuery} = await request.json();

        const users = await prisma.users.findMany({
            where: {
                email: {
                    startsWith: searchQuery
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                friends_friends_user_id1Tousers: {
                    where: {
                        OR: [
                            {user_id1 : userID},
                            {user_id2: userID}
                        ]
                    }
                },
                friends_friends_user_id2Tousers: {
                    where: {
                        OR: [
                            {user_id1 : userID},
                            {user_id2: userID}
                        ]
                    }
                }
            }
        });

        return NextResponse.json(users, { status: 201 });

    } catch (err) {
        console.log("Error getting users", err);
        return NextResponse.json({ status: 401 });
    } finally {
        prisma.$disconnect();
    }
}