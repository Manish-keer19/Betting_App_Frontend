import { useState } from "react";
import { ThemeType } from "./Profile/types";


 export const ChangePasswordForm = ({
  theme,
  onPasswordChange,
  isLoading,
}: {
  theme: ThemeType;
  onPasswordChange: (oldPassword: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
}) => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isGreenTheme = theme === "green";
  const buttonColor = isGreenTheme
    ? "bg-green-600 hover:bg-green-700"
    : "bg-gray-700 hover:bg-gray-600";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    // if (newPassword.length < 6) {
    //   setError("Password must be at least 6 characters");
    //   return;
    // }
    if (oldPassword === newPassword) {
      setError("New password cannot be the same as the old password");
      return;
    }

    setError("");
    await onPasswordChange(oldPassword, newPassword);

    // Clear form on success
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };




  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
          Current Password
        </label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full ${buttonColor} text-white py-2 px-4 rounded-md flex items-center justify-center`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Changing...
          </>
        ) : (
          "Change Password"
        )}
      </button>
    </form>
  );
};
