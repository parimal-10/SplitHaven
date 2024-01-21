"use client"
import React, { useState } from "react"
import axios from "axios"
import User from "../../user/User";

export default function FriendRequestFriendCard({ userID, friend }) {
    const [added, setAdded] = useState(false);

    async function addFriend(requestID, friendID) {
        try {

            await axios.post("/api/dashboard/friends/addFriend", { requestID, userID, friendID });
            setAdded(true);

        } catch (err) {
            console.log("Error adding friend");
        }
    }

    return (

        <div
            className="p-4 shadow-md rounded-md mt-4 mb-4 flex items-center max-w-sm min-w-fit cursor-pointer"
        >

            <User email={friend.users_friend_requests_sendTousers.email} avatar={friend.users_friend_requests_sendTousers.avatar} name={friend.users_friend_requests_sendTousers.name} />

            {added ? (

                <div className="bg-neededCyan text-white p-1 px-2 rounded-md">
                    <p className="m-0 p-0">Added</p>
                </div>

            ) : (

                <button
                    className="bg-neededBlue text-white p-1 px-2 rounded-md hover:bg-neededPurple ml-auto"
                    onClick={() => addFriend(friend.id, friend.users_friend_requests_sendTousers.id)}
                >
                    Add
                </button>

            )}

        </div>
    )
}