import React from "react"
import NormalSignUpComponent from "../components/signup/NormalSignUpPage"
import SocialSignUpComponent from "../components/signup/SocialSignupPage"
import "../globals.css"

export default function SignUpPage() {
    return (
        <div className=" bg-508D69 min-h-screen flex items-center justify-center bg-neededBlue ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 justify-center text-center">
                <NormalSignUpComponent/>
                <SocialSignUpComponent/>
            </div>
        </div>
    )
}
