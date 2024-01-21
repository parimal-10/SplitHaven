import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {userID, name, starDate} = await request.json();

        const trip = await prisma.trips.create({
            data: {
                name: name,
                start_date: starDate
            }
        });

        const tripID = trip.id;

        try {

            await prisma.user_trips.create({
                data: {
                    user_id: userID,
                    trip_id: tripID
                }
            });

        } catch (err) {
            console.log("Error adding user to the trip", err);
        }

        return NextResponse.json(tripID, {status: 201});

    } catch (err) {
        console.log("Error creating trip", err);
        return NextResponse.json({status: 401});
    } finally {
        prisma.$disconnect();
    }
}