"use client"
import React, { useState, useEffect } from "react"
import SearchUserCard from "./SearchUserCard"
import axios from "axios"
import { usePathname } from "next/navigation"

export default function SearchUser({ userID }) {
    const [searchQuery, setSearchQuery] = useState(null);
    const [users, setUsers] = useState([]);
    const [label, setLabel] = useState({});
    const pathname = usePathname();

    useEffect(() => {

        if (pathname === "/dashboard/friends") {
            setLabel({addText: "Add Friend", addedText: "Sent", alreadyText: "Unfriend"});
        } else if (pathname.startsWith("/dashboard/trips")) {
            setLabel({addText: "Add", addedText: "Added", alreadyText: "Remove"});
        }

    }, []);

    useEffect(() => {

        if (searchQuery && searchQuery.length > 3) {
            getUsers(searchQuery);
        }

    }, [searchQuery]);

    async function getUsers(searchQuery) {
        try {

            const response = await axios.post("/api/dashboard/searchUser", { userID, searchQuery });
            setUsers(response.data);

        } catch (err) {
            console.log("Error getting users", err);
        }
    }

    return (
        <div >
            <div className="flex items-center mb-1 w-fit">
                <input
                    type="text"
                    placeholder="Search friends by username"
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neededBlue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {searchQuery && searchQuery.length > 3 && (
                <div className="pt-4 w-full absolute bg-white rounded-lg shadow-lg">
                    {users.length > 0 ? (
                        <div>
                            {users.map((user) => (
                                <SearchUserCard userID={userID} user={user} label={label} pathname={pathname}/>
                            ))}
                        </div>
                    ) : searchQuery && searchQuery.length > 3 ? (
                        <div
                            className="text-center text-gray-600 py-4">
                            No users found by that username.
                        </div>
                    ) : null}
                </div>
            )}

        </div>
    )
}