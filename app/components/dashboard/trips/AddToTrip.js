"use client"
import React, { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import axios from "axios"
import User from "../../user/User"
import Button from "../../button/Button"

export default function AddToTrip() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const userID = Number(searchParams.get("userID"));
    const tripID = Number(searchParams.get("tripID"));
    const [friends, setFriends] = useState([]);
    const [label, setLabel] = useState({});

    useEffect(() => {

        getFriends();
        setLabel({addText: "Add", addedText: "Added", alreadyText: "Remove"});
        
    }, []);

    async function getFriends() {
        const response = await axios.post("/api/dashboard/trips/getFriends", { userID, tripID });
        setFriends(response.data);
    }

    return (
        <div>
            {Array.isArray(friends) && friends.map(friend => (
                <div
                    className="bg-neededCyan p-4 shadow-md rounded-md mb-4 flex items-center max-w-sm min-w-fit gap-2"
                    key={friend.id}
                >
                    <User key={friend.id} avatar={friend.avatar} email={friend.email} name={friend.name} />
                    
                    <Button key={friend.id} userID={userID} friendID={friend.id} already={friend.already} label={label} pathname={pathname}/>
                </div>
            ))}
        </div>
    )
}