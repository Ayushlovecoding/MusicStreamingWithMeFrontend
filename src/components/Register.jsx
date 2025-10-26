import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // ✅ added

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ added

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://musicwithmefullstack-1.onrender.com/api/register", {
        name,
        email,
        password,
      });

      setMessage(res.data.message || "✅ Registration successful!");
      console.log("Register Response:", res.data);

      // ✅ navigate after success
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-background-dark text-white px-4">
      <form
        onSubmit={handleRegister}
        className="card max-w-md w-full p-8 shadow-lg"
      >
        <h2 className="heading-lg text-center feature-text">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="search-box w-full p-2 mb-4 rounded text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="search-box w-full p-2 mb-4 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="search-box w-full p-2 mb-4 rounded text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="cta-primary w-full"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>
        )}

        <p className="mt-4 text-center text-sm">
          Already have an account? {" "}
          <Link to="/login" className="link">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
