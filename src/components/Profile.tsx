
// // import { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import { toast } from "sonner";
// // import { DepositForm } from "./Profile/DepositForm";
// // import { WithdrawForm } from "./Profile/WithdrawForm";
// // import { ThemeType, UserData } from "./Profile/types";
// // import Navbar from "./Navbar";
// // import { userService } from "../Services/userService";
// // import { useDispatch } from "react-redux";
// // import { setUser } from "../features/userSlice";

// // import { TfiReload } from "react-icons/tfi";
// // import { ReferralSection } from "./Profile/ReferralSection";
// // import { ChangePasswordForm } from "./ChangPasswordForm";

// // type ActiveTab =
// //   | "profile"
// //   | "deposit"
// //   | "withdraw"
// //   | "referral"
// //   | "change-password";

// // export const Profile = () => {
// //   const dispatch = useDispatch();
// //   const [theme] = useState<ThemeType>("green");
// //   const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
// //   const userData = useSelector((state: any) => state.user);
// //   const [user, setUserdata] = useState<UserData>(userData);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [memberSince] = useState(
// //     new Date(userData.createdAt).toLocaleDateString()
// //   );

// //   useEffect(() => {
// //     setUserdata(userData);
// //   }, [userData]);

// //   const handleWithdraw = (amount: number) => {
// //     setIsLoading(true);
// //     setTimeout(() => {
// //       toast.success(`Withdrawal request of ₹${amount} submitted successfully!`);
// //       setIsLoading(false);
// //     }, 1500);
// //   };

// //   const getUserBalance = async () => {
// //     try {
// //       if (!user?.token) {
// //         toast.error("Token not found");
// //         return;
// //       }
// //       const res = await userService.getUserBalance(user.token);

// //       if (res?.success) {
// //         setUserdata((prevUser) => ({ ...prevUser, balance: res.data.balance }));
// //         dispatch(
// //           setUser({
// //             ...user,
// //             balance: res.data.balance,
// //             token: user.token || "",
// //           })
// //         );
// //       } else {
// //         toast.error(res?.message || "Failed to fetch balance");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching deposits:", error);
// //       toast.error("Something went wrong while fetching balance");
// //     }
// //   };

// //   const handlePasswordChange = async (
// //     oldPassword: string,
// //     newPassword: string
// //   ) => {
// //     setIsLoading(true);
// //     try {
// //       if (!user?.token) {
// //         toast.error("Authentication required");
// //         return;
// //       }
// //       const data = {
// //         oldPassword: oldPassword,
// //         newPassword: newPassword,
// //         email: user.email,
// //       };

// //       const response = await userService.changePassword(
// //         data,
// //         userData.token || ""
// //       );

// //       if (response?.success) {
// //         toast.success("Password changed successfully!");
// //         setActiveTab("profile");
// //       } else {
// //         toast.error(response?.message || "Failed to change password");
// //       }
// //     } catch (error) {
// //       console.error("Error changing password:", error);
// //       toast.error("Something went wrong while changing password");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const isGreenTheme = theme === "green";
// //   const bgColor = isGreenTheme
// //     ? "from-green-800 to-green-900"
// //     : "from-gray-900 to-black";
// //   const borderColor = isGreenTheme ? "border-green-600" : "border-gray-600";
// //   const textColor = isGreenTheme ? "text-green-400" : "text-gray-400";
// //   const buttonColor = isGreenTheme
// //     ? "bg-green-600 hover:bg-green-700"
// //     : "bg-gray-700 hover:bg-gray-600";

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pt-20">
// //       <Navbar />
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Tabs */}
// //         <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
// //           <div className="flex space-x-1 rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
// //             {(
// //               [
// //                 "profile",
// //                 "deposit",
// //                 "withdraw",
// //                 "change-password",
// //               ] as ActiveTab[]
// //             ).map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
// //                   activeTab === tab
// //                     ? `${
// //                         isGreenTheme
// //                           ? "bg-green-600 text-white"
// //                           : "bg-gray-700 text-white"
// //                       }`
// //                     : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
// //                 }`}
// //               >
// //                 {tab === "change-password"
// //                   ? "Change Password"
// //                   : tab.charAt(0).toUpperCase() + tab.slice(1)}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div
// //           className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-xl overflow-hidden border ${borderColor}`}
// //         >
// //           {activeTab === "profile" && (
// //             <div className="p-6 md:p-8">
// //               <div className="flex flex-col md:flex-row gap-8 items-start">
// //                 <div className="w-full md:w-auto flex flex-col items-center">
// //                   <div className="relative group flex ">
// //                     <img
// //                       src={
// //                         user.profilePic || "https://avatar.vercel.sh/username"
// //                       }
// //                       alt="Profile"
// //                       className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 transition-transform duration-300 group-hover:scale-105 "
// //                     />
// //                     {/* <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
// //                       <span className="text-white text-sm font-medium">
// //                         Edit
// //                       </span>
// //                     </div> */}
// //                   </div>
// //                   <div className="mt-4 text-center">
// //                     <h2 className="text-2xl font-bold">{user.username}</h2>
// //                     <p className={`text-sm ${textColor}`}>{user.email}</p>
// //                     <div className="mt-2 flex justify-center space-x-2">
// //                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
// //                         Verified
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex-1 w-full space-y-6">
// //                   <div
// //                     className={`p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border ${borderColor}`}
// //                   >
// //                     <h3 className="text-xl font-semibold mb-4 flex items-center">
// //                       <svg
// //                         className="w-5 h-5 mr-2"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         viewBox="0 0 24 24"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// //                         />
// //                       </svg>
// //                       Account Details
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       {[
// //                         { label: "Role", value: user.Role, icon: "badge" },
// //                         {
// //                           label: "Balance",
// //                           value: `₹${user.balance?.toLocaleString() || "0"}`,
// //                           icon: "currency-rupee",
// //                           className:
// //                             "font-bold text-lg flex items-center gap-2",
// //                           isBalance: true,
// //                         },
// //                         {
// //                           label: "Account Status",
// //                           value: "Active",
// //                           icon: "shield-check",
// //                           className: "text-green-400",
// //                         },
// //                         {
// //                           label: "Member Since",
// //                           value: memberSince,
// //                           icon: "calendar",
// //                         },
// //                         {
// //                           label: "Date of Birth",
// //                           value: user.DateOfBirth
// //                             ? new Date(user.DateOfBirth).toLocaleDateString(
// //                                 "en-GB"
// //                               ) // DD/MM/YYYY
// //                             : "N/A",

// //                           icon: "calendar",
// //                         },
// //                       ].map((item) => (
// //                         <div key={item.label} className="flex items-start">
// //                           <svg
// //                             className={`w-5 h-5 mr-2 mt-0.5 ${textColor}`}
// //                             fill="none"
// //                             stroke="currentColor"
// //                             viewBox="0 0 24 24"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth={2}
// //                               d={
// //                                 item.icon === "badge"
// //                                   ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //                                   : item.icon === "currency-rupee"
// //                                   ? "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
// //                                   : item.icon === "shield-check"
// //                                   ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
// //                                   : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
// //                               }
// //                             />
// //                           </svg>
// //                           <div className="flex flex-col">
// //                             <p className="text-sm opacity-80">{item.label}</p>
// //                             <p className={item.className || ""}>
// //                               {item.value}
// //                               {item.isBalance && (
// //                                 <TfiReload
// //                                   size={22}
// //                                   onClick={getUserBalance}
// //                                   className="inline ml-2 text-white hover:text-black cursor-pointer transition-transform duration-200 hover:rotate-90 font-bold"
// //                                   title="Refresh Balance"
// //                                 />
// //                               )}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div
// //                     className={`p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border ${borderColor}`}
// //                   >
// //                     <h3 className="text-xl font-semibold mb-4 flex items-center">
// //                       <svg
// //                         className="w-5 h-5 mr-2"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         viewBox="0 0 24 24"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M13 10V3L4 14h7v7l9-11h-7z"
// //                         />
// //                       </svg>
// //                       Quick Actions
// //                     </h3>
// //                     <div className="flex flex-wrap gap-3">
// //                       <button
// //                         onClick={() => setActiveTab("deposit")}
// //                         className={`px-4 py-2 rounded-lg font-medium flex items-center ${buttonColor} transition-colors`}
// //                       >
// //                         <svg
// //                           className="w-4 h-4 mr-2"
// //                           fill="none"
// //                           stroke="currentColor"
// //                           viewBox="0 0 24 24"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <path
// //                             strokeLinecap="round"
// //                             strokeLinejoin="round"
// //                             strokeWidth={2}
// //                             d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //                           />
// //                         </svg>
// //                         Deposit Funds
// //                       </button>
// //                       <button
// //                         onClick={() => setActiveTab("withdraw")}
// //                         className={`px-4 py-2 rounded-lg font-medium flex items-center ${buttonColor} transition-colors`}
// //                       >
// //                         <svg
// //                           className="w-4 h-4 mr-2"
// //                           fill="none"
// //                           stroke="currentColor"
// //                           viewBox="0 0 24 24"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <path
// //                             strokeLinecap="round"
// //                             strokeLinejoin="round"
// //                             strokeWidth={2}
// //                             d="M8 7l4-4m0 0l4 4m-4-4v18m-6-3h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
// //                           />
// //                         </svg>
// //                         Withdraw Funds
// //                       </button>
// //                       <button
// //                         onClick={() => setActiveTab("change-password")}
// //                         className={`px-4 py-2 rounded-lg font-medium flex items-center ${buttonColor} transition-colors`}
// //                       >
// //                         <svg
// //                           className="w-4 h-4 mr-2"
// //                           fill="none"
// //                           stroke="currentColor"
// //                           viewBox="0 0 24 24"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <path
// //                             strokeLinecap="round"
// //                             strokeLinejoin="round"
// //                             strokeWidth={2}
// //                             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
// //                           />
// //                         </svg>
// //                         Change Password
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === "deposit" && (
// //             <div className="p-6 md:p-8">
// //               <div className="flex items-center mb-6">
// //                 <button
// //                   onClick={() => setActiveTab("profile")}
// //                   className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
// //                 >
// //                   <svg
// //                     className="w-5 h-5"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                     xmlns="http://www.w3.org/2000/svg"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
// //                     />
// //                   </svg>
// //                 </button>
// //                 <h2 className="text-2xl font-bold">Deposit Funds</h2>
// //               </div>
// //               <DepositForm theme={theme} />
// //             </div>
// //           )}

// //           {activeTab === "withdraw" && (
// //             <div className="p-6 md:p-8">
// //               <div className="flex items-center mb-6">
// //                 <button
// //                   onClick={() => setActiveTab("profile")}
// //                   className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
// //                 >
// //                   <svg
// //                     className="w-5 h-5"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                     xmlns="http://www.w3.org/2000/svg"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
// //                     />
// //                   </svg>
// //                 </button>
// //                 <h2 className="text-2xl font-bold">Withdraw Funds</h2>
// //               </div>
// //               <WithdrawForm
// //                 currentBalance={user.balance || 0}
// //                 onWithdraw={handleWithdraw}
// //                 isGreenTheme={isGreenTheme}
// //               />
// //             </div>
// //           )}

// //           {activeTab === "change-password" && (
// //             <div className="p-6 md:p-8">
// //               <div className="flex items-center mb-6">
// //                 <button
// //                   onClick={() => setActiveTab("profile")}
// //                   className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
// //                 >
// //                   <svg
// //                     className="w-5 h-5"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                     xmlns="http://www.w3.org/2000/svg"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
// //                     />
// //                   </svg>
// //                 </button>
// //                 <h2 className="text-2xl font-bold">Change Password</h2>
// //               </div>
// //               {/* <ChangePasswordForm
// //                 theme={theme}
// //                 onPasswordChange={handlePasswordChange}
// //                 isLoading={isLoading}
// //               /> */}

// //               <ChangePasswordForm
// //                 theme={theme}
// //                 onPasswordChange={handlePasswordChange}
// //                 isLoading={isLoading}
// //               />
// //             </div>
// //           )}

// //           {isLoading && (
// //             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
// //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
// //             </div>
// //           )}
// //         </div>

// //         <ReferralSection
// //           referralData={{
// //             referralCode: user.referralCode || "",
// //             referredBy: user.referredBy,
// //             balance: user.balance,
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };






// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { DepositForm } from "./Profile/DepositForm";
// import { WithdrawForm } from "./Profile/WithdrawForm";
// import { ThemeType, UserData } from "./Profile/types";
// import Navbar from "./Navbar";
// import { userService } from "../Services/userService";
// import { useDispatch } from "react-redux";
// import { setUser } from "../features/userSlice";

// import { TfiReload } from "react-icons/tfi";
// import { ReferralSection } from "./Profile/ReferralSection";
// import { ChangePasswordForm } from "./ChangPasswordForm";

// type ActiveTab =
//   | "profile"
//   | "deposit"
//   | "withdraw"
//   | "referral"
//   | "change-password";

// export const Profile = () => {
//   const dispatch = useDispatch();
//   const [theme] = useState<ThemeType>("green");
//   const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
//   const userData = useSelector((state: any) => state.user);
//   const [user, setUserdata] = useState<UserData>(userData);
//   const [isLoading, setIsLoading] = useState(false);
//   const [memberSince] = useState(
//     new Date(userData.createdAt).toLocaleDateString()
//   );

//   useEffect(() => {
//     setUserdata(userData);
//   }, [userData]);

//   const handleWithdraw = (amount: number) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       toast.success(`Withdrawal request of ₹${amount} submitted successfully!`);
//       setIsLoading(false);
//     }, 1500);
//   };

//   const getUserBalance = async () => {
//     try {
//       if (!user?.token) {
//         toast.error("Token not found");
//         return;
//       }
//       const res = await userService.getUserBalance(user.token);

//       if (res?.success) {
//         setUserdata((prevUser) => ({ ...prevUser, balance: res.data.balance }));
//         dispatch(
//           setUser({
//             ...user,
//             balance: res.data.balance,
//             token: user.token || "",
//           })
//         );
//       } else {
//         toast.error(res?.message || "Failed to fetch balance");
//       }
//     } catch (error) {
//       console.error("Error fetching deposits:", error);
//       toast.error("Something went wrong while fetching balance");
//     }
//   };

//   const handlePasswordChange = async (
//     oldPassword: string,
//     newPassword: string
//   ) => {
//     setIsLoading(true);
//     try {
//       if (!user?.token) {
//         toast.error("Authentication required");
//         return;
//       }
//       const data = {
//         oldPassword: oldPassword,
//         newPassword: newPassword,
//         email: user.email,
//       };

//       const response = await userService.changePassword(
//         data,
//         userData.token || ""
//       );

//       if (response?.success) {
//         toast.success("Password changed successfully!");
//         setActiveTab("profile");
//       } else {
//         toast.error(response?.message || "Failed to change password");
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       toast.error("Something went wrong while changing password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isGreenTheme = theme === "green";
//   const bgColor = isGreenTheme
//     ? "from-green-800 to-green-900"
//     : "from-gray-900 to-black";
//   const borderColor = isGreenTheme ? "border-green-600" : "border-gray-600";
//   const textColor = isGreenTheme ? "text-green-400" : "text-gray-400";
//   const buttonColor = isGreenTheme
//     ? "bg-green-600 hover:bg-green-700"
//     : "bg-gray-700 hover:bg-gray-600";
//   const activeTabColor = isGreenTheme
//     ? "bg-green-600 text-white"
//     : "bg-gray-700 text-white";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pt-20">
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Tabs */}
//         <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
//           <div className="flex space-x-1 rounded-lg bg-gray-200 dark:bg-gray-800 p-1 min-w-max">
//             {(
//               [
//                 "profile",
//                 "deposit",
//                 "withdraw",
//                 "change-password",
//               ] as ActiveTab[]
//             ).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
//                   activeTab === tab
//                     ? activeTabColor
//                     : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {tab === "change-password"
//                   ? "Change Password"
//                   : tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div
//           className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-xl overflow-hidden border ${borderColor} relative`}
//         >
//           {activeTab === "profile" && (
//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
//                 {/* Profile Picture Section */}
//                 <div className="w-full md:w-auto flex flex-col items-center">
//                   <div className="relative group">
//                     <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
//                       <img
//                         src={
//                           user.profilePic || "https://avatar.vercel.sh/username"
//                         }
//                         alt="Profile"
//                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                       />
//                     </div>
//                     <div className="mt-4 text-center">
//                       <h2 className="text-xl md:text-2xl font-bold text-white">
//                         {user.username}
//                       </h2>
//                       <p className={`text-xs md:text-sm ${textColor}`}>
//                         {user.email}
//                       </p>
//                       <div className="mt-2 flex justify-center">
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//                           Verified
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Account Details Section */}
//                 <div className="flex-1 w-full space-y-4 md:space-y-6">
//                   <div
//                     className={`p-4 sm:p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm border ${borderColor}`}
//                   >
//                     <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center text-white">
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       Account Details
//                     </h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//                       {[
//                         { label: "Role", value: user.Role, icon: "badge" },
//                         {
//                           label: "Balance",
//                           value: `₹${user.balance?.toLocaleString() || "0"}`,
//                           icon: "currency-rupee",
//                           className:
//                             "font-bold text-md md:text-lg flex items-center gap-2 text-white",
//                           isBalance: true,
//                         },
//                         {
//                           label: "Account Status",
//                           value: "Active",
//                           icon: "shield-check",
//                           className: "text-green-400",
//                         },
//                         {
//                           label: "Phone Number",
//                           value: user?.phoneNumber || "N/A",
//                           icon: "calendar",
//                         },
//                         {
//                           label: "Member Since",
//                           value: memberSince,
//                           icon: "calendar",
//                         },
//                         {
//                           label: "Date of Birth",
//                           value: user.DateOfBirth
//                             ? new Date(user.DateOfBirth).toLocaleDateString(
//                                 "en-GB"
//                               )
//                             : "N/A",
//                           icon: "calendar",
//                         },
//                       ].map((item) => (
//                         <div
//                           key={item.label}
//                           className="flex items-start space-x-2"
//                         >
//                           <svg
//                             className={`w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0 ${textColor}`}
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d={
//                                 item.icon === "badge"
//                                   ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                                   : item.icon === "currency-rupee"
//                                   ? "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
//                                   : item.icon === "shield-check"
//                                   ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                                   : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               }
//                             />
//                           </svg>
//                           <div className="flex flex-col">
//                             <p className="text-xs md:text-sm opacity-80 text-gray-300">
//                               {item.label}
//                             </p>
//                             <p
//                               className={`${
//                                 item.className || "text-white text-sm md:text-base"
//                               }`}
//                             >
//                               {item.value}
//                               {item.isBalance && (
//                                 <TfiReload
//                                   size={18}
//                                   onClick={getUserBalance}
//                                   className="inline ml-2 text-white hover:text-green-300 cursor-pointer transition-transform duration-200 hover:rotate-90"
//                                   title="Refresh Balance"
//                                 />
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Quick Actions Section */}
//                   <div
//                     className={`p-4 sm:p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm border ${borderColor}`}
//                   >
//                     <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center text-white">
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                       Quick Actions
//                     </h3>
//                     <div className="flex flex-wrap gap-2 md:gap-3">
//                       <button
//                         onClick={() => setActiveTab("deposit")}
//                         className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium flex items-center ${buttonColor} transition-colors text-white`}
//                       >
//                         <svg
//                           className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         Deposit
//                       </button>
//                       <button
//                         onClick={() => setActiveTab("withdraw")}
//                         className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium flex items-center ${buttonColor} transition-colors text-white`}
//                       >
//                         <svg
//                           className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M8 7l4-4m0 0l4 4m-4-4v18m-6-3h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                         Withdraw
//                       </button>
//                       <button
//                         onClick={() => setActiveTab("change-password")}
//                         className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium flex items-center ${buttonColor} transition-colors text-white`}
//                       >
//                         <svg
//                           className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                           />
//                         </svg>
//                         Change Password
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "deposit" && (
//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex items-center mb-4 md:mb-6">
//                 <button
//                   onClick={() => setActiveTab("profile")}
//                   className="mr-3 p-1.5 md:p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
//                 >
//                   <svg
//                     className="w-4 h-4 md:w-5 md:h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                     />
//                   </svg>
//                 </button>
//                 <h2 className="text-xl md:text-2xl font-bold text-white">
//                   Deposit Funds
//                 </h2>
//               </div>
//               <DepositForm theme={theme} />
//             </div>
//           )}

//           {activeTab === "withdraw" && (
//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex items-center mb-4 md:mb-6">
//                 <button
//                   onClick={() => setActiveTab("profile")}
//                   className="mr-3 p-1.5 md:p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
//                 >
//                   <svg
//                     className="w-4 h-4 md:w-5 md:h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                     />
//                   </svg>
//                 </button>
//                 <h2 className="text-xl md:text-2xl font-bold text-white">
//                   Withdraw Funds
//                 </h2>
//               </div>
//               <WithdrawForm
//                 currentBalance={user.balance || 0}
//                 onWithdraw={handleWithdraw}
//                 isGreenTheme={isGreenTheme}
//               />
//             </div>
//           )}

//           {activeTab === "change-password" && (
//             <div className="p-4 sm:p-6 md:p-8">
//               <div className="flex items-center mb-4 md:mb-6">
//                 <button
//                   onClick={() => setActiveTab("profile")}
//                   className="mr-3 p-1.5 md:p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
//                 >
//                   <svg
//                     className="w-4 h-4 md:w-5 md:h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                     />
//                   </svg>
//                 </button>
//                 <h2 className="text-xl md:text-2xl font-bold text-white">
//                   Change Password
//                 </h2>
//               </div>
//               <ChangePasswordForm
//                 theme={theme}
//                 onPasswordChange={handlePasswordChange}
//                 isLoading={isLoading}
//               />
//             </div>
//           )}

//           {isLoading && (
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           )}
//         </div>

//         {/* Referral Section */}
//         <div className="mt-6">
//           <ReferralSection
//             referralData={{
//               referralCode: user.referralCode || "",
//               referredBy: user.referredBy,
//               balance: user.balance,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };





import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { userService } from "../Services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { DepositForm } from "./Profile/DepositForm";
import { WithdrawForm } from "./Profile/WithdrawForm";
import { ReferralSection } from "./Profile/ReferralSection";
import { ChangePasswordForm } from "./ChangPasswordForm";
import Navbar from "./Navbar";

// Icons
import { 
  FiArrowLeft, 
  FiDollarSign, 
  FiCreditCard, 
  FiKey, 
  FiUser, 
  FiShield, 
  FiCalendar, 
  FiRefreshCw,
  FiCheck
} from "react-icons/fi";
import { FaRupeeSign, FaUserShield } from "react-icons/fa";
import { RiCoinsLine } from "react-icons/ri";

type ThemeType = "green" | "black";
type ActiveTab = "profile" | "deposit" | "withdraw" | "change-password";

interface UserData {
  _id: string;
  username: string;
  email: string;
  balance: number;
  Role: string;
  profilePic?: string;
  phoneNumber?: string;
  DateOfBirth?: string;
  createdAt: string;
  token?: string;
  referralCode?: string;
  referredBy?: string;
}

export const Profile = () => {
  const dispatch = useDispatch();
  const [theme] = useState<ThemeType>("green");
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const userData = useSelector((state: any) => state.user);
  const [user, setUserdata] = useState<UserData>(userData);
  const [isLoading, setIsLoading] = useState(false);
  const [memberSince] = useState(
    new Date(userData.createdAt).toLocaleDateString()
  );

  useEffect(() => {
    setUserdata(userData);
  }, [userData]);

  const handleWithdraw = (amount: number) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Withdrawal request of ₹${amount} submitted successfully!`);
      setIsLoading(false);
    }, 1500);
  };

  const getUserBalance = async () => {
    try {
      if (!user?.token) {
        toast.error("Token not found");
        return;
      }
      const res = await userService.getUserBalance(user.token);

      if (res?.success) {
        setUserdata((prevUser) => ({ ...prevUser, balance: res.data.balance }));
        dispatch(
          setUser({
            ...user,
            balance: res.data.balance,
            token: user.token || "",
            profilePic: user.profilePic || "",
          })
        );
        toast.success("Balance updated successfully");
      } else {
        toast.error(res?.message || "Failed to fetch balance");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Something went wrong while fetching balance");
    }
  };

  const handlePasswordChange = async (
    oldPassword: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    try {
      if (!user?.token) {
        toast.error("Authentication required");
        return;
      }
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        email: user.email,
      };

      const response = await userService.changePassword(
        data,
        userData.token || ""
      );

      if (response?.success) {
        toast.success("Password changed successfully!");
        setActiveTab("profile");
      } else {
        toast.error(response?.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Something went wrong while changing password");
    } finally {
      setIsLoading(false);
    }
  };

  const isGreenTheme = theme === "green";
  const bgColor = isGreenTheme
    ? "from-green-900/90 to-green-900"
    : "from-gray-900 to-black";
  const borderColor = isGreenTheme 
    ? "border-green-600/30" 
    : "border-gray-600/30";
  const textColor = isGreenTheme 
    ? "text-green-300" 
    : "text-gray-300";
  const activeTabColor = isGreenTheme
    ? "bg-green-600 text-white"
    : "bg-gray-700 text-white";
  const cardBg = isGreenTheme
    ? "bg-green-900/20"
    : "bg-gray-800/20";

  const profileTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <FiUser className="mr-2" /> },
    { id: "deposit", label: "Deposit", icon: <FiDollarSign className="mr-2" /> },
    { id: "withdraw", label: "Withdraw", icon: <FiCreditCard className="mr-2" /> },
    { id: "change-password", label: "Security", icon: <FiKey className="mr-2" /> },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${isGreenTheme ? "from-green-50 to-green-100" : "from-gray-100 to-gray-200"} dark:from-gray-900 dark:to-gray-800 pt-20`}>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide"
        >
          <div className={`flex space-x-1 rounded-xl p-1 min-w-max ${isGreenTheme ? "bg-green-800/20" : "bg-gray-800/20"} backdrop-blur-sm border ${borderColor}`}>
            {profileTabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex items-center ${
                  activeTab === tab.id
                    ? `${activeTabColor} shadow-lg`
                    : `${isGreenTheme ? "text-green-200 hover:bg-green-800/30" : "text-gray-300 hover:bg-gray-700/30"}`
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`bg-gradient-to-br ${bgColor} rounded-2xl shadow-2xl overflow-hidden border ${borderColor} relative`}
        >
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Profile Card */}
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`w-full lg:w-auto p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl"
                        >
                          <img
                            src={user.profilePic || "https://avatar.vercel.sh/username"}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </motion.div>
                        <div className="mt-6 text-center">
                          <h2 className="text-2xl font-bold text-white">
                            {user.username}
                          </h2>
                          <p className={`text-sm ${textColor} mt-1`}>
                            {user.email}
                          </p>
                          <div className="mt-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isGreenTheme ? "bg-green-800/40 text-green-300" : "bg-gray-800/40 text-gray-300"} border ${borderColor}`}>
                              <FiCheck className="mr-1" />
                              Verified Account
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Account Details */}
                  <div className="flex-1 w-full space-y-6">
                    {/* Balance Card */}
                    <motion.div
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold flex items-center text-white">
                          <RiCoinsLine className="mr-2" />
                          Account Balance
                        </h3>
                        <button 
                          onClick={getUserBalance}
                          className={`p-2 rounded-full ${isGreenTheme ? "hover:bg-green-800/40" : "hover:bg-gray-800/40"} transition-colors`}
                          title="Refresh Balance"
                        >
                          <FiRefreshCw className={`${isLoading ? "animate-spin" : ""} ${textColor}`} />
                        </button>
                      </div>
                      <div className="mt-4 flex items-end">
                        <span className="text-3xl md:text-4xl font-bold text-white flex items-center">
                          <FaRupeeSign className="mr-1" />
                          {user.balance?.toLocaleString() || "0"}
                        </span>
                        <span className={`ml-2 mb-1 text-sm ${textColor}`}>
                          INR
                        </span>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab("deposit")}
                          className={`py-2 px-4 rounded-lg font-medium flex items-center justify-center ${isGreenTheme ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                        >
                          <FiDollarSign className="mr-2" />
                          Deposit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab("withdraw")}
                          className={`py-2 px-4 rounded-lg font-medium flex items-center justify-center ${isGreenTheme ? "bg-green-800/60 hover:bg-green-800/80 border border-green-600/30" : "bg-gray-800/60 hover:bg-gray-800/80 border border-gray-600/30"} text-white`}
                        >
                          <FiCreditCard className="mr-2" />
                          Withdraw
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Account Info */}
                    <motion.div
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
                    >
                      <h3 className="text-lg font-semibold flex items-center text-white mb-4">
                        <FaUserShield className="mr-2" />
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { 
                            label: "Role", 
                            value: user.Role, 
                            icon: <FiUser className="text-gray-400" /> 
                          },
                          { 
                            label: "Account Status", 
                            value: "Active", 
                            icon: <FiShield className="text-green-400" />,
                            valueClass: "text-green-400"
                          },
                          { 
                            label: "Phone Number", 
                            value: user?.phoneNumber || "Not set", 
                            icon: <FiUser className="text-gray-400" />,
                            valueClass: !user?.phoneNumber ? "text-gray-400" : ""
                          },
                          { 
                            label: "Member Since", 
                            value: memberSince, 
                            icon: <FiCalendar className="text-gray-400" /> 
                          },
                          { 
                            label: "Date of Birth", 
                            value: user.DateOfBirth
                              ? new Date(user.DateOfBirth).toLocaleDateString("en-GB")
                              : "Not set", 
                            icon: <FiCalendar className="text-gray-400" />,
                            valueClass: !user.DateOfBirth ? "text-gray-400" : ""
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start space-x-3"
                          >
                            <div className={`p-2 rounded-lg ${isGreenTheme ? "bg-green-800/30" : "bg-gray-800/30"}`}>
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">{item.label}</p>
                              <p className={`text-sm ${item.valueClass || "text-white"}`}>
                                {item.value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "deposit" && (
              <motion.div
                key="deposit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8"
              >
                <div className="flex items-center mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab("profile")}
                    className={`mr-3 p-2 rounded-full ${isGreenTheme ? "hover:bg-green-800/40" : "hover:bg-gray-800/40"} transition-colors`}
                  >
                    <FiArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FiDollarSign className="mr-2" />
                    Deposit Funds
                  </h2>
                </div>
                <DepositForm theme={theme} />
              </motion.div>
            )}

            {activeTab === "withdraw" && (
              <motion.div
                key="withdraw"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8"
              >
                <div className="flex items-center mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab("profile")}
                    className={`mr-3 p-2 rounded-full ${isGreenTheme ? "hover:bg-green-800/40" : "hover:bg-gray-800/40"} transition-colors`}
                  >
                    <FiArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FiCreditCard className="mr-2" />
                    Withdraw Funds
                  </h2>
                </div>
                <WithdrawForm
                  currentBalance={user.balance || 0}
                  onWithdraw={handleWithdraw}
                  isGreenTheme={isGreenTheme}
                />
              </motion.div>
            )}

            {activeTab === "change-password" && (
              <motion.div
                key="change-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8"
              >
                <div className="flex items-center mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab("profile")}
                    className={`mr-3 p-2 rounded-full ${isGreenTheme ? "hover:bg-green-800/40" : "hover:bg-gray-800/40"} transition-colors`}
                  >
                    <FiArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FiKey className="mr-2" />
                    Account Security
                  </h2>
                </div>
                <ChangePasswordForm
                  theme={theme}
                  onPasswordChange={handlePasswordChange}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Overlay */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur-sm"
            >
              <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isGreenTheme ? "border-green-500" : "border-gray-500"}`}></div>
            </motion.div>
          )}
        </motion.div>

        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <ReferralSection
            referralData={{
              referralCode: user.referralCode || "",
              referredBy: user.referredBy,
              balance: user.balance,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};