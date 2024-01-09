"use client"
import React, { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import "../../globals.css"

function NormalSignUpComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  
  const [passwordError, setPasswordError] = useState(null);

  const router = useRouter();

  function handleTogglePassword () {
    setShowPassword(!showPassword);
  };

  function handleChange (e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit (e) {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const response = await axios.post("/api/signup", formData);
      await handleRouting(response);
    }
  };

  async function handleRouting(response) {
    console.log(response);
    if (response.status === 201) {
      const user = response.data;
      router.push("/login");
    } else if (response.status === 202) {
      setError(response.data.error);
    } else {
      setError("Unknown error. Try again");
    }
  }

  useEffect(() => {
    if (formData.password != formData.confirmPassword) {
      setPasswordError("Both the passwords don't match");
    } else {
      setPasswordError(null)
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-9ADE7B gap-y-4">Sign Up</h1>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}
      {passwordError && (
        <p className="text-red-600 mb-4">{passwordError}</p>
      )}

      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded break-after-column mb-4"
        />

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

        <div className="relative mb-4">
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={!!passwordError}
          className="w-full text-white bg-EEF296 py-2 px-4 rounded bg-neededBlue hover:bg-neededPurple"
        >
          Sign Up
        </button>

      </form>

      <p className="mt-4">
        Already have an Account? <Link href="/login" className="text-neededBlue">Login</Link>
      </p>

    </div>
  );
}

export default NormalSignUpComponent;
