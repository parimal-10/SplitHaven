"use client"
import React, { useState } from "react"
import { Modal } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function CreateTrip({ userID }) {
    const router = useRouter();

    const [open, setOpen] = useState(null);
    const [name, setName] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    async function createTrip() {
        const response = await axios.post("/api/dashboard/trips/createTrip", { userID, name, startDate });
        const tripID = response.data;
        router.push(`/dashboard/trips/addToTrip?userID=${userID}&&tripID=${tripID}`);
    }

    return (
        <div>
            <button
                className="rounded-md p-2 mb-2 text-white bg-neededBlue hover:bg-neededPurple"
                onClick={handleOpen}
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
                    <div className="mt-4 mb-4 flex flex-col w-72 sm:w-96 xl:w-80">

                        <input
                            type="text"
                            placeholder="Trip Name"
                            name="trip"
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border border-gray-300 rounded mr-2 w-full outline-none mb-4"
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
                </div>
            </Modal>
        </div>
    )
}