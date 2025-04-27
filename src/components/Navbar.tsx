// // // import React from "react";
// // // import { useTheme } from "../utils/ThemeContext";
// // // import { Link } from "react-router-dom";
// // // import logo from "../assets/logo.jpg";

// // // const Navbar: React.FC = () => {
// // //   const { theme, toggleTheme } = useTheme();

// // //   const isGreen = theme === "green";

// // //   const bgColor = isGreen ? "bg-green-900" : "bg-zinc-900";
// // //   const textColor = isGreen ? "text-green-100" : "text-white";
// // //   const hoverColor = isGreen ? "hover:text-green-300" : "hover:text-gray-300";
// // //   const buttonBg = isGreen ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700";

// // //   return (
// // //     <nav className={`${bgColor} ${textColor} p-4 shadow-lg`}>
// // //       <div className=" flex justify-between items-center">
// // //         {/* Logo + Title */}
// // //         <div className="flex items-center gap-3">
// // //           <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
// // //           <span className="text-2xl font-bold">BeatABack</span>
// // //         </div>

// // //         {/* Nav Links */}
// // //         <ul className="flex gap-6 text-lg font-medium items-center">
// // //           <li><Link to="/" className={`transition duration-200 ${hoverColor}`}>Home</Link></li>
// // //           <li><Link to="/games" className={`transition duration-200 ${hoverColor}`}>Games</Link></li>
// // //           <li><Link to="/about" className={`transition duration-200 ${hoverColor}`}>About</Link></li>
// // //           <li><Link to="/contact" className={`transition duration-200 ${hoverColor}`}>Contact</Link></li>

// // //           {/* Theme Toggle Button */}
// // //           <li>
// // //             <button
// // //               onClick={toggleTheme}
// // //               className={`${buttonBg} text-sm px-4 py-2 rounded-full text-white transition duration-300`}
// // //             >
// // //               {isGreen ? "Switch to Dark" : "Switch to Green"}
// // //             </button>
// // //           </li>
// // //         </ul>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // import React, { useState } from "react";
// // import { useTheme } from "../utils/ThemeContext";
// // import { Link } from "react-router-dom";
// // import logo from "../assets/logo.jpg";

// // const Navbar: React.FC = () => {
// //   const { theme, toggleTheme } = useTheme();
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   const isGreen = theme === "green";

// //   const bgColor = isGreen ? "bg-green-900" : "bg-zinc-900";
// //   const textColor = isGreen ? "text-green-100" : "text-white";
// //   const hoverColor = isGreen ? "hover:text-green-300" : "hover:text-gray-300";

// //   const handleLoginLogout = () => {
// //     setIsLoggedIn(!isLoggedIn);
// //   };

// //   return (
// //     <nav className={`${bgColor} ${textColor} p-4 shadow-lg`}>
// //       <div className="flex justify-between items-center max-w-6xl mx-auto">
// //         {/* Logo + Title */}
// //         <div className="flex items-center gap-3">
// //           <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
// //           <span className="text-2xl font-bold">BeatABack</span>
// //         </div>

// //         {/* Nav Links */}
// //         <ul className="flex gap-6 text-lg font-medium items-center">
// //           <li>
// //             <Link to="/" className={`transition duration-200 ${hoverColor}`}>
// //               Home
// //             </Link>
// //           </li>
// //           <li>
// //             <Link
// //               to="/games"
// //               className={`transition duration-200 ${hoverColor}`}
// //             >
// //               Games
// //             </Link>
// //           </li>
// //           <li>
// //             <Link
// //               to="/about"
// //               className={`transition duration-200 ${hoverColor}`}
// //             >
// //               About
// //             </Link>
// //           </li>
// //           <li>
// //             <Link
// //               to="/contact"
// //               className={`transition duration-200 ${hoverColor}`}
// //             >
// //               Contact
// //             </Link>
// //           </li>

// //           {/* Theme Toggle Switch */}
// //           <li>
// //             <div className="flex items-center gap-2">
// //               <span className="text-sm">Theme</span>
// //               <label className="relative inline-flex items-center cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   className="sr-only peer"
// //                   checked={isGreen}
// //                   onChange={toggleTheme}
// //                 />
// //                 <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-600 transition"></div>
// //                 <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
// //               </label>
// //             </div>
// //           </li>

// //           {/* Login/Logout */}
// //           <li className="flex gap-4">
// //             <Link to={"/login"}>
// //               <button
// //                 onClick={handleLoginLogout}
// //                 className={`px-4 py-2 text-sm rounded-full font-semibold ${
// //                   isGreen
// //                     ? "bg-green-700 hover:bg-green-600"
// //                     : "bg-zinc-800 hover:bg-zinc-700"
// //                 } transition duration-300`}
// //               >
// //                 login
// //               </button>
// //             </Link>
// //             <Link to={"/signup"}>
// //               <button
// //                 onClick={handleLoginLogout}
// //                 className={`px-4 py-2 text-sm rounded-full font-semibold ${
// //                   isGreen
// //                     ? "bg-green-700 hover:bg-green-600"
// //                     : "bg-zinc-800 hover:bg-zinc-700"
// //                 } transition duration-300`}
// //               >
// //                 signup
// //               </button>
// //             </Link>
// //           </li>
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import { useTheme } from "../utils/ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.jpg";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { clearUser } from "../features/userSlice";

// const Navbar: React.FC = () => {
//    const  navigate = useNavigate(); // Initialize navigate for routing
//   const { theme, toggleTheme } = useTheme();
//  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
//   const user = useSelector((state: any) => state.user); // Get user data from Redux

//   console.log("user is ",user);
//   const isGreen = theme === "green";

//   const bgColor = isGreen ? "bg-green-900" : "bg-zinc-900";
//   const textColor = isGreen ? "text-green-100" : "text-white";
//   const hoverColor = isGreen ? "hover:text-green-300" : "hover:text-gray-300";

//   const handleLoginLogout = () => {
//     dispatch(clearUser())
//     navigate("/login")
//   };

//   return (
//     <nav className={`${bgColor} ${textColor} p-4 shadow-lg`}>
//       <div className="flex justify-between items-center max-w-6xl mx-auto">
//         {/* Logo + Title */}
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
//           <span className="text-2xl font-bold">BeatABack</span>
//         </div>

//         {/* Nav Links */}
//         <ul className="flex gap-6 text-lg font-medium items-center">
//           <li>
//             <Link to="/" className={`transition duration-200 ${hoverColor}`}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/games" className={`transition duration-200 ${hoverColor}`}>
//               Games
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className={`transition duration-200 ${hoverColor}`}>
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className={`transition duration-200 ${hoverColor}`}>
//               Contact
//             </Link>
//           </li>

//           {/* Theme Toggle Switch */}
//           <li>
//             <div className="flex items-center gap-2">
//               <span className="text-sm">Theme</span>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={isGreen}
//                   onChange={toggleTheme}
//                 />
//                 <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-600 transition"></div>
//                 <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
//               </label>
//             </div>
//           </li>

//  {user?.token && (
//             <li>
//               <Link to="/profile" className={`transition duration-200 ${hoverColor} flex items-center gap-2`}>
//                 <img
//                   src={user.profilePic || "https://via.placeholder.com/150"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <span>Profile</span>
//               </Link>
//             </li>
//           )}
//           {/* Auth Buttons - Only show when not logged in */}
//           {!user?.token ? (
//             <li className="flex gap-4">
//               <Link to="/login">
//                 <button
//                   onClick={handleLoginLogout}
//                   className={`px-4 py-2 text-sm rounded-full font-semibold ${
//                     isGreen
//                       ? "bg-green-700 hover:bg-green-600"
//                       : "bg-zinc-800 hover:bg-zinc-700"
//                   } transition duration-300`}
//                 >
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button
//                   onClick={handleLoginLogout}
//                   className={`px-4 py-2 text-sm rounded-full font-semibold ${
//                     isGreen
//                       ? "bg-green-700 hover:bg-green-600"
//                       : "bg-zinc-800 hover:bg-zinc-700"
//                   } transition duration-300`}
//                 >
//                   Signup
//                 </button>
//               </Link>
//             </li>
//           ) : (
//             // Logout button when logged in
//             <li>
//               <button
//                 onClick={handleLoginLogout}
//                 className={`px-4 py-2 text-sm rounded-full font-semibold ${
//                   isGreen
//                     ? "bg-green-700 hover:bg-green-600"
//                     : "bg-zinc-800 hover:bg-zinc-700"
//                 } transition duration-300`}
//               >
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isGreen = theme === "green";

  const bgColor = isGreen ? "bg-green-900" : "bg-zinc-900";
  const textColor = isGreen ? "text-green-100" : "text-white";
  const hoverColor = isGreen ? "hover:text-green-300" : "hover:text-gray-300";

  const handleLoginLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`${bgColor} ${textColor} shadow-md`}>
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        {/* Logo + Title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <span className="text-2xl font-bold">BetABack</span>
        </div>

        {/* Hamburger menu (mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-lg font-medium items-center">
          <li>
            <Link to="/" className={`transition ${hoverColor}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/games" className={`transition ${hoverColor}`}>
              Games
            </Link>
          </li>
          <li>
            <Link to="/about" className={`transition ${hoverColor}`}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`transition ${hoverColor}`}>
              Contact
            </Link>
          </li>

          {user && user?.Role === "ADMIN" && (
            <Link to="/admin" className={`transition ${hoverColor}`}>
              Admin
            </Link>
          )}

          {/* Theme Toggle */}
          <li>
            <div className="flex items-center gap-2">
              <span className="text-sm">Theme</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isGreen}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition" />
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full" />
              </label>
            </div>
          </li>

          {/* Profile or Login/Signup */}
          {user?.token ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 ${hoverColor}`}
                >
                  <img
                    src={user.profilePic || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLoginLogout}
                  className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    isGreen
                      ? "bg-green-700 hover:bg-green-600"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="flex gap-2">
              <Link to="/login">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    isGreen
                      ? "bg-green-700 hover:bg-green-600"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    isGreen
                      ? "bg-green-700 hover:bg-green-600"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  Signup
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu (below nav) */}
      {isMobileMenuOpen && (
        <div className={`${bgColor} md:hidden px-4 pb-4`}>
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className={`${hoverColor}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/games"
                onClick={toggleMobileMenu}
                className={`${hoverColor}`}
              >
                Games
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMobileMenu}
                className={`${hoverColor}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleMobileMenu}
                className={`${hoverColor}`}
              >
                Contact
              </Link>
            </li>
            {user && user?.Role === "ADMIN" && (
              <li>
                <Link
                  to="/admin"
                  onClick={toggleMobileMenu}
                  className={`${hoverColor} bg-[#f0f0f0] text-black rounded-md px-2 py-1`}
                >
                  Admin
                </Link>
              </li>
            )}

            {/* Theme Toggle */}
            <li className="flex items-center gap-2">
              <span className="text-sm">Theme</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isGreen}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition" />
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full" />
              </label>
            </li>

            {/* Auth Options */}
            {user?.token ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    onClick={toggleMobileMenu}
                    className={`flex items-center gap-2 ${hoverColor}`}
                  >
                    <img
                      src={user.profilePic || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLoginLogout();
                      toggleMobileMenu();
                    }}
                    className={`w-full px-4 py-2 rounded-full text-sm font-semibold ${
                      isGreen
                        ? "bg-green-700 hover:bg-green-600"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={toggleMobileMenu}>
                    <button
                      className={`w-full px-4 py-2 rounded-full text-sm font-semibold ${
                        isGreen
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                    >
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    <button
                      className={`w-full px-4 py-2 rounded-full text-sm font-semibold ${
                        isGreen
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                    >
                      Signup
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
