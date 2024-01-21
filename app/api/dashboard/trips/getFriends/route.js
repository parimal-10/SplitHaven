import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

async function filterData(userID, friends) {
    let filteredData = [];
    friends.forEach(friend => {
        let data;
        let data2;

        if (friend.users_friends_user_id1Tousers.id != userID) {
            data = friend.users_friends_user_id1Tousers;
        } else {
            data = friend.users_friends_user_id2Tousers;
        }

        if (data.user_trips.length > 0) {
            data2 = {...data, already: true};
        } else {
            data2 = {...data, already: false};
        }
        
        filteredData.push(data2);
    });

    return filteredData;
}

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const { userID, tripID } = await request.json();

        const friends = await prisma.friends.findMany({
            where: {
                OR: [
                    { user_id1: userID },
                    { user_id2: userID }
                ]
            },
            select: {
                users_friends_user_id1Tousers: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        avatar: true,
                        user_trips: {
                            where: {
                                trip_id: tripID
                            }
                        }
                    }
                },
                users_friends_user_id2Tousers: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        avatar: true,
                        user_trips: {
                            where: {
                                trip_id: tripID
                            }
                        }
                    }
                }
            }
        });

        const friendsData = await filterData(userID, friends);

        return NextResponse.json(friendsData, { status: 201 });

    } catch (err) {
        console.log("Error getting friends", err);
        return NextResponse.json({ status: 401 });
    } finally {
        prisma.$disconnect();
    }
}