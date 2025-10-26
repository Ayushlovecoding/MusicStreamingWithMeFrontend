import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Call backend login API
      const res = await axios.post(
        "https://musicwithmefullstack-1.onrender.com/api/login",
        { email, password }
      );

      // Success! Save token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("✅ Login successful! Redirecting...");
      
      // Wait a moment then redirect
      setTimeout(() => {
        navigate("/"); // Go to home page
      }, 1000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "❌ Login failed. Please check your credentials.";
      setMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-background-dark text-white px-4">
      <form
        onSubmit={handleLogin}
        className="card max-w-md w-full p-8 shadow-lg"
      >
        <h2 className="heading-lg text-center feature-text mb-6">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-caption mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="search-box w-full p-3 rounded text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-caption mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="search-box w-full p-3 rounded text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="cta-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-3 rounded text-center ${
            message.includes('✅') 
              ? 'bg-green-500/20 text-green-200' 
              : 'bg-red-500/20 text-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Register Link */}
        <p className="mt-6 text-center text-caption">
          Don't have an account?{" "}
          <Link to="/register" className="link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;