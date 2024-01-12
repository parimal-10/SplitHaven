"use client"
import React, { useState } from "react"
import axios from "axios"

export default function SearchUserCard({ userID, user, label }) {
    const username = user.email.slice(0, user.email.lastIndexOf("@"));
    const [sent, setSent] = useState(false);

    async function sendFriendRequest(friendID) {
        try {

            await axios.post("/api/dashboard/friends/sendFriendRequest", { userID, friendID });
            setSent(true);

        } catch (err) {
            console.log("Error adding friend", err);
        }
    }

    async function addToTrip(friendID) {
        try {
            
            await axios.post("/api/dashboard/trips/addToTrip", {friendID})

        } catch (err) {
            console.log("Error adding to the trip");
        }
    }

    return (
        <div key={user.id} className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg flex items-center">
            <img src={`/avatar-${user.avatar}.jpg`} className="mr-2 h-8 w-8 rounded-full"></img>

            <p className="mr-2">{username} ({user.name})</p>

            {(user.friends_friends_user_id1Tousers.length > 0 || user.friends_friends_user_id2Tousers.length > 0) ? (

                <div></div>

            ) : sent ? (

                <button
                    className="bg-neededCyan text-white p-1 px-2 rounded-md"
                    onClick={function () {
                        send(user.id);
                        setSent(false);
                    }}
                >
                    {label.addText}
                </button>

            ) : (

                <button
                    key={user.id}
                    className="bg-neededBlue text-white p-1 rounded-md hover:bg-neededPurple"
                    onClick={function () {
                        send(user.id);
                        setSent(true);
                    }}
                >
                    {label.addedText}
                </button>
            )}
        </div>
    )
}