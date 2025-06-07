
// import React, { useState } from "react";
// import { useTheme } from "../utils/ThemeContext";
// import logo from "../assets/logo.png";
// import { authService } from "../Services/authService";
// import { useDispatch } from "react-redux";
// import { setUser } from "../features/userSlice";
// import { Link, useNavigate} from "react-router-dom";
// import { toast } from "sonner";

// const Login: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   const { theme } = useTheme();
//   const isGreen = theme === "green";

//   const handleLogin = async () => {
//     setIsLoggedIn(true);
//     try {
//       const data = { email, password };
//       const res = await authService.login(data);
//       if (res.success) {
//         toast.success("Login successful!");
//         setIsLoggedIn(false);
//         navigate("/profile");
//         dispatch(setUser(res.data));
//       } else {
//   setIsLoggedIn(false);
//         console.error("Login failed:", res.data.message);
//       }
//     } catch (error) {
//         setIsLoggedIn(false);
//       console.log("Could not login", error);
//     }
//   };

//   const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
//   const text = isGreen ? "text-green-100" : "text-white";
//   const inputBg = isGreen
//     ? "bg-green-100 text-green-900 placeholder-green-700"
//     : "bg-zinc-800 text-white placeholder-gray-400";
//   const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
//   const button = isGreen
//     ? "bg-green-700 hover:bg-green-600"
//     : "bg-zinc-800 hover:bg-zinc-700";

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center px-4 ${bg} ${text}`}
//     >
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
//         <div className="flex justify-center mb-6">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-20 w-20 rounded-full border-4 border-white"
//           />
//         </div>
//         <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

//         <div className="space-y-5">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             onClick={handleLogin}
//             className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300`}
//           >
//             {isLoggedIn ? "Logging in..." : "Login"}
//           </button>
//         </div>
        
//         <div className="mt-4 text-center text-gray-400">
//           <Link to="/reset-password" className="text-green-500 hover:underline">
//             Forgot Password?
//           </Link>

//         <div className="mt-4 text-center text-gray-400">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-green-500 hover:underline">
//           Sign Up
//         </Link>
//         </div>
//       </div>

    
//     </div>
//     </div>
//   );
// };

// export default Login;







import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import logo from "../assets/logo.png";
import { authService } from "../Services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { theme } = useTheme();
  const isGreen = theme === "green";

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 3 || password.length > 10) {
      newErrors.password = "Password must be between 3-10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = { email, password };
      const res = await authService.login(data);
      if (res.success) {
        toast.success("Login successful!", {
          position: "top-center",
          duration: 2000,
        });
        dispatch(setUser(res.data));
        navigate("/profile");
      } else {
        toast.error(res.data.message || "Login failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
        (error instanceof Error ? error.message : "An error occurred"),
        {
          position: "top-center",
        }
      );
      // toast.error("Could not login. Please try again.", {
      //   position: "top-center",
      // });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic styles based on theme
  const bg = isGreen
    ? "bg-gradient-to-br from-green-900 to-green-700"
    : "bg-gradient-to-br from-zinc-900 to-zinc-700";
  const text = isGreen ? "text-green-50" : "text-zinc-50";
  const inputBg = isGreen
    ? "bg-green-50/10 focus:bg-green-50/20 text-green-50 placeholder-green-200/70"
    : "bg-zinc-50/10 focus:bg-zinc-50/20 text-zinc-50 placeholder-zinc-200/70";
  const inputBorder = isGreen
    ? "border-green-400 focus:border-green-300"
    : "border-zinc-400 focus:border-zinc-300";
  const buttonBg = isGreen
    ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
    : "bg-gradient-to-r from-zinc-600 to-zinc-500 hover:from-zinc-500 hover:to-zinc-400";
  const linkColor = isGreen ? "text-green-300 hover:text-green-200" : "text-zinc-300 hover:text-zinc-200";

  return (
    <div className={`min-h-screen ${bg} ${text} flex items-center justify-center p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/10">
          {/* Decorative header */}
          <div className={`h-2 ${isGreen ? "bg-green-500" : "bg-zinc-500"}`}></div>
          
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <motion.img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full border-4 border-white/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-center mb-8 text-white/70">Sign in to your account</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={3}
                  maxLength={10}
                />
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/reset-password"
                  className={`text-sm ${linkColor} transition-colors duration-200`}
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                className={`w-full py-3 rounded-lg ${buttonBg} text-white font-semibold tracking-wide transition-all duration-300 flex items-center justify-center`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className={`font-medium ${linkColor} transition-colors duration-200`}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;