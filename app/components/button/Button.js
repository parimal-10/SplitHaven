"use client"
import React, {useState} from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"

export default function Button({ key, userID, friendID, already, label, pathname }) {
    const [sent, setSent] = useState(false);
    const searchParams = useSearchParams();

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

            const tripID = Number(searchParams.get("tripID"));
            await axios.post("/api/dashboard/trips/addToTrip", { tripID, friendID });
            setSent(true);

        } catch (err) {
            console.log("Error adding to the trip", err);
        }
    }

    async function handleButtonAdd(friendID) {
        if (pathname === "/dashboard/friends") {
            await sendFriendRequest(friendID);
        } else if (pathname.startsWith("/dashboard/trips")) {
            await addToTrip(friendID);
        } else {
            console.log("None of the mentioned paths");
        }
    }

    return (
        <div>
            {already ? (

                <button
                    className="bg-neededCyan text-white p-1 px-2 rounded-md"
                    // onClick={function () {
                    //     handleButtonClick(user.id);
                    //     setSent(false);
                    // }}
                >
                    {label.alreadyText}
                </button>

            ) : sent ? (

                <h2
                    className="bg-neededCyan text-white p-1 px-2 rounded-md"
                >
                    {label.addedText}
                </h2>

            ) : (

                <button
                    key={friendID}
                    className="bg-neededBlue text-white p-1 rounded-md hover:bg-neededPurple"
                    onClick={function () {
                        handleButtonAdd(friendID);
                        setSent(true);
                    }}
                >
                    {label.addText}
                </button>
            )
            }
        </div >
    )
}