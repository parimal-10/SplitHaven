import React from "react"
import User from "../user/User"
import Button from "../button/Button"

export default function SearchUserCard({ userID, user, already, label, pathname }) {
    return (
        <div key={user.id} className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg flex items-center gap-2">
            <User key={user.id} name={user.name} email={user.email} avatar={user.avatar}/>
            <Button key={user.id} userID={userID} friendID={user.id} already={user.already} label={label} pathname={pathname}/>
        </div>
    )
}