import React, { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";
import { authService } from "../../Services/authService";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isGreen = theme === "green";

  // Form states
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // UI states
  const [step, setStep] = useState<1 | 2>(1); // 1: email step, 2: reset password step
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Theme classes
  const bg = isGreen ? "bg-green-900" : "bg-zinc-900";
  const text = isGreen ? "text-green-100" : "text-white";
  const inputBg = isGreen
    ? "bg-green-100 text-green-900 placeholder-green-700"
    : "bg-zinc-800 text-white placeholder-gray-400";
  const inputFocus = isGreen ? "focus:ring-green-400" : "focus:ring-zinc-600";
  const button = isGreen
    ? "bg-green-700 hover:bg-green-600"
    : "bg-zinc-800 hover:bg-zinc-700";

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    setError("");

    const data = { email };
    try {
      const res = await authService.generateOtp(data);
      if (res.success) {
        setStep(2);
        setSuccess("OTP sent to your email. Please check your inbox.");
      } else {
        setError(res.message || "Failed to send OTP");
      }
    } catch (error) {
      setError("An error occurred while sending OTP");
      console.error("OTP send error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = {
        email,
        otp,
        password:newPassword,
      };
      const res = await authService.resetPassword(data);

      if (res.success) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.message || "Password reset failed");
      }
    } catch (error) {
      setError("An error occurred while resetting password");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${bg} ${text}`}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Reset Password</h2>

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 text-green-300 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-5">
            <p className="text-center mb-4">
              Enter your email address to receive a password reset OTP
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300 ${
                isLoading ? "opacity-70" : ""
              }`}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            <div className="mt-4 text-center text-gray-400">
              Remember your password?{" "}
              <Link to="/login" className="text-green-500 hover:underline">
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-center mb-4">
              Enter the OTP sent to your email and your new password
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className={`w-full px-4 py-3 rounded-lg ${inputBg} focus:outline-none focus:ring-2 ${inputFocus}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className={`w-full py-3 mt-2 rounded-lg ${button} text-white font-semibold tracking-wide transition duration-300 ${
                isLoading ? "opacity-70" : ""
              }`}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full py-3 text-gray-400 hover:text-white transition duration-300"
            >
              Back to email entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
