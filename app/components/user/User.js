import React from "react"

export default function User({key, avatar, email, name}) {
    const username = email.slice(0, email.lastIndexOf("@"));

    return (
        <div className="flex items-center max-w-sm min-w-fit cursor-pointer">
            <img src={`/avatar-${avatar}.jpg`} className="mr-4 h-8 w-8 rounded-full"></img>

            <h3 className="text-xl font-semibold">
                {username} ({name})
            </h3>
        </div>
    )
}