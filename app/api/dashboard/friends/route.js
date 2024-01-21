import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();
    const friendsData = [];

    try {

        const { userID } = await request.json();

        const friends = await prisma.friends.findMany({
            where: {
                OR: [
                    {
                        user_id1: userID,
                    },
                    {
                        user_id2: userID,
                    },
                ],
            },
        });

        try {
            for (const friend of friends) {
                let friendData;
                let friendTransactions;
                let friendID = userID != friend.user_id1 ? friend.user_id1 : friend.user_id2;
                let balance = 0;

                friendData = await prisma.users.findUnique({
                    where: {
                        id: friendID,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    },
                });

                try {

                    friendTransactions = await prisma.friend_transactions.findMany({
                        where: {
                            OR: [
                                {
                                    payer_id: userID,
                                    payee_id: friendID
                                },
                                {
                                    payer_id: friendID,
                                    payee_id: userID
                                }
                            ]
                        },
                        orderBy: {
                            time: "desc"
                        }
                    })

                } catch (err) {
                    console.log("Error getting transaction of friend", err);
                }

                friendTransactions.forEach(transaction => {
                    if (transaction.payer_id === userID) {
                        balance += Number(transaction.amount);
                    } else {
                        balance -= Number(transaction.amount);
                    }
                });

                const combinedFriend = {
                    ...friendData,
                    balance: balance,
                    transactions: friendTransactions
                };

                friendsData.push(combinedFriend);
            }
        } catch (err) {
            console.log("Error getting extra details of friends", err);
        }

    } catch (err) {
        console.log("error getting friends", err);
    } finally {
        await prisma.$disconnect();
    }

    return NextResponse.json(friendsData, { status: 201 });
}