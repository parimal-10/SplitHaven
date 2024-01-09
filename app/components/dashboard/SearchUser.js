"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"

export default function SearchUser({ userID }) {
    const [searchQuery, setSearchQuery] = useState(null);
    const [users, setUsers] = useState([]);

    async function getUsers(searchQuery) {
        try {

            const response = await axios.post("/api/dashboard/searchUser", { userID, searchQuery });
            setUsers(response.data);

        } catch (err) {
            console.log("Error getting users", err);
        }

    }

    useEffect(() => {

        if (searchQuery && searchQuery.length > 3) {
            getUsers(searchQuery);
        } else {
            setUsers([]);
        }

    }, [searchQuery]);

    async function addFriend(friendID) {
        try {

            axios.post("/api/dashboard/friends/addFriend", {userID, friendID});

        } catch (err) {
            console.log("Error adding friend", err);
        }
    }

    return (
        <div className="">
            <div className="flex items-center mb-1">
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
                                <div key={user.id} className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg flex items-center">
                                    <img src={`/avatar-${user.avatar}.jpg`} className="mr-2 h-8 w-8 rounded-full"></img>

                                    <p className="mr-2">{user.email.slice(0, user.email.lastIndexOf("@"))} ({user.name})</p>

                                    {(user.friends_friends_user_id1Tousers.length > 0 || user.friends_friends_user_id2Tousers.length > 0) ? (

                                        <div></div>

                                    ) : (

                                        <button
                                            key={user.id}
                                            className="bg-neededBlue text-white p-1 rounded-md hover:bg-neededPurple"
                                            onClick={() => addFriend(user.id)}
                                        >
                                            Add Friend
                                        </button>
                                    )}
                                </div>
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