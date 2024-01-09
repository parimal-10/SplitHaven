"use client"
import React, { use } from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Modal } from "@mui/material"

export default function Dashboard() {
    let user;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: "",
        password: "",
        confirmPassword: "",
    });

    const [initialFormData, setInitialFormData] = useState({});

    const [userID, setUserID] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {

        async function getAvatar() {
            try {

                user = (await axios.post("/api/dashboard")).data;
                setFormData({
                    ...formData,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                });
                setUserID(user.id);
                setInitialFormData({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                });

            } catch (err) {
                console.log("Error getting user details", err);
            }
        };

        getAvatar();
    }, [])

    useEffect(() => {

        if (formData.password != formData.confirmPassword) {
            setError("Both the password don't match");
        } else if (formData.name == "") {
            setError("The name cannot be null");
        } else {
            setError(null);
        }

    }, [formData.password, formData.confirmPassword, formData.name]);

    const available_avatars = [
        "/avatar-0.jpg",
        "/avatar-1.jpg",
        "/avatar-2.jpg",
        "/avatar-3.jpg",
        "/avatar-4.jpg",
        "/avatar-5.jpg",
        "/avatar-6.jpg"
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSaveChanges() {
        const changes = {};
        for (const key in formData) {
            if (formData[key] !== initialFormData[key]) {
                changes[key] = formData[key];
            }
        }
        const {confirmPassword, ...updates} = changes;
        try {

            const saved = await axios.post("/api/dashboard/changeProfile", {updates, userID});
            setSuccess("Profile changed successfully!");

        } catch (err) {
            console.log(error);
            setError("An error occured, Please reload the page and try again");
        }

    };

    return (
        <div className="container mx-auto mt-4 max-w-lg mb-4">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col items-center space-x-4">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden">
                        <img
                            src={`/avatar-${formData.avatar}.jpg`}
                            alt="Profile Pic"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-gray-500">{formData.email}</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Select your Avatar</label>
                    <div className="flex space-x-2">
                        {available_avatars.map((pic, index) => (
                            <label key={index} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="avatar"
                                    value={index}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <img
                                    src={pic}
                                    className="w-12 h-12 object-cover rounded-full border-2 border-transparent hover:border-blue-500"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    {error && (
                        <p className="text-red-600 mb-2">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-600 mb-2">{success}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-500 border-black"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-500 border-black"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-500 border-black"
                    />
                </div>

                <button
                    onClick={handleSaveChanges}
                    disabled={!!error}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
