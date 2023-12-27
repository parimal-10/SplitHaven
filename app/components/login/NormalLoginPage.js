"use client"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import "../../globals.css"
import { useRouter } from "next/navigation"

function NormalLoginComponent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const signInData = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false
    })

    if (signInData.status === 401) {
      setError("*Credentials are Wrong")
    } else if (signInData.status === 200) {
      router.push("/dashboard")
    }
  };

  function handleTogglePassword () {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-9ADE7B gap-y-4">Login</h1>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded break-after-column mb-4"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 cursor-pointer"
          >
            {showPassword ? (
              <img
                src="/open-eye.png"
                style={{ height: "25px", width: "25px" }}
              ></img>
            ) : (
              <img
                src="/closed-eye.png"
                style={{ height: "25px", width: "25px" }}
              ></img>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-EEF296 py-2 px-4 rounded bg-neededBlue hover:bg-neededPurple"
        >
          Login
        </button>

      </form>

      <p className="mt-4">
        Don't have an Account? <Link href="/signup" className="text-neededBlue">Sign Up</Link>
      </p>

    </div>
  );
}

export default NormalLoginComponent;
