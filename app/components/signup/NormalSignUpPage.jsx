import React from "react"
import { useState } from "react"

function NormalSignUpComponent() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your backend logic here to handle form submission
    console.log("Form submitted:", formData);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-9ADE7B gap-y-4">Sign Up</h1>

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
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
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
          className="w-full text-white bg-EEF296 py-2 px-4 rounded bg-neededBlue hover:bg-neededPurple"
        >
          Sign Up
        </button>

      </form>

      <p className="mt-4">
        Alreaady have an Account? <a href="/login" className="text-needBlue">Login</a>
      </p>

    </div>
  );
}

export default NormalSignUpComponent;
