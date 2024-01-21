import React from "react"
import FriendCard from "../../components/dashboard/friends/FriendCard"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import axios from "axios"
import SearchUser from "@/app/components/searchFeature/SearchUser"
import FriendRequest from "@/app/components/dashboard/friends/FriendRequest"
import "../../globals.css"

export default async function Friends() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;
  const baseUrl = process.env.BASE_URL;
  let friendsData = [];

  try {
    const response = await axios.post(`${baseUrl}/api/dashboard/friends`, { userID });
    friendsData = response.data;
  } catch (err) {
    console.log("Error sending post request", err);
  }

  return (
    <div className="container mx-auto mt-8 flex flex-col max-[640px]:flex max-[640px]:justify-center">

      <div className="flex justify-between">
        <SearchUser userID={userID} />
        <FriendRequest userID={userID} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center mt-4">
        {friendsData.map((friend) => (
          <FriendCard key={friend.id} userID={userID} friend={friend} />
        ))}
      </div>
    </div>
  );
}
