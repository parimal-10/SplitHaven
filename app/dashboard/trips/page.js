import React from "react"
import TripCard from "../../components/dashboard/trips/TripCard.js"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"

import CreateTrip from "@/app/components/dashboard/trips/CreateTrip.js"
import "../../globals.css"
import axios from "axios"

export default async function Trips() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;
  const baseUrl = process.env.BASE_URL;

  let tripsData;

  try {

    const response = await axios.post(`${baseUrl}/api/dashboard/trips`, { userID });
    tripsData = response.data;

  } catch (err) {

  }

  return (
    <div className="container mx-auto mt-8 max-[640px]:flex max-[640px]:justify-center">
      <CreateTrip userID={userID} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {tripsData && tripsData.map((trip) => (
          <TripCard key={trip.trip_id} trip={trip} userID={userID}/>
        ))}
      </div>
    </div>
  );
}
