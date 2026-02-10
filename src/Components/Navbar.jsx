import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Login from "./Login";
import Signup from "./Signup";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  // Check user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been logged out successfully",
        timer: 1500,
      });
      setUser(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message,
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center text-gray-900 font-medium text-xl">
            <img src="./resume.png" alt="logo" className="w-10 h-10 object-contain" />
            <span className="ml-3">Resume Builder</span>
          </Link>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          {/* Nav links */}
          <nav
            className={`flex-col gap-6 md:flex md:flex-row md:items-center w-full md:w-auto md:ml-auto transition-all duration-300 ${
              menuOpen ? "flex mt-4 md:mt-0" : "hidden md:flex"
            }`}
          >
            
            {user && (
              <>
                <Link to="/" className="md:mr-5 hover:text-blue-600 py-2 md:py-0 text-center font-medium">
              Home
            </Link>
                <Link to="/create-resume" className="md:mr-5 hover:text-blue-600 py-2 md:py-0 text-center font-medium">
                  Create Resume
                </Link>
                <Link to="/templates" className="md:mr-5 hover:text-blue-600 py-2 md:py-0 text-center font-medium">
                  Templates
                </Link>
                <Link to="/faq" className="md:mr-5 hover:text-blue-600 py-2 md:py-0 text-center font-medium">
                  FAQ
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <nav
            className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto md:ml-auto transition-all duration-300 ${
              menuOpen ? "flex mt-4 md:mt-0" : "hidden md:flex"
            }`}
          >
            {user ? (
              <div className="flex items-center gap-4 sm:flex justify-center items-center text-center">
                <span className="text-gray-700 text-sm md:text-base hidden sm:block">
  Hi, {user.email?.split("@")[0]}
</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-medium "
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setShowSignup(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setShowLogin(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Login/Signup Modals */}
      {(showLogin || showSignup) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => {
                setShowLogin(false);
                setShowSignup(false);
              }}
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 z-10"
            >
              ×
            </button>
            <div className="p-6">
              {showLogin && (
                <Login
                  onClose={() => setShowLogin(false)}
                  onSwitchToSignup={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                  }}
                />
              )}
              {showSignup && (
                <Signup
                  onClose={() => setShowSignup(false)}
                  onSwitchToLogin={() => {
                    setShowSignup(false);
                    setShowLogin(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Navbar;
