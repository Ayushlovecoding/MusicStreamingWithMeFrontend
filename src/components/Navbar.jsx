import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Track auth state using JWT (localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        {/* Left arrows */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-primary transition-colors"
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-primary transition-colors"
            src={assets.arrow_right}
            alt="Forward"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <p className="bg-gradient text-white text-body-sm px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover-primary text-glow">
            Explore Premium
          </p>

          {user ? (
            <>
              {/* Upload button */}
              <p
                onClick={() => navigate("/upload")}
                className="bg-background-light py-1 px-3 rounded-2xl text-body-sm cursor-pointer hover:bg-accent transition-all duration-300 hover:text-white text-hover-effect"
              >
                ⬆️ Upload
              </p>

              {/* Logout button */}
              <p
                onClick={handleLogout}
                className="btn-accent text-body-sm"
              >
                Logout
              </p>

              {/* Profile icon */}
              <div className="relative group">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover border-2 border-primary hover:border-accent transition-all duration-300 transform hover:scale-110"
                  title={user.name || user.email}
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-caption opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-glow">
                  {user.name || user.email}
                </span>
              </div>
            </>
          ) : (
            // Login button if no token
            <p
              onClick={() => navigate("/login")}
              className="btn-primary w-16 h-7 flex items-center justify-center text-body-sm"
            >
              Login
            </p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-gradient text-white px-4 py-1 rounded-2xl cursor-pointer hover-primary shadow-lg text-body-sm font-medium text-glow">
          All
        </p>
        <p onClick={()=>navigate('/')} className="text-primary bg-background-light px-4 py-1 rounded-2xl cursor-pointer hover:bg-accent hover:text-white transition-all duration-300 text-body-sm text-hover-effect">Music</p>
        <p className="text-primary bg-background-light px-4 py-1 rounded-2xl cursor-pointer hover:bg-accent hover:text-white transition-all duration-300 text-body-sm text-hover-effect">
          Podcasts
        </p>
        <p onClick={()=>navigate('/online')} className="nav-item ml-2 cursor-pointer text-body-sm">Go Online</p>
      </div>
    </>
  );
};

export default Navbar;

