

// // import React, { useState, useEffect, useRef } from "react";
// // import { useTheme } from "../../../utils/ThemeContext";
// // import { io, Socket } from "socket.io-client";
// // import { WebSocket_URL } from "../../../Services/axiosInstance";
// // import { useSelector } from "react-redux";
// // import { UserData } from "../../Profile/types";
// // import { toast } from "sonner";
// // import { userService } from "../../../Services/userService";
// // import { setUser } from "../../../features/userSlice";
// // import { useDispatch } from "react-redux";
// // import Navbar from "../../Navbar";

// // interface Bet {
// //   id: number;
// //   amount: number;
// //   multiplier: number;
// //   win: number;
// //   timestamp: string;
// //   result: "win" | "lose" | "pending";
// // }

// // const WheelGame: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const userData = useSelector((state: any) => state.user);
// //   const { theme, toggleTheme } = useTheme();


// //   const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
// //   const [betAmount, setBetAmount] = useState<string>("10.00");
// //   const [userProfile, setUserProfile] = useState<UserData>(userData);
// //   const [betHistory, setBetHistory] = useState<Bet[]>([]);
// //   const [isSpinning, setIsSpinning] = useState<boolean>(false);
// //   const [currentResult, setCurrentResult] = useState<string>("");
// //   // const [isLoading, setIsLoading] = useState<boolean>(false);
// //   const [isLoading] = useState<boolean>(false);
// //   // const [user, setuser] = useState(userData)

// //   const socketRef = useRef<Socket | null>(null);
// //   const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

// //   const multipliers = [0, 1, 1.5, 2, 3, 5];
// //   const segmentAngles = [0, 60, 120, 180, 240, 300];

// //   // Initialize socket connection
// //   useEffect(() => {
// //     const socket = io(WebSocket_URL);
// //     socketRef.current = socket;

// //     // socket.on("wheelResult", (data) => {
// //     //   console.log("Received wheel result:", data);
// //     //   setIsSpinning(false);
// //     //   setSelectedMultiplier(data.multiplier);
// //     //   setCurrentResult(
// //     //     data.multiplier === 0
// //     //       ? "😢 You lost this round"
// //     //       : `🎉 You won ${data.wonAmount.toFixed(2)} ₹!`
// //     //   );
// //     //   setUserProfile((prev) => ({ ...prev, balance: data.finalBalance }));

// //     //   // Update bet history
// //     //   setBetHistory((prev) =>
// //     //     [
// //     //       {
// //     //         id: Date.now(),
// //     //         amount: data.betAmount,
// //     //         multiplier: data.multiplier,
// //     //         win: data.wonAmount,
// //     //         timestamp: new Date().toLocaleTimeString(),
// //     //         result:
// //     //           data.multiplier === 0 ? ("lose" as "lose") : ("win" as "win"),
// //     //       },
// //     //       ...prev,
// //     //     ].slice(0, 10)
// //     //   );

// //     //   if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
// //     // });

// //     socket.on("wheelResult", (data) => {
// //       // console.log("Received wheel result:", data);

// //       // Keep wheel spinning for 3.5 seconds before showing final result
// //       setTimeout(() => {
// //         setIsSpinning(false); // Stop spinning
// //         setSelectedMultiplier(data.multiplier); // Show correct multiplier at the end

// //         setCurrentResult(
// //           data.multiplier === 0
// //             ? "😢 You lost this round"
// //             : `🎉 You won ${data.wonAmount.toFixed(2)} ₹!`
// //         );

// //        if(data.multiplier!==0){
// //          setUserProfile((prev: any) => {
// //             const newBalance = prev.balance + data.wonAmount;

// //             const updatedUser = {
// //               ...prev,
// //               balance: newBalance,
// //             };

// //             // Update Redux store too
// //             dispatch(setUser(updatedUser));

// //             return updatedUser;
// //           });
// //        }

// //         // Update bet history
// //         setBetHistory((prev) =>
// //           [
// //             {
// //               id: Date.now(),
// //               amount: data.amount,
// //               multiplier: data.multiplier,
// //               win: data.wonAmount,
// //               timestamp: new Date().toLocaleTimeString(),
// //               result:
// //                 data.multiplier === 0 ? ("lose" as const) : ("win" as const),
// //             },
// //             ...prev,
// //           ].slice(0, 10)
// //         );

// //         if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
// //       }, 3500); // ⏳ Delay result by 3.5 seconds
// //     });

// //     socket.on("wheelError", (error) => {
// //       setIsSpinning(false);
// //       setCurrentResult(error.message);
// //       if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
// //     });

// //     return () => {
// //       socket.disconnect();
// //       if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
// //     };
// //   }, []);

// //   const getMultiplierColor = (multiplier: number): string => {
// //     if (multiplier === 0)
// //       return theme === "green" ? "bg-gray-400" : "bg-gray-700";
// //     if (multiplier === 1)
// //       return theme === "green" ? "bg-green-500" : "bg-green-700";
// //     if (multiplier === 1.5)
// //       return theme === "green" ? "bg-blue-500" : "bg-blue-700";
// //     if (multiplier === 2)
// //       return theme === "green" ? "bg-purple-500" : "bg-purple-700";
// //     if (multiplier === 3)
// //       return theme === "green" ? "bg-yellow-500" : "bg-yellow-700";
// //     if (multiplier === 5)
// //       return theme === "green" ? "bg-red-500" : "bg-red-700";
// //     return theme === "green" ? "bg-gray-400" : "bg-gray-700";
// //   };

// //   const getMultiplierName = (multiplier: number): string => {
// //     if (multiplier === 0) return "Lose";
// //     return `${multiplier}x`;
// //   };

// //   const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const value = e.target.value;
// //     if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
// //       setBetAmount(value);
// //     }
// //   };

// //   const getUserBalance = async () => {
// //     try {
// //       if (!userProfile?.token) return toast.error("Token not found");

// //       const res = await userService.getUserBalance(userProfile.token);
// //       if (res?.success) {
// //         setUserProfile((prev: any) => ({ ...prev, balance: res.data.balance }));
// //         dispatch(
// //           setUser({
// //             ...userProfile,
// //             balance: res.data.balance,
// //             token: userProfile.token || "",
// //           })
// //         );
// //       } else toast.error(res?.message || "Failed to fetch balance");
// //     } catch (error) {
// //       console.error("Balance error:", error);
// //       toast.error("Error fetching balance");
// //     }
// //   };

// //   const simulateSpin = () => {
// //     let iterations = 0;
// //     const totalIterations = 30 + Math.floor(Math.random() * 20);

// //     if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

// //     spinIntervalRef.current = setInterval(() => {
// //       iterations++;
// //       const randomIndex = Math.floor(Math.random() * multipliers.length);
// //       setSelectedMultiplier(multipliers[randomIndex]); // random spin visual

// //       if (iterations >= totalIterations) {
// //         clearInterval(spinIntervalRef.current!);
// //       }
// //     }, 100);
// //   };

// //   const placeBet = async () => {
// //     const amount = parseFloat(betAmount);
// //     if (amount <= 0 || amount > userProfile.balance || isSpinning) return;


// //       setUserProfile((prev: any) => ({
// //       ...prev,
// //       balance: prev.balance - amount,
// //     }));

// //     setIsSpinning(true);
// //     setCurrentResult("Spinning...");


// //     // Start visual spin
// //     simulateSpin();

// //     // Emit spin event to server
// //     socketRef.current?.emit("spinWheel", {
// //       userId: userProfile._id, // Replace with actual user ID
// //       amount: amount,
// //     });
// //   };

// //   const bgColor = theme === "green" ? "bg-green-100" : "bg-gray-900";
// //   const textColor = theme === "green" ? "text-green-900" : "text-white";
// //   const cardBg = theme === "green" ? "bg-white" : "bg-gray-800";
// //   const inputBg = theme === "green" ? "bg-green-50" : "bg-gray-700";
// //   const buttonBg =
// //     theme === "green"
// //       ? "bg-green-600 hover:bg-green-500"
// //       : "bg-blue-600 hover:bg-blue-500";

// //   return (
// //     <>
    
// //     <Navbar/>
    
// //     <div className={`min-h-screen ${bgColor} ${textColor} p-4 md:p-8 pt-16`}>
// //       <div className="max-w-md mx-auto">
// //         {/* Header with user profile and balance */}
// //         <div className="flex justify-between items-center mb-6">
// //           <div className="flex items-center space-x-3">
// //             {userProfile.profilePic && (
// //               <img
// //                 src={userProfile.profilePic}
// //                 alt="Profile"
// //                 className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
// //               />
// //             )}
// //             <div>
// //               <h1 className="text-lg font-bold">{userProfile.username}</h1>
// //               <button
// //                 onClick={toggleTheme}
// //                 className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-800"
// //               >
// //                 {theme === "green" ? "Dark Mode" : "Light Mode"}
// //               </button>
// //             </div>
// //           </div>

// //           <div className={`${cardBg} px-4 py-2 rounded-lg shadow`}>
// //             <div className="flex items-center">
// //               <p className="text-sm">Balance:</p>
// //               <button
// //                 onClick={getUserBalance}
// //                 disabled={isLoading}
// //                 className="ml-2 text-sm"
// //               >
// //                 {isLoading ? "..." : "🔄"}
// //               </button>
// //             </div>
// //             <p className="font-bold text-lg">
// //               {userProfile.balance.toFixed(2)} ₹
// //             </p>
// //           </div>
// //         </div>

// //         {/* Wheel */}
// //         <div className="relative w-full aspect-square max-w-xs mx-auto mb-8">
// //           <div
// //             className={`absolute inset-0 rounded-full border-4 ${
// //               theme === "green" ? "border-green-300" : "border-gray-700"
// //             }`}
// //           ></div>
// //           {multipliers.map((multiplier, index) => {
// //             const angle = segmentAngles[index];
// //             const radius = 45;
// //             const x = radius * Math.cos((angle * Math.PI) / 180);
// //             const y = radius * Math.sin((angle * Math.PI) / 180);

// //             return (
// //               <div
// //                 key={multiplier}
// //                 className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all ${getMultiplierColor(
// //                   multiplier
// //                 )} ${
// //                   selectedMultiplier === multiplier
// //                     ? "ring-4 ring-yellow-400 scale-110"
// //                     : ""
// //                 } ${isSpinning ? "opacity-90" : ""}`}
// //                 style={{
// //                   left: `calc(50% + ${x}%)`,
// //                   top: `calc(50% + ${y}%)`,
// //                 }}
// //               >
// //                 <span className="text-xs md:text-sm">
// //                   {getMultiplierName(multiplier)}
// //                 </span>
// //               </div>
// //             );
// //           })}
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             <div
// //               className={`w-16 h-16 md:w-20 md:h-20 ${cardBg} rounded-full flex flex-col items-center justify-center border-2 ${
// //                 theme === "green" ? "border-green-300" : "border-gray-600"
// //               }`}
// //             >
// //               <span className="text-xs">Selected</span>
// //               <span className="text-lg md:text-xl font-bold">
// //                 {selectedMultiplier === 0
// //                   ? "Lose"
// //                   : `${selectedMultiplier.toFixed(1)}x`}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {currentResult && (
// //           <div
// //             className={`mb-4 p-3 rounded-lg text-center font-bold ${
// //               currentResult.includes("won")
// //                 ? theme === "green"
// //                   ? "bg-green-200 text-green-800"
// //                   : "bg-green-900 text-green-300"
// //                 : currentResult.includes("lost")
// //                 ? theme === "green"
// //                   ? "bg-red-200 text-red-800"
// //                   : "bg-red-900 text-red-300"
// //                 : cardBg
// //             }`}
// //           >
// //             {currentResult}
// //           </div>
// //         )}

// //         {/* Multiplier Legend */}
// //         <div className={`mb-6 ${cardBg} p-3 rounded-lg shadow`}>
// //           <h2 className="text-lg font-bold mb-2 text-center">Multipliers</h2>
// //           <div className="grid grid-cols-3 gap-2">
// //             {multipliers.map((multiplier) => (
// //               <div
// //                 key={multiplier}
// //                 className={`flex items-center justify-center p-2 rounded ${getMultiplierColor(
// //                   multiplier
// //                 )}`}
// //               >
// //                 <span className="font-bold text-white">
// //                   {getMultiplierName(multiplier)}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className={`${cardBg} p-4 rounded-lg mb-6 shadow`}>
// //           <div className="mb-4">
// //             <label className="block text-sm mb-1">Bet Amount (₹)</label>
// //             <div className="flex">
// //               <input
// //                 type="text"
// //                 value={betAmount}
// //                 onChange={handleBetAmountChange}
// //                 disabled={isSpinning}
// //                 className={`flex-1 ${inputBg} ${textColor} p-3 rounded-l-lg focus:outline-none focus:ring-2 ${
// //                   theme === "green"
// //                     ? "focus:ring-green-500"
// //                     : "focus:ring-blue-500"
// //                 } disabled:opacity-50`}
// //                 placeholder="0.00"
// //               />
// //               <button
// //                 onClick={() => setBetAmount(userProfile.balance.toFixed(2))}
// //                 disabled={isSpinning}
// //                 className={`${
// //                   theme === "green"
// //                     ? "bg-green-500 hover:bg-green-400"
// //                     : "bg-gray-600 hover:bg-gray-500"
// //                 } px-3 rounded-r-lg text-sm text-white disabled:opacity-50`}
// //               >
// //                 Max
// //               </button>
// //             </div>
// //           </div>

// //           <button
// //             onClick={placeBet}
// //             disabled={
// //               isSpinning ||
// //               parseFloat(betAmount) <= 0 ||
// //               parseFloat(betAmount) > userProfile.balance
// //             }
// //             className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
// //               isSpinning
// //                 ? "bg-gray-600 cursor-not-allowed"
// //                 : `${buttonBg} text-white`
// //             }`}
// //           >
// //             {isSpinning ? "Spinning..." : "Place Bet"}
// //           </button>
// //         </div>

// //         {/* Bet History */}
// //         {betHistory.length > 0 && (
// //           <div className={`${cardBg} p-4 rounded-lg shadow`}>
// //             <h2 className="text-lg font-bold mb-2">Recent Bets</h2>
// //             <ul className="space-y-2 text-sm">
// //               {betHistory.map((bet) => (
// //                 <li key={bet.id} className="flex justify-between">
// //                   <span>
// //                     {bet.timestamp} - {bet.amount.toFixed(2)} @ {bet.multiplier}
// //                     x
// //                   </span>
// //                   <span
// //                     className={`font-bold ${
// //                       bet.result === "win"
// //                         ? theme === "green"
// //                           ? "text-green-600"
// //                           : "text-green-400"
// //                         : bet.result === "lose"
// //                         ? theme === "green"
// //                           ? "text-red-600"
// //                           : "text-red-400"
// //                         : theme === "green"
// //                         ? "text-gray-600"
// //                         : "text-gray-400"
// //                     }`}
// //                   >
// //                     {bet.result === "win" ? "+" : "-"}
// //                     {bet.win.toFixed(2)}
// //                   </span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>

// //     </>
// //   );
// // };

// // export default WheelGame;



// import React, { useState, useEffect, useRef } from "react";
// import { useTheme } from "../../../utils/ThemeContext";
// import { io, Socket } from "socket.io-client";
// import { WebSocket_URL } from "../../../Services/axiosInstance";
// import { useSelector } from "react-redux";
// import { UserData } from "../../Profile/types";
// import { toast } from "sonner";
// import { userService } from "../../../Services/userService";
// import { setUser } from "../../../features/userSlice";
// import { useDispatch } from "react-redux";
// import Navbar from "../../Navbar";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCoins, FaHistory, FaRedo, FaMoon, FaSun } from "react-icons/fa";
// import { GiCash, GiMoneyStack, GiTwoCoins } from "react-icons/gi";
// import { RiExchangeFill } from "react-icons/ri";

// interface Bet {
//   id: number;
//   amount: number;
//   multiplier: number;
//   win: number;
//   timestamp: string;
//   result: "win" | "lose" | "pending";
// }

// const WheelGame: React.FC = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector((state: any) => state.user);
//   const { theme, toggleTheme } = useTheme();

//   const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1);
//   const [betAmount, setBetAmount] = useState<string>("10.00");
//   const [userProfile, setUserProfile] = useState<UserData>(userData);
//   const [betHistory, setBetHistory] = useState<Bet[]>([]);
//   const [isSpinning, setIsSpinning] = useState<boolean>(false);
//   const [currentResult, setCurrentResult] = useState<string>("");
//   const [isLoading] = useState<boolean>(false);
//   const [showHistory, setShowHistory] = useState<boolean>(false);
//   const [rotation, setRotation] = useState<number>(0);

//   const socketRef = useRef<Socket | null>(null);
//   const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const wheelRef = useRef<HTMLDivElement>(null);

//   const multipliers = [0, 1, 1.5, 2, 3, 5];
//   const segmentColors = [
//     "#EF4444", // Red for 0
//     "#10B981", // Green for 1
//     "#3B82F6", // Blue for 1.5
//     "#8B5CF6", // Purple for 2
//     "#F59E0B", // Yellow for 3
//     "#EC4899", // Pink for 5
//   ];

//   // Initialize socket connection
//   useEffect(() => {
//     const socket = io(WebSocket_URL);
//     socketRef.current = socket;

//     socket.on("wheelResult", (data) => {
//       setTimeout(() => {
//         setIsSpinning(false);
//         setSelectedMultiplier(data.multiplier);

//         setCurrentResult(
//           data.multiplier === 0
//             ? "😢 You lost this round"
//             : `🎉 You won ${data.wonAmount.toFixed(2)} ₹!`
//         );

//         if (data.multiplier !== 0) {
//           setUserProfile((prev: any) => {
//             const newBalance = prev.balance + data.wonAmount;
//             const updatedUser = {
//               ...prev,
//               balance: newBalance,
//             };
//             dispatch(setUser(updatedUser));
//             return updatedUser;
//           });
//         }

//         setBetHistory((prev):any =>
//           [
//             {
//               id: Date.now(),
//               amount: data.amount,
//               multiplier: data.multiplier,
//               win: data.wonAmount,
//               timestamp: new Date().toLocaleTimeString(),
//               result: data.multiplier === 0 ? "lose" : "win",
//             },
//             ...prev,
//           ].slice(0, 10)
//         );

//         if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
//       }, 3500);
//     });

//     socket.on("wheelError", (error) => {
//       setIsSpinning(false);
//       setCurrentResult(error.message);
//       if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
//     });

//     return () => {
//       socket.disconnect();
//       if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
//     };
//   }, [dispatch]);

//   const getUserBalance = async () => {
//     try {
//       if (!userProfile?.token) return toast.error("Token not found");

//       const res = await userService.getUserBalance(userProfile.token);
//       if (res?.success) {
//         setUserProfile((prev: any) => ({ ...prev, balance: res.data.balance }));
//         dispatch(
//           setUser({
//             ...userProfile,
//             balance: res.data.balance,
//             token: userProfile.token || "",
//           })
//         );
//         toast.success("Balance updated successfully");
//       } else toast.error(res?.message || "Failed to fetch balance");
//     } catch (error) {
//       console.error("Balance error:", error);
//       toast.error("Error fetching balance");
//     }
//   };

//   const simulateSpin = () => {
//     // let iterations = 0;
//     // const totalIterations = 30 + Math.floor(Math.random() * 20);
//     const spinDuration = 3000; // 3 seconds

//     if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

//     const startTime = Date.now();
    
//     const spin = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / spinDuration, 1);
      
//       if (progress >= 1) {
//         clearInterval(spinIntervalRef.current!);
//         return;
//       }

//       // Ease-out function for smooth deceleration
//       const easedProgress = 1 - Math.pow(1 - progress, 3);
//       const rotation = easedProgress * 360 * 5; // 5 full rotations
      
//       setRotation(rotation);
      
//       const segmentAngle = 360 / multipliers.length;
//       const normalizedRotation = rotation % 360;
//       const currentSegment = Math.floor(normalizedRotation / segmentAngle);
//       const currentMultiplier = multipliers[(multipliers.length - currentSegment) % multipliers.length];
      
//       setSelectedMultiplier(currentMultiplier);
//     };

//     spinIntervalRef.current = setInterval(spin, 16); // ~60fps
//   };

//   const placeBet = async () => {
//     const amount = parseFloat(betAmount);
//     if (amount <= 0 || amount > userProfile.balance || isSpinning) {
//       toast.error(
//         amount > userProfile.balance 
//           ? "Insufficient balance" 
//           : "Invalid bet amount"
//       );
//       return;
//     }

//     setUserProfile((prev: any) => ({
//       ...prev,
//       balance: prev.balance - amount,
//     }));

//     setIsSpinning(true);
//     setCurrentResult("Spinning...");
//     setRotation(0);

//     // Start visual spin
//     simulateSpin();

//     // Emit spin event to server
//     socketRef.current?.emit("spinWheel", {
//       userId: userProfile._id,
//       amount: amount,
//     });
//   };

//   const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
//       setBetAmount(value);
//     }
//   };

//   const quickSelectAmount = (amount: number) => {
//     setBetAmount(amount.toFixed(2));
//   };

//   // Calculate segment angles for the wheel
//   const segmentAngles: number[] = [];
//   const segmentCount = multipliers.length;
//   const anglePerSegment = 360 / segmentCount;
//   for (let i = 0; i < segmentCount; i++) {
//     segmentAngles.push(i * anglePerSegment);
//   }

//   // Theme colors
//   const bgColor = theme === "green" ? "bg-green-50" : "bg-gray-900";
//   const textColor = theme === "green" ? "text-gray-800" : "text-gray-100";
//   const cardBg = theme === "green" ? "bg-white" : "bg-gray-800";
//   const inputBg = theme === "green" ? "bg-green-50" : "bg-gray-700";
//   const buttonBg =
//     theme === "green"
//       ? "bg-green-600 hover:bg-green-500"
//       : "bg-blue-600 hover:bg-blue-500";
//   const secondaryButtonBg =
//     theme === "green"
//       ? "bg-green-100 hover:bg-green-200 text-green-800"
//       : "bg-gray-700 hover:bg-gray-600 text-gray-100";

//   return (
//     <>
//       <Navbar />
      
//       <div className={`min-h-screen ${bgColor} ${textColor} p-4 md:p-8 pt-16`}>
//         <div className="max-w-4xl mx-auto">
//           {/* Header with user profile and balance */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//             <div className="flex items-center space-x-4">
//               {userProfile.profilePic && (
//                 <motion.div whileHover={{ scale: 1.05 }}>
//                   <img
//                     src={userProfile.profilePic}
//                     alt="Profile"
//                     className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-md"
//                   />
//                 </motion.div>
//               )}
//               <div>
//                 <h1 className="text-xl font-bold">{userProfile.username}</h1>
//                 <motion.button
//                   onClick={toggleTheme}
//                   whileTap={{ scale: 0.95 }}
//                   className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full ${secondaryButtonBg} transition-colors`}
//                 >
//                   {theme === "green" ? (
//                     <>
//                       <FaMoon /> Dark
//                     </>
//                   ) : (
//                     <>
//                       <FaSun /> Light
//                     </>
//                   )}
//                 </motion.button>
//               </div>
//             </div>

//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className={`${cardBg} px-6 py-3 rounded-xl shadow-lg flex items-center gap-4`}
//             >
//               <div className="flex flex-col">
//                 <div className="flex items-center gap-2 text-sm">
//                   <span>Balance:</span>
//                   <motion.button
//                     onClick={getUserBalance}
//                     disabled={isLoading}
//                     whileTap={{ rotate: 180 }}
//                     className="text-sm"
//                   >
//                     <FaRedo className={isLoading ? "animate-spin" : ""} />
//                   </motion.button>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <GiMoneyStack className="text-yellow-500" />
//                   <p className="font-bold text-xl">
//                     {userProfile.balance.toFixed(2)} ₹
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left column - Wheel */}
//             <div className="lg:col-span-2">
//               <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
//                 {/* Wheel container with rotation */}
//                 <motion.div
//                   ref={wheelRef}
//                   animate={{ rotate: rotation }}
//                   transition={{ type: "spring", damping: 20 }}
//                   className="relative w-full h-full rounded-full border-8 border-gray-300 shadow-xl overflow-hidden"
//                   style={{
//                     background: `conic-gradient(
//                       ${segmentColors.map((color, i) => 
//                         `${color} ${segmentAngles[i]}deg ${segmentAngles[i] + anglePerSegment}deg`
//                       ).join(", ")}
//                     )`,
//                   }}
//                 >
//                   {/* Wheel center */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className={`w-24 h-24 ${cardBg} rounded-full flex flex-col items-center justify-center border-4 border-yellow-400 shadow-lg`}>
//                       <span className="text-xs opacity-80">Selected</span>
//                       <span className="text-2xl font-bold">
//                         {selectedMultiplier === 0
//                           ? "Lose"
//                           : `${selectedMultiplier.toFixed(1)}x`}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Wheel pointer */}
//                   <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//                     <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600"></div>
//                   </div>
//                 </motion.div>

//                 {/* Multiplier labels around the wheel */}
//                 {multipliers.map((multiplier, index) => {
//                   const angle = segmentAngles[index];
//                   const radius = 42; // Percentage of container size
//                   const x = 50 + radius * Math.cos(((angle + anglePerSegment/2) * Math.PI) / 180);
//                   const y = 50 + radius * Math.sin(((angle + anglePerSegment/2) * Math.PI) / 180);

//                   return (
//                     <div
//                       key={multiplier}
//                       className="absolute text-white font-bold text-sm md:text-base"
//                       style={{
//                         left: `${x}%`,
//                         top: `${y}%`,
//                         transform: 'translate(-50%, -50%)',
//                         textShadow: '0 1px 3px rgba(0,0,0,0.8)',
//                       }}
//                     >
//                       {multiplier === 0 ? "LOSE" : `${multiplier}x`}
//                     </div>
//                   );
//                 })}
//               </div>

//               <AnimatePresence>
//                 {currentResult && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className={`mb-6 p-4 rounded-xl text-center font-bold text-lg shadow-md ${
//                       currentResult.includes("won")
//                         ? theme === "green"
//                           ? "bg-green-100 text-green-800 border-2 border-green-300"
//                           : "bg-green-900 text-green-100 border-2 border-green-700"
//                         : currentResult.includes("lost")
//                         ? theme === "green"
//                           ? "bg-red-100 text-red-800 border-2 border-red-300"
//                           : "bg-red-900 text-red-100 border-2 border-red-700"
//                         : `${cardBg} border-2 ${theme === "green" ? "border-green-300" : "border-gray-600"}`
//                     }`}
//                   >
//                     {currentResult}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Right column - Controls */}
//             <div className="space-y-6">
//               {/* Bet Amount Controls */}
//               <motion.div 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className={`${cardBg} p-6 rounded-xl shadow-lg`}
//               >
//                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   <GiCash className="text-yellow-500" /> Bet Amount
//                 </h2>
                
//                 <div className="mb-4">
//                   <label className="block text-sm mb-2 opacity-80">Enter Amount (₹)</label>
//                   <div className="flex">
//                     <input
//                       type="text"
//                       value={betAmount}
//                       onChange={handleBetAmountChange}
//                       disabled={isSpinning}
//                       className={`flex-1 ${inputBg} ${textColor} p-4 rounded-l-xl focus:outline-none focus:ring-2 ${
//                         theme === "green"
//                           ? "focus:ring-green-500"
//                           : "focus:ring-blue-500"
//                       } disabled:opacity-50 text-lg font-medium`}
//                       placeholder="0.00"
//                     />
//                     <motion.button
//                       onClick={() => setBetAmount(userProfile.balance.toFixed(2))}
//                       disabled={isSpinning}
//                       whileTap={{ scale: 0.95 }}
//                       className={`${
//                         theme === "green"
//                           ? "bg-green-500 hover:bg-green-400"
//                           : "bg-gray-600 hover:bg-gray-500"
//                       } px-4 rounded-r-xl text-white disabled:opacity-50 flex items-center`}
//                     >
//                       MAX
//                     </motion.button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-2 mb-4">
//                   {[10, 50, 100, 200, 500, 1000].map((amount) => (
//                     <motion.button
//                       key={amount}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => quickSelectAmount(amount)}
//                       disabled={isSpinning || amount > userProfile.balance}
//                       className={`py-2 rounded-lg text-sm font-medium ${
//                         amount > userProfile.balance
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : secondaryButtonBg
//                       }`}
//                     >
//                       ₹{amount}
//                     </motion.button>
//                   ))}
//                 </div>

//                 <motion.button
//                   onClick={placeBet}
//                   disabled={
//                     isSpinning ||
//                     parseFloat(betAmount) <= 0 ||
//                     parseFloat(betAmount) > userProfile.balance
//                   }
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
//                     isSpinning
//                       ? "bg-gray-600 cursor-not-allowed"
//                       : `${buttonBg} text-white shadow-md`
//                   } flex items-center justify-center gap-2`}
//                 >
//                   {isSpinning ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Spinning...
//                     </>
//                   ) : (
//                     <>
//                       <GiTwoCoins /> Place Bet
//                     </>
//                   )}
//                 </motion.button>
//               </motion.div>

//               {/* Multiplier Legend */}
//               <motion.div 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className={`${cardBg} p-6 rounded-xl shadow-lg`}
//               >
//                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   <RiExchangeFill className="text-blue-500" /> Multipliers
//                 </h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {multipliers.map((multiplier) => (
//                     <div
//                       key={multiplier}
//                       className={`flex items-center justify-between p-3 rounded-lg`}
//                       style={{ backgroundColor: segmentColors[multipliers.indexOf(multiplier)] }}
//                     >
//                       <span className="font-bold text-white">
//                         {multiplier === 0 ? "LOSE" : `${multiplier}x`}
//                       </span>
//                       <span className="text-white text-sm opacity-90">
//                         {multiplier === 0 ? "0%" : `${Math.round((multiplier - 1) * 100)}% Profit`}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Bet History */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-8"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <FaHistory className="text-yellow-500" /> Recent Bets
//               </h2>
//               <motion.button
//                 onClick={() => setShowHistory(!showHistory)}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-4 py-2 rounded-lg ${secondaryButtonBg} flex items-center gap-2`}
//               >
//                 {showHistory ? "Hide" : "Show"} History
//               </motion.button>
//             </div>

//             <AnimatePresence>
//               {showHistory && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`${cardBg} rounded-xl shadow-lg overflow-hidden`}
//                 >
//                   {betHistory.length > 0 ? (
//                     <ul className="divide-y divide-gray-700">
//                       {betHistory.map((bet) => (
//                         <motion.li 
//                           key={bet.id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           className="p-4 flex justify-between items-center"
//                         >
//                           <div className="flex items-center gap-3">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                               bet.result === "win" 
//                                 ? "bg-green-500/20 text-green-500" 
//                                 : "bg-red-500/20 text-red-500"
//                             }`}>
//                               {bet.result === "win" ? (
//                                 <FaCoins className="text-lg" />
//                               ) : (
//                                 <span className="text-lg">✕</span>
//                               )}
//                             </div>
//                             <div>
//                               <p className="font-medium">₹{bet.amount.toFixed(2)} @ {bet.multiplier}x</p>
//                               <p className="text-sm opacity-70">{bet.timestamp}</p>
//                             </div>
//                           </div>
//                           <span
//                             className={`font-bold text-lg ${
//                               bet.result === "win"
//                                 ? "text-green-500"
//                                 : "text-red-500"
//                             }`}
//                           >
//                             {bet.result === "win" ? "+" : "-"}
//                             {bet.win.toFixed(2)} ₹
//                           </span>
//                         </motion.li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <div className="p-6 text-center opacity-70">
//                       No bets placed yet
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WheelGame;






import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../utils/ThemeContext";
import { io, Socket } from "socket.io-client";
import { WebSocket_URL } from "../../../Services/axiosInstance";
import { useSelector } from "react-redux";
import { UserData } from "../../Profile/types";
import { toast } from "sonner";
import { userService } from "../../../Services/userService";
import { setUser } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoins, FaHistory, FaRedo, FaMoon, FaSun } from "react-icons/fa";
import { GiCash, GiMoneyStack, GiTwoCoins } from "react-icons/gi";
import { RiExchangeFill } from "react-icons/ri";

interface Bet {
  id: number;
  amount: number;
  multiplier: number;
  win: number;
  timestamp: string;
  result: "win" | "lose" | "pending";
}

const WheelGame: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const { theme, toggleTheme } = useTheme();

  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1);
  const [betAmount, setBetAmount] = useState<string>("10.00");
  const [userProfile, setUserProfile] = useState<UserData>(userData);
  const [betHistory, setBetHistory] = useState<Bet[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<string>("");
  const [isLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [winningSegment, setWinningSegment] = useState<number | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const multipliers = [0, 1, 1.5, 2, 3, 5];
  const segmentColors = [
    "#EF4444", // Red for 0
    "#10B981", // Green for 1
    "#3B82F6", // Blue for 1.5
    "#8B5CF6", // Purple for 2
    "#F59E0B", // Yellow for 3
    "#EC4899", // Pink for 5
  ];

  // Initialize socket connection
  useEffect(() => {
    const socket = io(WebSocket_URL);
    socketRef.current = socket;

    socket.on("wheelResult", (data) => {
      const winningIndex = multipliers.indexOf(data.multiplier);
      setWinningSegment(winningIndex);
      
      setTimeout(() => {
        setIsSpinning(false);
        setSelectedMultiplier(data.multiplier);

        setCurrentResult(
          data.multiplier === 0
            ? "😢 You lost this round"
            : `🎉 You won ${data.wonAmount.toFixed(2)} ₹!`
        );

        if (data.multiplier !== 0) {
          setUserProfile((prev: any) => {
            const newBalance = prev.balance + data.wonAmount;
            const updatedUser = {
              ...prev,
              balance: newBalance,
            };
            dispatch(setUser(updatedUser));
            return updatedUser;
          });
        }

        setBetHistory((prev):any =>
          [
            {
              id: Date.now(),
              amount: data.amount,
              multiplier: data.multiplier,
              win: data.wonAmount,
              timestamp: new Date().toLocaleTimeString(),
              result: data.multiplier === 0 ? "lose" : "win",
            },
            ...prev,
          ].slice(0, 10)
        );

        if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      }, 3500);
    });

    socket.on("wheelError", (error) => {
      setIsSpinning(false);
      setCurrentResult(error.message);
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    });

    return () => {
      socket.disconnect();
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, [dispatch]);

  const getUserBalance = async () => {
    try {
      if (!userProfile?.token) return toast.error("Token not found");

      const res = await userService.getUserBalance(userProfile.token);
      if (res?.success) {
        setUserProfile((prev: any) => ({ ...prev, balance: res.data.balance }));
        dispatch(
          setUser({
            ...userProfile,
            balance: res.data.balance,
            token: userProfile.token || "",
          })
        );
        toast.success("Balance updated successfully");
      } else toast.error(res?.message || "Failed to fetch balance");
    } catch (error) {
      console.error("Balance error:", error);
      toast.error("Error fetching balance");
    }
  };

  const simulateSpin = () => {
    const spinDuration = 3000; // 3 seconds
    const startTime = Date.now();
    
    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    setWinningSegment(null);

    const spin = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      if (progress >= 1) {
        clearInterval(spinIntervalRef.current!);
        return;
      }

      // Cubic easing function for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const rotation = easedProgress * 360 * 5; // 5 full rotations
      
      setRotation(rotation);
      
      const segmentAngle = 360 / multipliers.length;
      const normalizedRotation = rotation % 360;
      const currentSegment = Math.floor(normalizedRotation / segmentAngle);
      const currentMultiplier = multipliers[(multipliers.length - currentSegment) % multipliers.length];
      
      setSelectedMultiplier(currentMultiplier);
    };

    spinIntervalRef.current = setInterval(spin, 16); // ~60fps
  };

  const placeBet = async () => {
    const amount = parseFloat(betAmount);
    if (amount <= 0 || amount > userProfile.balance || isSpinning) {
      toast.error(
        amount > userProfile.balance 
          ? "Insufficient balance" 
          : "Invalid bet amount"
      );
      return;
    }

    setUserProfile((prev: any) => ({
      ...prev,
      balance: prev.balance - amount,
    }));

    setIsSpinning(true);
    setCurrentResult("Spinning...");
    setRotation(0);

    // Start visual spin
    simulateSpin();

    // Emit spin event to server
    socketRef.current?.emit("spinWheel", {
      userId: userProfile._id,
      amount: amount,
    });
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setBetAmount(value);
    }
  };

  const quickSelectAmount = (amount: number) => {
    setBetAmount(amount.toFixed(2));
  };

  // Calculate segment angles for the wheel
  const segmentAngles: number[] = [];
  const segmentCount = multipliers.length;
  const anglePerSegment = 360 / segmentCount;
  for (let i = 0; i < segmentCount; i++) {
    segmentAngles.push(i * anglePerSegment);
  }

  // Theme colors
  const bgColor = theme === "green" ? "bg-green-50" : "bg-gray-900";
  const textColor = theme === "green" ? "text-gray-800" : "text-gray-100";
  const cardBg = theme === "green" ? "bg-white" : "bg-gray-800";
  const inputBg = theme === "green" ? "bg-green-50" : "bg-gray-700";
  const buttonBg =
    theme === "green"
      ? "bg-green-600 hover:bg-green-500"
      : "bg-blue-600 hover:bg-blue-500";
  const secondaryButtonBg =
    theme === "green"
      ? "bg-green-100 hover:bg-green-200 text-green-800"
      : "bg-gray-700 hover:bg-gray-600 text-gray-100";

  return (
    <>
      <Navbar />
      
      <div className={`min-h-screen ${bgColor} ${textColor} p-4 md:p-8 pt-24`}>
        <div className="max-w-4xl mx-auto">
          {/* Header with user profile and balance */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              {userProfile.profilePic && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <img
                    src={userProfile.profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                  />
                </motion.div>
              )}
              <div>
                <h1 className="text-xl font-bold">{userProfile.username}</h1>
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full ${secondaryButtonBg} transition-colors`}
                >
                  {theme === "green" ? (
                    <>
                      <FaMoon /> Dark
                    </>
                  ) : (
                    <>
                      <FaSun /> Light
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`${cardBg} px-6 py-3 rounded-xl shadow-lg flex items-center gap-4`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm">
                  <span>Balance:</span>
                  <motion.button
                    onClick={getUserBalance}
                    disabled={isLoading}
                    whileTap={{ rotate: 180 }}
                    className="text-sm"
                  >
                    <FaRedo className={isLoading ? "animate-spin" : ""} />
                  </motion.button>
                </div>
                <div className="flex items-center gap-1">
                  <GiMoneyStack className="text-yellow-500" />
                  <p className="font-bold text-xl">
                    {userProfile.balance.toFixed(2)} ₹
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Wheel */}
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
                {/* Wheel outer glow effect when spinning */}
                {isSpinning && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 blur-lg animate-pulse"
                    style={{ zIndex: -1 }}
                  />
                )}

                {/* Wheel container with rotation */}
                <motion.div
                  ref={wheelRef}
                  animate={{ rotate: rotation }}
                  transition={{ type: "spring", damping: 20 }}
                  className="relative w-full h-full rounded-full border-8 border-gray-300 shadow-xl overflow-hidden"
                  style={{
                    background: `conic-gradient(
                      ${segmentColors.map((color, i) => 
                        `${color} ${segmentAngles[i]}deg ${segmentAngles[i] + anglePerSegment}deg`
                      ).join(", ")}
                    )`,
                    transformStyle: 'preserve-3d',
                    boxShadow: isSpinning ? '0 0 30px rgba(255,215,0,0.7)' : '0 10px 25px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Segment dividers */}
                  {segmentAngles.map((angle, index) => (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-50%)`,
                      }}
                    >
                      <div className="w-full h-full bg-white opacity-20"></div>
                    </div>
                  ))}

                  {/* Wheel center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-24 h-24 ${cardBg} rounded-full flex flex-col items-center justify-center border-4 border-yellow-400 shadow-lg`}>
                      <span className="text-xs opacity-80">Selected</span>
                      <span className="text-2xl font-bold">
                        {selectedMultiplier === 0
                          ? "Lose"
                          : `${selectedMultiplier.toFixed(1)}x`}
                      </span>
                    </div>
                  </div>

                  {/* Highlight winning segment */}
                  {winningSegment !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0"
                      style={{
                        background: `conic-gradient(
                          transparent ${segmentAngles[winningSegment]}deg ${segmentAngles[winningSegment] + anglePerSegment}deg,
                          rgba(255,255,255,0.3) ${segmentAngles[winningSegment]}deg ${segmentAngles[winningSegment] + anglePerSegment}deg
                        )`,
                      }}
                    />
                  )}
                </motion.div>

                {/* Wheel pointer with animation */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    animate={isSpinning ? { 
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.5,
                      repeat: isSpinning ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="w-0 h-0 border-l-12 border-r-12 border-b-20 border-l-transparent border-r-transparent border-b-red-600"></div>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-300 rounded-full"></div>
                  </motion.div>
                </div>

                {/* Multiplier labels around the wheel */}
                {multipliers.map((multiplier, index) => {
                  const angle = segmentAngles[index];
                  const radius = 42; // Percentage of container size
                  const x = 50 + radius * Math.cos(((angle + anglePerSegment/2) * Math.PI) / 180);
                  const y = 50 + radius * Math.sin(((angle + anglePerSegment/2) * Math.PI) / 180);

                  return (
                    <motion.div
                      key={multiplier}
                      className="absolute text-white font-bold text-sm md:text-base"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                      }}
                      animate={winningSegment === index ? {
                        scale: [1, 1.2, 1],
                        textShadow: ['0 1px 3px rgba(0,0,0,0.8)', '0 0 10px rgba(255,255,255,0.9)', '0 1px 3px rgba(0,0,0,0.8)']
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {multiplier === 0 ? "LOSE" : `${multiplier}x`}
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {currentResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-6 p-4 rounded-xl text-center font-bold text-lg shadow-md ${
                      currentResult.includes("won")
                        ? theme === "green"
                          ? "bg-green-100 text-green-800 border-2 border-green-300"
                          : "bg-green-900 text-green-100 border-2 border-green-700"
                        : currentResult.includes("lost")
                        ? theme === "green"
                          ? "bg-red-100 text-red-800 border-2 border-red-300"
                          : "bg-red-900 text-red-100 border-2 border-red-700"
                        : `${cardBg} border-2 ${theme === "green" ? "border-green-300" : "border-gray-600"}`
                    }`}
                  >
                    {currentResult}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right column - Controls */}
            <div className="space-y-6">
              {/* Bet Amount Controls */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`${cardBg} p-6 rounded-xl shadow-lg`}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <GiCash className="text-yellow-500" /> Bet Amount
                </h2>
                
                <div className="mb-4">
                  <label className="block text-sm mb-2 opacity-80">Enter Amount (₹)</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={betAmount}
                      onChange={handleBetAmountChange}
                      disabled={isSpinning}
                      className={`flex-1 ${inputBg} ${textColor} p-4 rounded-l-xl focus:outline-none focus:ring-2 ${
                        theme === "green"
                          ? "focus:ring-green-500"
                          : "focus:ring-blue-500"
                      } disabled:opacity-50 text-lg font-medium`}
                      placeholder="0.00"
                    />
                    <motion.button
                      onClick={() => setBetAmount(userProfile.balance.toFixed(2))}
                      disabled={isSpinning}
                      whileTap={{ scale: 0.95 }}
                      className={`${
                        theme === "green"
                          ? "bg-green-500 hover:bg-green-400"
                          : "bg-gray-600 hover:bg-gray-500"
                      } px-4 rounded-r-xl text-white disabled:opacity-50 flex items-center`}
                    >
                      MAX
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[10, 50, 100, 200, 500, 1000].map((amount) => (
                    <motion.button
                      key={amount}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => quickSelectAmount(amount)}
                      disabled={isSpinning || amount > userProfile.balance}
                      className={`py-2 rounded-lg text-sm font-medium ${
                        amount > userProfile.balance
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : secondaryButtonBg
                      }`}
                    >
                      ₹{amount}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={placeBet}
                  disabled={
                    isSpinning ||
                    parseFloat(betAmount) <= 0 ||
                    parseFloat(betAmount) > userProfile.balance
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    isSpinning
                      ? "bg-gray-600 cursor-not-allowed"
                      : `${buttonBg} text-white shadow-md`
                  } flex items-center justify-center gap-2`}
                >
                  {isSpinning ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Spinning...
                    </>
                  ) : (
                    <>
                      <GiTwoCoins /> Place Bet
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Multiplier Legend */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`${cardBg} p-6 rounded-xl shadow-lg`}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <RiExchangeFill className="text-blue-500" /> Multipliers
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {multipliers.map((multiplier) => (
                    <div
                      key={multiplier}
                      className={`flex items-center justify-between p-3 rounded-lg transition-transform ${
                        winningSegment === multipliers.indexOf(multiplier) 
                          ? 'scale-105 shadow-lg' 
                          : ''
                      }`}
                      style={{ backgroundColor: segmentColors[multipliers.indexOf(multiplier)] }}
                    >
                      <span className="font-bold text-white">
                        {multiplier === 0 ? "LOSE" : `${multiplier}x`}
                      </span>
                      <span className="text-white text-sm opacity-90">
                        {multiplier === 0 ? "0%" : `${Math.round((multiplier - 1) * 100)}% Profit`}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bet History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaHistory className="text-yellow-500" /> Recent Bets
              </h2>
              <motion.button
                onClick={() => setShowHistory(!showHistory)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg ${secondaryButtonBg} flex items-center gap-2`}
              >
                {showHistory ? "Hide" : "Show"} History
              </motion.button>
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${cardBg} rounded-xl shadow-lg overflow-hidden`}
                >
                  {betHistory.length > 0 ? (
                    <ul className="divide-y divide-gray-700">
                      {betHistory.map((bet) => (
                        <motion.li 
                          key={bet.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              bet.result === "win" 
                                ? "bg-green-500/20 text-green-500" 
                                : "bg-red-500/20 text-red-500"
                            }`}>
                              {bet.result === "win" ? (
                                <FaCoins className="text-lg" />
                              ) : (
                                <span className="text-lg">✕</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">₹{bet.amount.toFixed(2)} @ {bet.multiplier}x</p>
                              <p className="text-sm opacity-70">{bet.timestamp}</p>
                            </div>
                          </div>
                          <span
                            className={`font-bold text-lg ${
                              bet.result === "win"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {bet.result === "win" ? "+" : "-"}
                            {bet.win.toFixed(2)} ₹
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center opacity-70">
                      No bets placed yet
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WheelGame;