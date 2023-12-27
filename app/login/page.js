import React from "react"
import NormalSignUpComponent from "../components/login/NormalLoginPage"
import SocialSignUpComponent from "../components/login/SocialLoginPage"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"
import "../globals.css"

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        return redirect("/dashboard");
    }

    return (
        <div className=" bg-508D69 min-h-screen flex items-center justify-center bg-neededBlue ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 justify-center text-center">
                <NormalSignUpComponent/>
                <SocialSignUpComponent/>
            </div>
        </div>
    )
}