import React from "react"
import TripCard from "../../components/dashboard/trips/TripCard.js"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { PrismaClient } from "@prisma/client"
import CreateTrip from "@/app/components/dashboard/trips/CreateTrip.js"
import "../../globals.css"

export default async function Friends() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  const prisma = new PrismaClient();
  let tripsData;

  try {

    tripsData = await prisma.user_trips.findMany({
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

  } catch (err) {
    console.log("error getting details of trips", err);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <div className="container mx-auto mt-8 max-[640px]:flex max-[640px]:justify-center">
      <CreateTrip userID={userID} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {tripsData.map((trip) => (
          <TripCard key={trip.trip_id} trip={trip} userID={userID}/>
        ))}
      </div>
    </div>
  );
}
