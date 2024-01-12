"use client"
import React, { useState } from "react"
import { Modal } from "@mui/material"
import axios from "axios"
import SearchUser from "../friends/SearchUser";

export default function CreateTrip({ userID }) {
    const [open, setOpen] = useState(null);
    const [firstClick, setFirstClick] = useState(false);
    const [name, setName] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    let friends = [];

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    async function getFriends() {
        const response = await axios.post("/api/dashboard/trips/getFriends", { userID });
        friends = response.data;
    }

    async function createTrip() {
        await axios.post("/api/dashboard/trips/createTrip", {userID, name, startDate});
    }

    return (
        <div>
            <button
                className="rounded-md p-2 mb-2 text-white bg-neededBlue hover:bg-neededPurple"
                onClick={function () {
                    handleOpen();
                    if (!firstClick) {
                        getFriends();
                        setFirstClick(true);
                    }
                }}
            >
                New Trip
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="my-4 mx-4 bg-neededCyan flex flex-col items-center justify-center">

                    <input
                        type="text"
                        placeholder="Trip Name"
                        name="trip"
                        required
                        onChange={setName(value)}
                        className="ml-4 remove-arrow outline-none w-full"
                        min={1}
                        width={100}
                    />

                    <DatePicker showIcon withPortal required selected={startDate} onChange={(date) => setStartDate(date)} className="mb-4" />

                    <button
                        type="button"
                        onClick={createTrip}
                        className="bg-neededBlue text-white py-2 px-4 rounded hover:bg-neededPurple"
                    >
                        Create
                    </button>
                </div>
            </Modal>
        </div>
    )
}