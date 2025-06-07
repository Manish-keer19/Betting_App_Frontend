// import React, { useState } from "react";
// import { useTheme } from "../../utils/ThemeContext";
// import { authService } from "../../Services/authService";
// import { Link, useNavigate } from "react-router-dom";

// const ResetPassword: React.FC = () => {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const isGreen = theme === "green";

//   // Form states
//   const [email, setEmail] = useState<string>("");
//   const [otp, setOtp] = useState<string>("");
//   const [newPassword, setNewPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");

//   // UI states
//   const [step, setStep] = useState<1 | 2>(1); // 1: email step, 2: reset password step
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<string>("");

//   // Theme classes
//   const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
//   const text = isGreen ? "text-green-100" : "text-white";
//   const inputBg = isGreen
//     ? "bg-green-100 text-green-900 placeholder-green-700"
//     : "bg-zinc-800 text-white placeholder-gray-400";
//   const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
//   const button = isGreen
//     ? "bg-green-700 hover:bg-green-600"
//     : "bg-zinc-800 hover:bg-zinc-700";

//   const handleSendOtp = async () => {
//     if (!email) {
//       setError("Please enter your email");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     const data = { email };
//     try {
//       const res = await authService.generateOtp(data);
//       if (res.success) {
//         setStep(2);
//         setSuccess("OTP sent to your email. Please check your inbox.");
//       } else {
//         setError(res.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       setError("An error occurred while sending OTP");
//       console.error("OTP send error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!otp || !newPassword || !confirmPassword) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const data = {
//         email,
//         otp,
//         password:newPassword,
//       };
//       const res = await authService.resetPassword(data);

//       if (res.success) {
//         setSuccess("Password reset successfully! Redirecting to login...");
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setError(res.message || "Password reset failed");
//       }
//     } catch (error) {
//       setError("An error occurred while resetting password");
//       console.error("Reset password error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center px-4 ${bg} ${text}`}
//     >
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-8">Reset Password</h2>

//         {success && (
//           <div className="mb-4 p-3 bg-green-500/20 text-green-300 rounded-lg">
//             {success}
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">
//             {error}
//           </div>
//         )}

//         {step === 1 ? (
//           <div className="space-y-5">
//             <p className="text-center mb-4">
//               Enter your email address to receive a password reset OTP
//             </p>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <button
//               onClick={handleSendOtp}
//               disabled={isLoading}
//               className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300 ${
//                 isLoading ? "opacity-70" : ""
//               }`}
//             >
//               {isLoading ? "Sending OTP..." : "Send OTP"}
//             </button>

//             <div className="mt-4 text-center text-gray-400">
//               Remember your password?{" "}
//               <Link to="/login" className="text-green-500 hover:underline">
//                 Login
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             <p className="text-center mb-4">
//               Enter the OTP sent to your email and your new password
//             </p>

//             <input
//               type="text"
//               placeholder="Enter OTP"
//               className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="New Password"
//               className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Confirm New Password"
//               className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />

//             <button
//               onClick={handleResetPassword}
//               disabled={isLoading}
//               className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300 ${
//                 isLoading ? "opacity-70" : ""
//               }`}
//             >
//               {isLoading ? "Resetting Password..." : "Reset Password"}
//             </button>

//             <button
//               onClick={() => setStep(1)}
//               className="w-full py-3 text-gray-400 hover:text-white transition duration-300"
//             >
//               Back to email entry
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;





import React, { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";
import { authService } from "../../Services/authService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail, FiLock, FiKey, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isGreen = theme === "green";

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  // UI states
  const [step, setStep] = useState<1 | 2>(1); // 1: email step, 2: reset password step
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Theme classes
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (formData.newPassword.length < 3 || formData.newPassword.length > 10) {
      newErrors.newPassword = "Password must be 3-10 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep1()) return;

    setIsLoading(true);
    try {
      const res = await authService.generateOtp({ email: formData.email });
      if (res.success) {
        setStep(2);
        toast.success("OTP sent to your email!", {
          position: "top-center",
          duration: 4000,
        });
      } else {
        toast.error(res.message || "Failed to send OTP", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.", {
        position: "top-center",
      });
      console.error("OTP send error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      const data = {
        email: formData.email,
        otp: formData.otp,
        password: formData.newPassword,
      };
      const res = await authService.resetPassword(data);

      if (res.success) {
        toast.success("Password reset successfully! Redirecting to login...", {
          position: "top-center",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(res.message || "Password reset failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again.", {
        position: "top-center",
      });
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className={`mb-4 flex items-center ${linkColor} text-sm`}
              >
                <FiArrowLeft className="mr-1" /> Back to email entry
              </button>
            )}

            <div className="flex justify-center mb-6">
              <div className={`p-3 rounded-full ${isGreen ? "bg-green-500/20" : "bg-zinc-500/20"}`}>
                <FiKey className={`h-8 w-8 ${isGreen ? "text-green-400" : "text-zinc-400"}`} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
            <p className="text-center mb-8 text-white/70">
              {step === 1 
                ? "Enter your email to receive a reset OTP" 
                : "Enter the OTP and your new password"}
            </p>

            <form onSubmit={step === 1 ? handleSendOtp : handleResetPassword} className="space-y-4">
              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                      />
                    </div>
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
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium mb-1">
                      Verification Code
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={6}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 text-center tracking-widest`}
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

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                      New Password (3-10 characters)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.newPassword}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={10}
                        className={`w-full pl-10 pr-10 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.newPassword}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                      />
                    </div>
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
                </motion.div>
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
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {step === 1 ? "Sending OTP..." : "Resetting Password..."}
                  </>
                ) : (
                  step === 1 ? "Send OTP" : "Reset Password"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-white/70">
                Remember your password?{" "}
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

export default ResetPassword;