"use client"
import React from "react"
import NormalSignUpComponent from "../components/login/NormalLoginPage"
import SocialSignUpComponent from "../components/login/SocialLoginPage"
import "../globals.css"

function LoginPage() {
    return (
        <div className=" bg-508D69 min-h-screen flex items-center justify-center bg-neededBlue ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 justify-center text-center">
                <NormalSignUpComponent/>
                <SocialSignUpComponent/>
            </div>
        </div>
    )
}

export default LoginPage