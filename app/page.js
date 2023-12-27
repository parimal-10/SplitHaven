import React from "react"
import "./globals.css"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row bg-neededCyan justify-center items-center sm:h-screen">
      <div className="w-full sm:w-1/2 flex justify-center mb-4">
        <img src="/homepage.png" />
      </div>

      <div className="w-full sm:w-1/2 px-10">
        <div className="mb-7">
          <h1 className="text-4xl mb-4 md:text-7xl md:mb-7">
            Where Every Bill Finds Its Happy Ending!
          </h1>
          <h2 className="text-md md:text-xl">
            Embark on a seamless journey of financial harmony with SplitHaven -
            your all-in-one solution for managing group, individual, and trip
            expenses effortlessly. Navigate the world of hassle-free spending,
            where every dime is accounted for, ensuring fair contributions and
            memorable adventures. Welcome to SplitHaven, where your expenses
            find balance, and your travels become extraordinary.
          </h2>
        </div>

        <div>
          <Link href="/signup"><button className="w-2/3 mb-4 sm:w-1/3 sm:mr-6 text-white bg-EEF296 py-2 px-4 rounded bg-neededBlue hover:bg-neededPurple">
            Sign Up
          </button></Link>

          <Link href="/login"><button className="w-2/3 sm:w-1/3 text-white bg-EEF296 py-2 px-4 rounded bg-neededBlue hover:bg-neededPurple">
            Login
          </button></Link>
        </div>
      </div>
    </div>
  );
}
