// src/components/LoginForm.jsx
import React, { useState } from "react";
import useAuth from "../../../hooks/users/login";
import background from "../../../assets/bg.jpg";
import { useNavigate } from "react-router";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      alert("Login berhasil");
    } else {
      alert(result.message);
    }
  };

  const handleClick = () => {
    navigate(`/payment/finished`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {}
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      {}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm z-10"></div>

      {}
      <div className="relative z-20 flex justify-center items-center h-full">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-xl w-80 space-y-4"
        >
          {}
          <h2 className="text-center text-2xl font-bold">
            <span className="text-red-600">Log</span>
            <span className="text-black">in</span>
          </h2>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {}
          <button
            type="submit"
            onClick={handleClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
