// // // import React, { useState } from 'react';
// // // import { useSelector } from 'react-redux';

// // // const Profile: React.FC = () => {
// // //   const [theme] = useState<'green' | 'black'>('black'); // Change to 'green' if you want
// // //   const isGreenTheme = theme === 'green';

// // //   const userData = useSelector((state: any) => state.user);

// // //   console.log('User Data:', userData);
// // //   const [user, setuserdata] = useState(userData)

// // //   return (
// // //     <div
// // //       className={` p-6 rounded-2xl shadow-lg ${
// // //         isGreenTheme ? 'bg-green-700 text-white' : 'bg-black text-white'
// // //       }`}
// // //     >
// // //       <div className="flex flex-col items-center space-y-4">
// // //         <img
// // //           src={user.profilePic}
// // //           alt="Profile"
// // //           className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
// // //         />
// // //         <h2 className="text-2xl font-bold">{user.username}</h2>
// // //         <p className="text-sm text-gray-300">{user.email}</p>
// // //         <div className="w-full mt-4 text-left space-y-2">
// // //           <p>
// // //             <span className="font-semibold">Role:</span> {user.Role}
// // //           </p>
// // //           <p>
// // //             <span className="font-semibold">Balance:</span> ₹{user.balance}
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Profile;

// // import React, { useState, useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { QRCodeSVG } from 'qrcode.react';

// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const Profile: React.FC = () => {
// //   const [theme] = useState<'green' | 'black'>('green');
// //   const [activeTab, setActiveTab] = useState<'profile' | 'deposit' | 'withdraw'>('profile');
// //   const [depositAmount, setDepositAmount] = useState<number>(100);
// //   const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
// //   const [showQR, setShowQR] = useState<boolean>(false);
// //   const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank'>('upi');

// //   const userData = useSelector((state: any) => state.user);
// //   const [user, setUserdata] = useState(userData);

// //   useEffect(() => {
// //     setUserdata(userData);
// //   }, [userData]);

// //   const handleDeposit = () => {
// //     if (depositAmount < 100) {
// //       toast.error('Minimum deposit amount is ₹100');
// //       return;
// //     }
// //     setShowQR(true);
// //     toast.info('Please scan the QR code to complete your deposit');
// //   };

// //   const handleWithdraw = () => {
// //     if (withdrawAmount < 100) {
// //       toast.error('Minimum withdrawal amount is ₹100');
// //       return;
// //     }
// //     if (withdrawAmount > user.balance) {
// //       toast.error('Insufficient balance');
// //       return;
// //     }
// //     toast.success(`Withdrawal request of ₹${withdrawAmount} submitted successfully`);
// //     // Here you would typically call an API to process withdrawal
// //   };

// //   const isGreenTheme = theme === 'green';

// //   return (
// //     <div className="min-h-screen p-4 md:p-8">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Tabs */}
// //         <div className="flex mb-6 border-b border-gray-200">
// //           <button
// //             onClick={() => setActiveTab('profile')}
// //             className={`py-2 px-4 font-medium ${activeTab === 'profile' ?
// //               (isGreenTheme ? 'text-green-600 border-b-2 border-green-600' : 'text-black border-b-2 border-black') :
// //               'text-gray-500'}`}
// //           >
// //             Profile
// //           </button>
// //           <button
// //             onClick={() => setActiveTab('deposit')}
// //             className={`py-2 px-4 font-medium ${activeTab === 'deposit' ?
// //               (isGreenTheme ? 'text-green-600 border-b-2 border-green-600' : 'text-black border-b-2 border-black') :
// //               'text-gray-500'}`}
// //           >
// //             Deposit
// //           </button>
// //           <button
// //             onClick={() => setActiveTab('withdraw')}
// //             className={`py-2 px-4 font-medium ${activeTab === 'withdraw' ?
// //               (isGreenTheme ? 'text-green-600 border-b-2 border-green-600' : 'text-black border-b-2 border-black') :
// //               'text-gray-500'}`}
// //           >
// //             Withdraw
// //           </button>
// //         </div>

// //         {/* Content */}
// //         <div className={`p-6 rounded-2xl shadow-lg ${isGreenTheme ? 'bg-green-700 text-white' : 'bg-black text-white'}`}>
// //           {activeTab === 'profile' && (
// //             <div className="flex flex-col md:flex-row gap-8">
// //               <div className="flex flex-col items-center space-y-4">
// //                 <img
// //                   src={user.profilePic || 'https://via.placeholder.com/150'}
// //                   alt="Profile"
// //                   className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
// //                 />
// //                 <h2 className="text-2xl font-bold">{user.username}</h2>
// //                 <p className="text-sm text-gray-300">{user.email}</p>
// //               </div>
// //               <div className="flex-1 space-y-4">
// //                 <div className="bg-white bg-opacity-10 p-4 rounded-lg">
// //                   <h3 className="text-xl font-semibold mb-2">Account Details</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <p className="text-gray-300">Role</p>
// //                       <p className="font-medium">{user.Role}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-gray-300">Balance</p>
// //                       <p className="font-medium">₹{user.balance?.toLocaleString() || '0'}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-gray-300">Account Status</p>
// //                       <p className="font-medium text-green-400">Active</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-gray-300">Member Since</p>
// //                       <p className="font-medium">{new Date().toLocaleDateString()}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="bg-white bg-opacity-10 p-4 rounded-lg">
// //                   <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
// //                   <div className="flex flex-wrap gap-3">
// //                     <button
// //                       onClick={() => setActiveTab('deposit')}
// //                       className={`px-4 py-2 rounded-lg ${isGreenTheme ? 'bg-green-600 hover:bg-green-800' : 'bg-gray-800 hover:bg-gray-700'}`}
// //                     >
// //                       Deposit Funds
// //                     </button>
// //                     <button
// //                       onClick={() => setActiveTab('withdraw')}
// //                       className={`px-4 py-2 rounded-lg ${isGreenTheme ? 'bg-green-600 hover:bg-green-800' : 'bg-gray-800 hover:bg-gray-700'}`}
// //                     >
// //                       Withdraw Funds
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'deposit' && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold">Deposit Funds</h2>

// //               <div className="bg-white bg-opacity-10 p-4 rounded-lg">
// //                 <div className="mb-4">
// //                   <label className="block mb-2">Amount (Minimum ₹100)</label>
// //                   <input
// //                     type="number"
// //                     min="100"
// //                     value={depositAmount}
// //                     onChange={(e) => setDepositAmount(Math.max(100, Number(e.target.value)))}
// //                     className="w-full p-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white"
// //                   />
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block mb-2">Payment Method</label>
// //                   <div className="flex gap-4">
// //                     <button
// //                       onClick={() => setPaymentMethod('upi')}
// //                       className={`px-4 py-2 rounded-lg ${paymentMethod === 'upi' ?
// //                         (isGreenTheme ? 'bg-green-600' : 'bg-gray-800') : 'bg-white bg-opacity-10'}`}
// //                     >
// //                       UPI
// //                     </button>
// //                     <button
// //                       onClick={() => setPaymentMethod('bank')}
// //                       className={`px-4 py-2 rounded-lg ${paymentMethod === 'bank' ?
// //                         (isGreenTheme ? 'bg-green-600' : 'bg-gray-800') : 'bg-white bg-opacity-10'}`}
// //                     >
// //                       Bank Transfer
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={handleDeposit}
// //                   className={`w-full py-3 rounded-lg font-bold ${isGreenTheme ? 'bg-green-600 hover:bg-green-800' : 'bg-gray-800 hover:bg-gray-700'}`}
// //                 >
// //                   Proceed to Pay ₹{depositAmount}
// //                 </button>
// //               </div>

// //               {showQR && paymentMethod === 'upi' && (
// //                 <div className="bg-white bg-opacity-10 p-6 rounded-lg flex flex-col items-center">
// //                   <h3 className="text-xl font-semibold mb-4">Scan QR Code to Pay</h3>
// //                   <div className="p-4 bg-white rounded-lg mb-4">
// //                     <QRCodeSVG
// //                       value={`upi://pay?pa=your-upi-id@oksbi&pn=YourAppName&am=${depositAmount}&cu=INR`}
// //                       size={200}
// //                     />
// //                   </div>
// //                   <p className="text-center text-gray-300 mb-2">Amount: ₹{depositAmount}</p>
// //                   <p className="text-center text-gray-300">UPI ID: your-upi-id@oksbi</p>
// //                 </div>
// //               )}

// //               {showQR && paymentMethod === 'bank' && (
// //                 <div className="bg-white bg-opacity-10 p-6 rounded-lg">
// //                   <h3 className="text-xl font-semibold mb-4">Bank Transfer Details</h3>
// //                   <div className="space-y-3">
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-300">Bank Name:</span>
// //                       <span>State Bank of India</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-300">Account Name:</span>
// //                       <span>YourAppName</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-300">Account Number:</span>
// //                       <span>1234567890</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-300">IFSC Code:</span>
// //                       <span>SBIN0001234</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-300">Amount:</span>
// //                       <span>₹{depositAmount}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {activeTab === 'withdraw' && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold">Withdraw Funds</h2>

// //               <div className="bg-white bg-opacity-10 p-4 rounded-lg">
// //                 <div className="mb-4">
// //                   <label className="block mb-2">Amount (Minimum ₹100)</label>
// //                   <input
// //                     type="number"
// //                     min="100"
// //                     max={user.balance}
// //                     value={withdrawAmount}
// //                     onChange={(e) => setWithdrawAmount(Math.max(100, Number(e.target.value)))}
// //                     className="w-full p-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white"
// //                   />
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block mb-2">Available Balance</label>
// //                   <div className="p-3 rounded-lg bg-white bg-opacity-10">
// //                     ₹{user.balance?.toLocaleString() || '0'}
// //                   </div>
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block mb-2">Withdrawal Method</label>
// //                   <select className="w-full p-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white">
// //                     <option value="upi">UPI</option>
// //                     <option value="bank">Bank Account</option>
// //                   </select>
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block mb-2">UPI ID / Account Number</label>
// //                   <input
// //                     type="text"
// //                     placeholder="Enter your UPI ID or Account Number"
// //                     className="w-full p-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white"
// //                   />
// //                 </div>

// //                 <button
// //                   onClick={handleWithdraw}
// //                   className={`w-full py-3 rounded-lg font-bold ${isGreenTheme ? 'bg-green-600 hover:bg-green-800' : 'bg-gray-800 hover:bg-gray-700'}`}
// //                 >
// //                   Withdraw ₹{withdrawAmount}
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { DepositForm } from "./Profile/DepositForm";
// import { WithdrawForm } from "./Profile/WithdrawForm";
// import { BankDetails, ThemeType, UserData } from "./Profile/types";

// import Navbar from "./Navbar";

// type ActiveTab = "profile" | "deposit" | "withdraw";

// export const Profile = () => {
//   const [theme] = useState<ThemeType>("green");
//   const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
//   const userData = useSelector((state: any) => state.user);
//   const [user, setUserdata] = useState<UserData>(userData);

//   useEffect(() => {
//     setUserdata(userData);
//   }, [userData]);

//   const handleDeposit = (amount: number) => {};

//   const handleWithdraw = (amount: number, bankDetails: BankDetails) => {
//     // Here you would typically call an API to process withdrawal
//   };

//   const isGreenTheme = theme === "green";

//   return (
//     <div className="min-h-screen ">
//       <Navbar />
//       <div className="max-w-4xl mx-auto mt-[9vh]">
//         {/* Tabs */}
//         <div className="flex mb-6 border-b border-gray-200">
//           {(["profile", "deposit", "withdraw"] as ActiveTab[]).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`py-2 px-4 font-medium capitalize ${
//                 activeTab === tab
//                   ? isGreenTheme
//                     ? "text-green-600 border-b-2 border-green-600"
//                     : "text-black border-b-2 border-black"
//                   : "text-gray-500"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div
//           className={`p-6 rounded-2xl shadow-lg ${
//             isGreenTheme ? "bg-green-700 text-white" : "bg-black text-white"
//           }`}
//         >
//           {activeTab === "profile" && (
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="flex flex-col items-center space-y-4">
//                 <img
//                   src={user.profilePic || "https://via.placeholder.com/150"}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
//                 />
//                 <h2 className="text-2xl font-bold">{user.username}</h2>
//                 <p className="text-sm opacity-80">{user.email}</p>
//               </div>
//               <div className="flex-1 space-y-4">
//                 <div className="bg-white bg-opacity-10 p-4 rounded-lg">
//                   <h3 className="text-xl font-semibold mb-2">
//                     Account Details
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {[
//                       { label: "Role", value: user.Role },
//                       {
//                         label: "Balance",
//                         value: `₹${user.balance?.toLocaleString() || "0"}`,
//                       },
//                       {
//                         label: "Account Status",
//                         value: "Active",
//                         className: "text-green-400",
//                       },
//                       {
//                         label: "Member Since",
//                         value: new Date().toLocaleDateString(),
//                       },
//                     ].map((item) => (
//                       <div key={item.label}>
//                         <p className="opacity-70">{item.label}</p>
//                         <p className={`font-medium ${item.className || ""}`}>
//                           {item.value}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-white bg-opacity-10 p-4 rounded-lg">
//                   <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
//                   <div className="flex flex-wrap gap-3">
//                     <button
//                       onClick={() => setActiveTab("deposit")}
//                       className={`px-4 py-2 rounded-lg ${
//                         isGreenTheme
//                           ? "bg-green-600 hover:bg-green-800"
//                           : "bg-gray-800 hover:bg-gray-700"
//                       }`}
//                     >
//                       Deposit Funds
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("withdraw")}
//                       className={`px-4 py-2 rounded-lg ${
//                         isGreenTheme
//                           ? "bg-green-600 hover:bg-green-800"
//                           : "bg-gray-800 hover:bg-gray-700"
//                       }`}
//                     >
//                       Withdraw Funds
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "deposit" && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold">Deposit Funds</h2>
//               <DepositForm

//                 onDeposit={handleDeposit}
//                 theme={theme}
//               />
//             </div>
//           )}

//           {activeTab === "withdraw" && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold">Withdraw Funds</h2>
//               <WithdrawForm
//                 currentBalance={user.balance}
//                 onWithdraw={handleWithdraw}
//                 theme={theme}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { DepositForm } from "./Profile/DepositForm";
import { WithdrawForm } from "./Profile/WithdrawForm";
import {  ThemeType, UserData } from "./Profile/types";
import Navbar from "./Navbar";
import { userService } from "../Services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

import { TfiReload } from "react-icons/tfi";


type ActiveTab = "profile" | "deposit" | "withdraw";

export const Profile = () => {
  const dispatch = useDispatch();
  const [theme] = useState<ThemeType>("green");
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const userData = useSelector((state: any) => state.user);
  const [user, setUserdata] = useState<UserData>(userData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserdata(userData);
  }, [userData]);

  // const handleDeposit = (amount: number) => {
  //   setIsLoading(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     toast.success(`Deposit of ₹${amount} submitted successfully!`);
  //     setIsLoading(false);
  //   }, 1500);
  // };

  const handleWithdraw = (amount: number) => {
    setIsLoading(true);
    // Simulate API call
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
          })
        );
        // toast.success("Balance fetched successfully!");
      } else {
        toast.error(res?.message || "Failed to fetch balance");
      }
    } catch (error) {
      console.error("Error fetching deposits:", error);
      toast.error("Something went wrong while fetching balance");
    }
  };

  const isGreenTheme = theme === "green";
  const bgColor = isGreenTheme
    ? "from-green-800 to-green-900"
    : "from-gray-900 to-black";
  const borderColor = isGreenTheme ? "border-green-600" : "border-gray-600";
  const textColor = isGreenTheme ? "text-green-400" : "text-gray-400";
  const buttonColor = isGreenTheme
    ? "bg-green-600 hover:bg-green-700"
    : "bg-gray-700 hover:bg-gray-600";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="flex space-x-1 rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
            {(["profile", "deposit", "withdraw"] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab
                    ? `${
                        isGreenTheme
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-white"
                      }`
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-xl overflow-hidden border ${borderColor}`}
        >
          {activeTab === "profile" && (
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-auto flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src={
                        user.profilePic || "https://avatar.vercel.sh/username"
                      }
                      alt="Profile"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-800 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                      <span className="text-white text-sm font-medium">
                        Edit
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-2xl font-bold">{user.username}</h2>
                    <p className={`text-sm ${textColor}`}>{user.email}</p>
                    <div className="mt-2 flex justify-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-6">
                  <div
                    className={`p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border ${borderColor}`}
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Account Details
                    </h3>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Role", value: user.Role, icon: "badge" },
                        {
                          label: "Balance",
                          value: `₹${user.balance?.toLocaleString() || "0"}`,
                          icon: "currency-rupee",
                          className: "font-bold text-lg",
                        },
                        {
                          label: "Account Status",
                          value: "Active",
                          icon: "shield-check",
                          className: "text-green-400",
                        },
                        {
                          label: "Member Since",
                          value: new Date().toLocaleDateString(),
                          icon: "calendar",
                        },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start">
                          <svg
                            className={`w-5 h-5 mr-2 mt-0.5 ${textColor}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={`M${
                                item.icon === "badge"
                                  ? "9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  : item.icon === "currency-rupee"
                                  ? "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                                  : item.icon === "shield-check"
                                  ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                  : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              }`}
                            />
                          </svg>
                          <div>
                            <p className="text-sm opacity-80">{item.label}</p>
                            <p className={`${item.className || ""}`}>
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div> */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {[
    { label: "Role", value: user.Role, icon: "badge" },
    {
      label: "Balance",
      value: `₹${user.balance?.toLocaleString() || "0"}`,
      icon: "currency-rupee",
      className: "font-bold text-lg flex items-center gap-2",
      isBalance: true, // Custom flag to conditionally render the reload icon
    },
    {
      label: "Account Status",
      value: "Active",
      icon: "shield-check",
      className: "text-green-400",
    },
    {
      label: "Member Since",
      value: new Date().toLocaleDateString(),
      icon: "calendar",
    },
  ].map((item) => (
    <div key={item.label} className="flex items-start">
      <svg
        className={`w-5 h-5 mr-2 mt-0.5 ${textColor}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={`${
            item.icon === "badge"
              ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              : item.icon === "currency-rupee"
              ? "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              : item.icon === "shield-check"
              ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          }`}
        />
      </svg>
      <div className="flex flex-col">
        <p className="text-sm opacity-80">{item.label}</p>
        <p className={`${item.className || ""}`}>
          {item.value}
          {item.isBalance && (
            <TfiReload
            size={22}
            
            
              onClick={getUserBalance}
              className="inline ml-2 text-white hover:text-black cursor-pointer transition-transform duration-200 hover:rotate-90 font-bold"
           
              title="Refresh Balance"
            />
          )}
        </p>
      </div>
    </div>
  ))}
</div>

                  </div>

                  <div
                    className={`p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border ${borderColor}`}
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveTab("deposit")}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center ${buttonColor} transition-colors`}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Deposit Funds
                      </button>
                      <button
                        onClick={() => setActiveTab("withdraw")}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center ${buttonColor} transition-colors`}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7l4-4m0 0l4 4m-4-4v18m-6-3h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Withdraw Funds
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "deposit" && (
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setActiveTab("profile")}
                  className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl font-bold">Deposit Funds</h2>
              </div>
              <DepositForm  theme={theme} />
            </div>
          )}

          {activeTab === "withdraw" && (
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setActiveTab("profile")}
                  className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl font-bold">Withdraw Funds</h2>
              </div>
              <WithdrawForm
                currentBalance={user.balance || 0}
                onWithdraw={handleWithdraw}
             isGreenTheme={isGreenTheme}
              />
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
