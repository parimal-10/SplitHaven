import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID} = await request.json();

        const tripsData = await prisma.user_trips.findMany({
            where: {
                user_id: userID
            },
            select: {
                trip_id: true,
                trips: {
                    select: {
                        name: true,
                        start_date: true,
                        user_trips: {
                            select: {
                                user_id: true,
                                users: {
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true
                                    }
                                }
                            }
                        },
                        trip_transactions: {
                            select: {
                                id: true,
                                payer_id: true,
                                payee_id: true,
                                amount: true,
                                description: true,
                                time: true,
                                users_trip_transactions_payer_idTousers: {
                                    select: {
                                        email: true,
                                        name: true
                                    }
                                }
                            },
                            where: {
                                OR: [
                                    { payer_id: userID },
                                    { payee_id: userID }
                                ]
                            },
                            orderBy: {
                                time: "desc"
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(tripsData, {status: 201});

    } catch (err) {
        console.log("error getting details of trips", err);
        return NextResponse.json({status: 401});
    } finally {
        await prisma.$disconnect();
    }
}