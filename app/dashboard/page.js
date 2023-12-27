"use client"
import React from "react"
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import axios from "axios"

export default function Dashboard() {
    const { data: session } = useSession({
        required: true,
    });
    const userEmail = session?.user?.email;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {

        async function getAvatar() {
            try { 

                const response = await axios.post('/api/avatar');
                setAvatar(response.data.avatar);
                console.log(response);

            } catch (err) {
                console.log("Error getting avatar");
            }
        };

        getAvatar();
    }, [])

    console.log(avatar);

    const profilePics = [
        'profile-pic1.jpg',
        'profile-pic2.jpg',
        'profile-pic3.jpg',
        'profile-pic4.jpg',
        'profile-pic5.jpg',
        'profile-pic6.jpg',
    ];

    const handleProfilePicChange = (picIndex) => {
        setSelectedProfilePic(picIndex);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSaveChanges = () => {
        // Implement logic to save changes to the server
        // (Update user's name, password, and profile pic)
        console.log('Changes saved!');
    };

    return (
        <div className="container mx-auto mt-8 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>

            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src={`/avatar-${avatar}.jpg`}
                            alt="Profile Pic"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{name}</h2>
                        <p className="text-gray-500">{/* User's email (not editable) */}</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <div className="flex space-x-2">
                        {profilePics.map((pic, index) => (
                            <label key={index} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="profile-pic"
                                    value={index + 1}
                                    // checked={selectedProfilePic === index + 1}
                                    onChange={() => handleProfilePicChange(index + 1)}
                                    className="sr-only"
                                />
                                <img
                                    src={`/profile-pics/${pic}`}
                                    alt={`Profile Pic ${index + 1}`}
                                    className="w-12 h-12 object-cover rounded-full border-2 border-transparent hover:border-blue-500"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={password}
                        onChange={handlePasswordChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
