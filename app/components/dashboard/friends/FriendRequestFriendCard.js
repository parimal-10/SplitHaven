"use client"
import React, { useState } from "react"
import axios from "axios"

export default function FriendRequestFriendCard({ friend, userID }) {
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

            <img src={`/avatar-${friend.users_friend_requests_sendTousers.avatar}.jpg`} className="mr-4 h-8 w-8 rounded-full"></img>

            <h3 className="text-xl font-semibold mr-2">
                {friend.users_friend_requests_sendTousers.email.slice(0, friend.users_friend_requests_sendTousers.email.lastIndexOf("@"))} ({friend.users_friend_requests_sendTousers.name})
            </h3>

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