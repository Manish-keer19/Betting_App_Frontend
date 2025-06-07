// import React, { useState } from "react";
// import { useTheme } from "../utils/ThemeContext";
// import logo from "../assets/logo.png"; // Ensure the path to your logo is correct
// import { authService } from "../Services/authService"; // Replace with your actual service
// import { Link, useNavigate } from "react-router-dom"; // For navigation after successful signup
// import { toast } from "sonner";

// const Signup: React.FC = () => {
//   const navigate = useNavigate();

//   const queryParams = new URLSearchParams(window.location.search);
//   const ref = queryParams.get("ref");
//   console.log("ref is ", ref);

//   // States for user inputs
//   const [email, setEmail] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [otp, setOtp] = useState<string>("");

//   // State to control whether OTP has been sent
//   const [otpSent, setOtpSent] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [referralCode, setReferralCode] = useState<string>(ref || "");
//   const [dob, setDob] = useState<string>("");

//   // State for feedback (error or success)
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   const { theme } = useTheme();
//   const isGreen = theme === "green";

//   const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
//   const text = isGreen ? "text-green-100" : "text-white";
//   const inputBg = isGreen
//     ? "bg-green-100 text-green-900"
//     : "bg-zinc-800 text-white";
//   const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
//   const button = isGreen
//     ? "bg-green-700 hover:bg-green-600"
//     : "bg-zinc-800 hover:bg-zinc-700";

//   // Function to generate OTP
//   const handleGenerateOtp = async () => {
//     if (!email || !name || !password || !dob) {
//       setErrorMessage("Please fill all the fields");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const data = { email }; // Send only email to generate OTP
//       const res = await authService.generateOtp(data);
//       if (res.success) {
//         setOtpSent(true);
//         setErrorMessage(""); // Clear any previous errors
//       } else {
//         setErrorMessage(res.message || "Failed to generate OTP");
//       }
//     } catch (error) {
//       setErrorMessage(
//         "An error occurred while generating OTP. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to handle signup after OTP verification
//   const handleSignup = async () => {
//     setIsLoading(true);
//     try {
//       const data = {
//         username: name,
//         email,
//         password,
//         otp,
//         referralCode: referralCode && referralCode,
//         dateOfBirth: dob,
//       }; // Send details with OTP for signup
//       const res = await authService.signup(data);
//       if (res?.success) {
//         toast.success("Signup successful! Please login to continue.");
//         navigate("/login"); // Navigate to profile on successful signup
//       } else {
//         setErrorMessage(res.message || "Signup failed");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "response" in error &&
//         typeof (error as any).response === "object" &&
//         (error as any).response !== null &&
//         "data" in (error as any).response
//       ) {
//         setErrorMessage(
//           (error as any).response.data?.message ||
//             "An error occurred during signup. Please try again."
//         );
//       } else {
//         setErrorMessage("An error occurred during signup. Please try again.");
//       }
//       setOtpSent(false); // Reset OTP sent state on error
//       // setErrorMessage("An error occurred during signup. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//         <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>

//         <form className="space-y-5">
//           {!otpSent && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               />

//               <input
//                 type="text"
//                 placeholder="Referral Code (optional)"
//                 value={referralCode}
//                 onChange={(e) => setReferralCode(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               />

//               <label className="text-sm text-gray-500 mb-2 block">
//                 Date of Birth
//               </label>
//               {/* <input
//                 type="date"
//                 placeholder="Date of Birth"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg appearance-none ${inputBg} focus:outline-none focus:ring-2 ${inputFocus} cursor-pointer`}
//                 style={{
//                   WebkitAppearance: "none",
//                   MozAppearance: "none",
//                   appearance: "none",
//                   colorScheme: theme === "green" ? "light" : "dark",
//                 }}
//               /> */}

//               <input
//                 type="date"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-sm ${inputBg} focus:outline-none focus:ring-2 ${inputFocus} cursor-pointer`}
//                 style={{
//                   WebkitAppearance: "none",
//                   MozAppearance: "none",
//                   appearance: "none",
//                   colorScheme: theme === "green" ? "light" : "dark",
//                 }}
//               />

//               <button
//                 type="button"
//                 onClick={handleGenerateOtp}
//                 disabled={isLoading}
//                 className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300`}
//               >
//                 {isLoading ? "Signing Up....." : "Signup"}
//               </button>

//               <div className="text-center text-white mt-4 mb-4">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-green-500 hover:underline">
//                   Login
//                 </Link>
//               </div>
//             </>
//           )}

//           {otpSent && (
//             <>
//               <div className="text-center text-white mt-4 mb-4">
//                 <span>
//                   OTP has been sent to your email. Please enter the OTP below.
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               />

//               <button
//                 type="button"
//                 onClick={handleSignup}
//                 disabled={isLoading}
//                 className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300`}
//               >
//                 {isLoading ? "Verifying otp..." : "Verify OTP"}
//               </button>
//             </>
//           )}

//           {errorMessage && (
//             <div className="text-red-500 text-center mt-4">{errorMessage}</div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import logo from "../assets/logo.png";
import { authService } from "../Services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const ref = queryParams.get("ref");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: ref || "",
    dob: "",
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { theme } = useTheme();
  const isGreen = theme === "green";

  // Dynamic styles
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
  const linkColor = isGreen
    ? "text-green-300 hover:text-green-200"
    : "text-zinc-300 hover:text-zinc-200";

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { name, email, password, confirmPassword, dob, phone } = formData;

    if (!name.trim()) newErrors.name = "Full name is required";
    else if (name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 3 || password.length > 10) {
      newErrors.password = "Password must be 3-10 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!dob) newErrors.dob = "Date of birth is required";
    else {
      const dobDate = new Date(dob);
      const today = new Date();
      if (dobDate >= today) newErrors.dob = "Date of birth must be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate OTP
  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await authService.generateOtp({ email: formData.email });
      if (res.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email!");
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
      console.error("OTP generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    setIsLoading(true);
    try {
      const { name, email, password, referralCode, dob,phone } = formData;
      const res = await authService.signup({
        username: name,
        email,
        password,
        otp,
        referralCode,
        dateOfBirth: dob,
        phone,
      });

      if (res?.success) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      } else {
        toast.error(res?.message || "Signup failed");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Signup error. Please try again.";
      toast.error(errorMsg);
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${bg} ${text} flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/10">
          {/* Decorative header */}
          <div
            className={`h-2 ${isGreen ? "bg-green-500" : "bg-zinc-500"}`}
          ></div>

          <div className="p-8">
            {otpSent && (
              <button
                onClick={() => setOtpSent(false)}
                className={`mb-4 flex items-center ${linkColor} text-sm`}
              >
                <FiArrowLeft className="mr-1" /> Back to form
              </button>
            )}

            <div className="flex justify-center mb-6">
              <motion.img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full border-4 border-white/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">
              Create Account
            </h2>
            <p className="text-center mb-8 text-white/70">
              Join our community today
            </p>

            <form
              onSubmit={otpSent ? handleSignup : handleGenerateOtp}
              className="space-y-4"
            >
              {!otpSent ? (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
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
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1"
                    >
                      Password (3-10 characters)
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
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

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                    />
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium mb-1"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 cursor-pointer`}
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        colorScheme: isGreen ? "light" : "dark",
                      }}
                    />
                    {errors.dob && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.dob}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="referralCode"
                      className="block text-sm font-medium mb-1"
                    >
                      Referral Code (optional)
                    </label>
                    <input
                      id="referralCode"
                      name="referralCode"
                      type="text"
                      placeholder="Enter referral code"
                      value={formData.referralCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center text-sm text-white/80 mb-4">
                    <p>We've sent a 6-digit OTP to your email at</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>

                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium mb-1"
                    >
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 text-center tracking-widest`}
                      maxLength={6}
                    />
                    {errors.otp && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.otp}
                      </motion.p>
                    )}
                  </div>

                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={handleGenerateOtp}
                      className={`${linkColor} text-sm`}
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

              <motion.button
                type="submit"
                className={`w-full py-3 rounded-lg ${buttonBg} text-white font-semibold tracking-wide transition-all duration-300 flex items-center justify-center mt-6`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {otpSent ? "Verifying..." : "Processing..."}
                  </>
                ) : otpSent ? (
                  "Verify & Sign Up"
                ) : (
                  "Get OTP"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link to="/login" className={`font-medium ${linkColor}`}>
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
