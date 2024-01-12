import FriendCard from "@/app/components/dashboard/friends/FriendCard";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const prisma = new PrismaClient();

    try{

        const {tripID, userID, description, startDate, data} = await request.json();
        console.log(tripID, userID, description, startDate, data);

        for (const [friendId, amount] of Object.entries(data)) {
            await prisma.trip_transactions.create({
                data: {
                    trip_id: tripID,
                    payer_id: userID,
                    payee_id: Number(friendId),
                    amount: Number(amount),
                    description: description,
                    time: startDate
                }
            });
        }

        return NextResponse.json({staus: 201});

    } catch (err) {
        console.log("Error adding expends in trip");
        return NextResponse.json({status: 401})
    } finally {
        prisma.$disconnect();
    }
}