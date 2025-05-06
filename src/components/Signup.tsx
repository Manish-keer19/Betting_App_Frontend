import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import logo from "../assets/logo.jpg"; // Ensure the path to your logo is correct
import { authService } from "../Services/authService"; // Replace with your actual service
import { Link, useNavigate } from "react-router-dom"; // For navigation after successful signup

const Signup: React.FC = () => {
  const navigate = useNavigate();

  // States for user inputs
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  // State to control whether OTP has been sent
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  // State for feedback (error or success)
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { theme } = useTheme();
  const isGreen = theme === "green";

  const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
  const text = isGreen ? "text-green-100" : "text-white";
  const inputBg = isGreen
    ? "bg-green-100 text-green-900"
    : "bg-zinc-800 text-white";
  const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
  const button = isGreen
    ? "bg-green-700 hover:bg-green-600"
    : "bg-zinc-800 hover:bg-zinc-700";

  // Function to generate OTP
  const handleGenerateOtp = async () => {
    setIsLoading(true);
    try {
      const data = { email }; // Send only email to generate OTP
      const res = await authService.generateOtp(data);
      if (res.success) {
        setOtpSent(true);
        setErrorMessage(""); // Clear any previous errors
      } else {
        setErrorMessage(res.message || "Failed to generate OTP");
      }
    } catch (error) {
      setErrorMessage("An error occurred while generating OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle signup after OTP verification
  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const data = {
        username: name,
        email,
        password,
        otp,
        referralCode: referralCode && referralCode,
        dateOfBirth: dob,
      }; // Send details with OTP for signup
      const res = await authService.signup(data);
      if (res.success) {
        navigate("/login"); // Navigate to profile on successful signup
      } else {
        setErrorMessage(res.message || "Signup failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>

        <form className="space-y-5">
          {!otpSent && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              />

              <input
                type="text"
                placeholder="Referral Code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              />

              {/* <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              /> */}
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg appearance-none ${inputBg} focus:outline-none focus:ring-2 ${inputFocus} cursor-pointer`}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  colorScheme: theme === "green" ? "light" : "dark",
                }}
              />

              <button
                type="button"
                onClick={handleGenerateOtp}
                disabled={isLoading}
                className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300`}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>

              <div className="text-center text-white mt-4 mb-4">
                Already have an account?{" "}
                <Link to="/login" className="text-green-500 hover:underline">
                  Login
                </Link>
              </div>
            </>
          )}

          {otpSent && (
            <>
              <div className="text-center text-white mt-4 mb-4">
                <span>
                  OTP has been sent to your email. Please enter the OTP below.
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              />

              <button
                type="button"
                onClick={handleSignup}
                disabled={isLoading}
                className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300`}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </>
          )}

          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
