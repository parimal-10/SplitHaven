"use client"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { Modal } from "@mui/material"
import FriendRequestFriendCard from "./FriendRequestFriendCard"

export default function FriendRequest({ userID }) {
    const [friendRequests, setFriendRequests] = useState(null);
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        getFriendRequests();
    }, []);

    async function getFriendRequests() {
        const response = await axios.post("/api/dashboard/friends/friendRequests", userID);
        setFriendRequests(response.data);
    }


    return (
        <div>
            {friendRequests && (

                <button
                    className="relative"
                    onClick={handleOpen}
                >
                    {friendRequests.length > 0 ? (
                        <div>
                            <img src="/friendRequest.png" className="w-12 h-12"></img>
                            <div className="absolute bottom-0 right-0 bg-neededBlue rounded-full text-xs text-white font-bold w-4 h-4 mb-1">
                                <p>{friendRequests.length}</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <img src="/friendRequest.png" className="w-12 h-12"></img>
                            <div className="absolute bottom-0 right-0 bg-neededBlue rounded-full text-xs text-white font-bold w-4 h-4 mb-1">
                                <p>0</p>
                            </div>
                        </div>
                    )}

                </button>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="my-4 mx-4 bg-white flex flex-col items-center justify-center">
                    {friendRequests && friendRequests.length > 0 ? (
                        <div>
                            {friendRequests.map((friend) => (
                                <FriendRequestFriendCard key={friend.id} userID={userID} friend={friend} />
                            ))
                            }
                        </div>
                    ) : (
                        <div>
                            <p>No friend requests</p>
                        </div>
                    )}

                </div>

            </Modal>
        </div>
    )
}