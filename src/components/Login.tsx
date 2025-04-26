// import React, { useState } from "react";
// import { useTheme } from "../utils/ThemeContext";
// import logo from "../assets/logo.jpg"; // Ensure the path to your logo is correct
// import { authService } from "../Services/authService";
// import { useDispatch } from "react-redux";
// import { setUser } from "../features/userSlice";
// import { useNavigate } from "react-router-dom";

// const Login: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const { theme } = useTheme();
//   const isGreen = theme === "green";

//   const handleLogin = async () => {
//     try {
//       console.log("login attempt", email, password);
//       const data = {
//         email: email,
//         password: password,
//       };
//      const res = await authService.login(data);
//         console.log("Login response:", res.data);
//         if (res.data.success) {
//             console.log("Login successful:", res.data);

//             dispatch(setUser(res.data.user));
//             navigate("/profile");

//         } else {
//             console.error("Login failed:", res.data.message);
//         }

//     } catch (error) {
//       console.log("cloud not login", error);
//     }
//   };

//   const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
//   const text = isGreen ? "text-green-100" : "text-white";
//   const inputBg = isGreen
//     ? "bg-green-100 text-green-900"
//     : "bg-zinc-800 text-white";
//   const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
//   const button = isGreen
//     ? "bg-green-700 hover:bg-green-600"
//     : "bg-zinc-800 hover:bg-zinc-700";

//   return (
//     <div
//       className={`min-h-screen flex justify-center items-center ${bg} ${text}`}
//     >
//       <div className="w-full max-w-md p-8 rounded-xl shadow-lg">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Logo" className="h-16 w-16 rounded-full" />
//         </div>
//         <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className={`w-full px-4 py-2 rounded ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={`w-full px-4 py-2 rounded ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//         />
//         <button
//           onClick={handleLogin}
//           className={`w-full py-2 rounded ${button} text-white font-semibold transition`}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import logo from "../assets/logo.jpg";
import { authService } from "../Services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate} from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { theme } = useTheme();
  const isGreen = theme === "green";

  const handleLogin = async () => {
    setIsLoggedIn(true);
    try {
      const data = { email, password };
      const res = await authService.login(data);
      if (res.success) {
        setIsLoggedIn(false);
        navigate("/profile");
        dispatch(setUser(res.data));
      } else {
  setIsLoggedIn(false);
        console.error("Login failed:", res.data.message);
      }
    } catch (error) {
        setIsLoggedIn(false);
      console.log("Could not login", error);
    }
  };

  const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
  const text = isGreen ? "text-green-100" : "text-white";
  const inputBg = isGreen
    ? "bg-green-100 text-green-900 placeholder-green-700"
    : "bg-zinc-800 text-white placeholder-gray-400";
  const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
  const button = isGreen
    ? "bg-green-700 hover:bg-green-600"
    : "bg-zinc-800 hover:bg-zinc-700";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${bg} ${text}`}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20 rounded-full border-4 border-white"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300`}
          >
            {isLoggedIn ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
