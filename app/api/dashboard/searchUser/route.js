import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

async function filterData(response) {
    let filteredData = [];
    response.forEach(user => {
        let data;
        if (user.friends_friends_user_id1Tousers.length > 0 || user.friends_friends_user_id2Tousers.length > 0) {
            data = {...user, already: true};
        } else {
            data = {...user, already: false};
        }
        filteredData.push(data);
    });
    return filteredData;
}

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID, searchQuery} = await request.json();

        const response = await prisma.users.findMany({
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

        const users = await filterData(response);

        return NextResponse.json(users, { status: 201 });

    } catch (err) {
        console.log("Error getting users", err);
        return NextResponse.json({ status: 401 });
    } finally {
        await prisma.$disconnect();
    }
}