import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {tripID, friendID} = await request.json();

        await prisma.user_trips.create({
            data: {
                trip_id: tripID,
                user_id: friendID
            }
        });

        return NextResponse.json({status: 201});

    } catch (err) {
        console.log("Error adding friend to the trip");
        return NextResponse.json({status: 401});
    } finally {
        await prisma.$disconnect();
    }
}