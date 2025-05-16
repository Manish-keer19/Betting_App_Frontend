// // // import React, { useState } from "react";

// // // interface Bet {
// // //   id: number;
// // //   amount: number;
// // //   multiplier: number;
// // //   win: number;
// // //   timestamp: string;
// // //   result: "win" | "lose" | "pending";
// // // }

// // // const WheelGame: React.FC = () => {
// // //   const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
// // //   const [betAmount, setBetAmount] = useState<string>("0.00");
// // //   const [userBalance, setUserBalance] = useState<number>(100.0);
// // //   const [betHistory, setBetHistory] = useState<Bet[]>([]);
// // //   const [isSpinning, setIsSpinning] = useState<boolean>(false);
// // //   const [currentResult, setCurrentResult] = useState<string>("");

// // //   const multipliers = [0, 1, 1.5, 2, 3, 4];
// // //   // const quickBetOptions = ["1/2", "2x", "25%", "Max"];

// // //   const getMultiplierColor = (multiplier: number): string => {
// // //     if (multiplier === 0) return "bg-gray-400";
// // //     if (multiplier === 1) return "bg-green-500";
// // //     if (multiplier === 1.5) return "bg-blue-500";
// // //     if (multiplier === 2) return "bg-purple-500";
// // //     if (multiplier === 3) return "bg-yellow-500";
// // //     if (multiplier === 4) return "bg-red-500";
// // //     return "bg-gray-400";
// // //   };

// // //   const getMultiplierName = (multiplier: number): string => {
// // //     if (multiplier === 0) return "Lose";
// // //     return `${multiplier}x`;
// // //   };

// // //   const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const value = e.target.value;
// // //     if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
// // //       setBetAmount(value);
// // //     }
// // //   };

// // //   // const applyQuickBet = (option: string) => {
// // //   //   let newAmount = parseFloat(betAmount) || 0;
// // //   //   switch (option) {
// // //   //     case "1/2":
// // //   //       newAmount /= 2;
// // //   //       break;
// // //   //     case "2x":
// // //   //       newAmount *= 2;
// // //   //       break;
// // //   //     case "25%":
// // //   //       newAmount = userBalance * 0.25;
// // //   //       break;
// // //   //     case "Max":
// // //   //       newAmount = userBalance;
// // //   //       break;
// // //   //   }
// // //   //   setBetAmount(Math.min(newAmount, userBalance).toFixed(2));
// // //   // };

// // //   const calculateWin = (amount: number, multiplier: number): number => {
// // //     return amount * multiplier;
// // //   };

// // //   const simulateSpin = (): Promise<boolean> => {
// // //     return new Promise((resolve) => {
// // //       const spinDuration = 2000 + Math.random() * 1000;
// // //       const spinInterval = 100;
// // //       let elapsed = 0;

// // //       const spin = setInterval(() => {
// // //         elapsed += spinInterval;
// // //         const randomIndex = Math.floor(Math.random() * multipliers.length);
// // //         setSelectedMultiplier(multipliers[randomIndex]);

// // //         if (elapsed >= spinDuration) {
// // //           clearInterval(spin);
// // //           resolve(true);
// // //         }
// // //       }, spinInterval);
// // //     });
// // //   };

// // //   const placeBet = async () => {
// // //     const amount = parseFloat(betAmount);
// // //     if (
// // //       amount <= 0 ||
// // //       // selectedMultiplier <= 0 ||
// // //       amount > userBalance ||
// // //       isSpinning
// // //     )
// // //       return;

// // //     setIsSpinning(true);
// // //     setCurrentResult("Spinning...");

// // //     setUserBalance((prev) => prev - amount);

// // //     const newBet: Bet = {
// // //       id: Date.now(),
// // //       amount,
// // //       multiplier: selectedMultiplier,
// // //       win: 0,
// // //       timestamp: new Date().toLocaleTimeString(),
// // //       result: "pending",
// // //     };

// // //     setBetHistory((prev) => [newBet, ...prev].slice(0, 10));

// // //     await simulateSpin();

// // //     const didWin = selectedMultiplier !== 0;
// // //     const winAmount = didWin ? calculateWin(amount, selectedMultiplier) : 0;

// // //     setUserBalance((prev) => prev + winAmount);

// // //     setBetHistory((prev) => {
// // //       const updated = [...prev];
// // //       updated[0] = {
// // //         ...updated[0],
// // //         win: winAmount,
// // //         result: didWin ? "win" : "lose",
// // //       };
// // //       return updated;
// // //     });

// // //     setCurrentResult(
// // //       didWin ? `You won ${winAmount.toFixed(2)} ₹!` : "You lost this round"
// // //     );
// // //     setIsSpinning(false);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
// // //       <div className="max-w-md mx-auto">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h1 className="text-2xl font-bold text-yellow-400">Multiplier Game</h1>
// // //           <div className="bg-gray-800 px-4 py-2 rounded-lg">
// // //             <p className="text-sm text-gray-400">Balance</p>
// // //             <p className="font-bold text-lg">{userBalance.toFixed(2)} ₹</p>
// // //           </div>
// // //         </div>

// // //         {/* Wheel */}
// // //         <div className="relative w-full aspect-square max-w-xs mx-auto mb-8">
// // //           <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
// // //           {multipliers.map((multiplier, index) => {
// // //             const angle = index * (360 / multipliers.length) - 90;
// // //             const radius = 45;
// // //             const x = radius * Math.cos((angle * Math.PI) / 180);
// // //             const y = radius * Math.sin((angle * Math.PI) / 180);

// // //             return (
// // //               <button
// // //                 key={multiplier}
// // //                 disabled={isSpinning}
// // //                 className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all ${getMultiplierColor(
// // //                   multiplier
// // //                 )} ${
// // //                   selectedMultiplier === multiplier
// // //                     ? "ring-4 ring-yellow-400 scale-110"
// // //                     : ""
// // //                 } ${
// // //                   isSpinning
// // //                     ? "opacity-50 cursor-not-allowed"
// // //                     : "hover:scale-105"
// // //                 }`}
// // //                 style={{
// // //                   left: `calc(50% + ${x}%)`,
// // //                   top: `calc(50% + ${y}%)`,
// // //                 }}
// // //                 onClick={() => !isSpinning && setSelectedMultiplier(multiplier)}
// // //               >
// // //                 <span className="text-xs md:text-sm">
// // //                   {getMultiplierName(multiplier)}
// // //                 </span>
// // //               </button>
// // //             );
// // //           })}
// // //           <div className="absolute inset-0 flex items-center justify-center">
// // //             <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex flex-col items-center justify-center border-2 border-gray-600">
// // //               <span className="text-xs text-gray-400">Selected</span>
// // //               <span className="text-lg md:text-xl font-bold">
// // //                 {selectedMultiplier === 0
// // //                   ? "Lose"
// // //                   : `${selectedMultiplier.toFixed(1)}x`}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {currentResult && (
// // //           <div
// // //             className={`mb-4 p-3 rounded-lg text-center font-bold ${
// // //               currentResult.includes("won")
// // //                 ? "bg-green-900 text-green-300"
// // //                 : currentResult.includes("lost")
// // //                 ? "bg-red-900 text-red-300"
// // //                 : "bg-gray-800"
// // //             }`}
// // //           >
// // //             {currentResult}
// // //           </div>
// // //         )}

// // //          {/* Multiplier Legend */}
// // //         <div className="mb-6 bg-gray-800 p-3 rounded-lg">
// // //           <h2 className="text-lg font-bold mb-2 text-center">Multipliers</h2>
// // //           <div className="grid grid-cols-3 gap-2">
// // //             {multipliers.map((multiplier) => (
// // //               <div
// // //                 key={multiplier}
// // //                 className={`flex items-center justify-center p-2 rounded ${getMultiplierColor(
// // //                   multiplier
// // //                 )}`}
// // //               >
// // //                 <span className="font-bold">{getMultiplierName(multiplier)}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <div className="bg-gray-800 p-4 rounded-lg mb-6">
// // //           <div className="mb-4">
// // //             <label className="block text-sm text-gray-400 mb-1">
// // //               Bet Amount (₹)
// // //             </label>
// // //             <div className="flex">
// // //               <input
// // //                 type="text"
// // //                 value={betAmount}
// // //                 onChange={handleBetAmountChange}
// // //                 disabled={isSpinning}
// // //                 className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
// // //                 placeholder="0.00"
// // //               />
// // //               <button
// // //                 onClick={() => setBetAmount(userBalance.toFixed(2))}
// // //                 disabled={isSpinning}
// // //                 className="bg-gray-600 px-3 rounded-r-lg text-sm hover:bg-gray-500 disabled:opacity-50"
// // //               >
// // //                 Max
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* <div className="grid grid-cols-4 gap-2 mb-4">
// // //             {quickBetOptions.map((option) => (
// // //               <button
// // //                 key={option}
// // //                 disabled={isSpinning}
// // //                 className="bg-gray-700 p-2 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
// // //                 onClick={() => applyQuickBet(option)}
// // //               >
// // //                 {option}
// // //               </button>
// // //             ))}
// // //           </div> */}

// // //           <button
// // //             onClick={placeBet}
// // //             disabled={
// // //               isSpinning ||
// // //               parseFloat(betAmount) <= 0 ||
// // //               parseFloat(betAmount) > userBalance
// // //             }
// // //             className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
// // //               isSpinning
// // //                 ? "bg-gray-600 cursor-not-allowed"
// // //                 : "bg-green-600 hover:bg-green-500"
// // //             }`}
// // //           >
// // //             {isSpinning ? "Spinning..." : "Place Bet"}
// // //           </button>
// // //         </div>

// // //         {/* Bet History */}
// // //         {betHistory.length > 0 && (
// // //           <div className="bg-gray-800 p-4 rounded-lg">
// // //             <h2 className="text-lg font-bold mb-2">Recent Bets</h2>
// // //             <ul className="space-y-2 text-sm">
// // //               {betHistory.map((bet) => (
// // //                 <li key={bet.id} className="flex justify-between">
// // //                   <span>
// // //                     {bet.timestamp} - {bet.amount.toFixed(2)} @ {bet.multiplier}x
// // //                   </span>
// // //                   <span
// // //                     className={`font-bold ${
// // //                       bet.result === "win"
// // //                         ? "text-green-400"
// // //                         : bet.result === "lose"
// // //                         ? "text-red-400"
// // //                         : "text-gray-400"
// // //                     }`}
// // //                   >
// // //                     {bet.result === "pending"
// // //                       ? "..."
// // //                       : `${bet.result === "win" ? "+" : "-"}${bet.win.toFixed(
// // //                           2
// // //                         )}`}
// // //                   </span>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WheelGame;

// // import React, { useState, useEffect } from "react";
// // import { useTheme } from "../../utils/ThemeContext"; // Assuming you have this context

// // interface Bet {
// //   id: number;
// //   amount: number;
// //   multiplier: number;
// //   win: number;
// //   timestamp: string;
// //   result: "win" | "lose" | "pending";
// // }

// // interface UserProfile {
// //   username: string;
// //   balance: number;
// //   profilePic: string;
// // }

// // const WheelGame: React.FC = () => {
// //   const { theme, toggleTheme } = useTheme();
// //   const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
// //   const [betAmount, setBetAmount] = useState<string>("0.00");
// //   const [userProfile, setUserProfile] = useState<UserProfile>({
// //     username: "Guest",
// //     balance: 100.0,
// //     profilePic: "",
// //   });
// //   const [betHistory, setBetHistory] = useState<Bet[]>([]);
// //   const [isSpinning, setIsSpinning] = useState<boolean>(false);
// //   const [currentResult, setCurrentResult] = useState<string>("");
// //   const [isLoading, setIsLoading] = useState<boolean>(false);

// //   const multipliers = [0, 1, 1.5, 2, 3, 4];

// //   // Simulate fetching user data (replace with actual API call)
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       setIsLoading(true);
// //       try {
// //         // Replace with actual API call
// //         // const response = await fetch('/api/user');
// //         // const data = await response.json();

// //         // Mock data based on your JSON
// //         const mockUserData = {
// //           username: "DON",
// //           balance: 85595.75,
// //           profilePic:
// //             "https://res.cloudinary.com/degag862k/image/upload/v1744893491/WhatsApp_Image_2025-04-17_at_09.07.23_19048e01_fk6hmm.jpg",
// //         };

// //         setUserProfile(mockUserData);
// //       } catch (error) {
// //         console.error("Error fetching user data:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   const refreshBalance = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Simulate API call to refresh balance
// //       // const response = await fetch('/api/user/balance');
// //       // const data = await response.json();
// //       // setUserProfile(prev => ({...prev, balance: data.balance}));

// //       // Mock refresh - just use current balance
// //       setUserProfile((prev) => ({ ...prev }));
// //     } catch (error) {
// //       console.error("Error refreshing balance:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

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
// //     if (multiplier === 4)
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

// //   const calculateWin = (amount: number, multiplier: number): number => {
// //     return amount * multiplier;
// //   };

// //   // const simulateSpin = (): Promise<boolean> => {
// //   //   return new Promise((resolve) => {
// //   //     const spinDuration = 2000 + Math.random() * 1000;
// //   //     const spinInterval = 100;
// //   //     let elapsed = 0;

// //   //     const spin = setInterval(() => {
// //   //       elapsed += spinInterval;
// //   //       const randomIndex = Math.floor(Math.random() * multipliers.length);

// //   //       setSelectedMultiplier(multipliers[randomIndex]);

// //   //       if (elapsed >= spinDuration) {
// //   //         clearInterval(spin);
// //   //         resolve(true);
// //   //       }
// //   //     }, spinInterval);
// //   //   });
// //   // };

// //   const simulateSpin = (): Promise<number> => {
// //     return new Promise((resolve) => {
// //       const spinDuration = 2000 + Math.random() * 1000;
// //       const spinInterval = 100;
// //       let elapsed = 0;
// //       let finalMultiplier = 0;

// //       const spin = setInterval(() => {
// //         elapsed += spinInterval;
// //         const randomIndex = Math.floor(Math.random() * multipliers.length);
// //         finalMultiplier = multipliers[randomIndex];
// //         setSelectedMultiplier(finalMultiplier);

// //         if (elapsed >= spinDuration) {
// //           clearInterval(spin);
// //           resolve(finalMultiplier);
// //         }
// //       }, spinInterval);
// //     });
// //   };

// //   // const placeBet = async () => {
// //   //   const amount = parseFloat(betAmount);
// //   //   if (amount <= 0 || amount > userProfile.balance || isSpinning) return;

// //   //   setIsSpinning(true);
// //   //   setCurrentResult("Spinning...");

// //   //   setUserProfile((prev) => ({
// //   //     ...prev,
// //   //     balance: prev.balance - amount,
// //   //   }));

// //   //   const newBet: Bet = {
// //   //     id: Date.now(),
// //   //     amount,
// //   //     multiplier: selectedMultiplier,
// //   //     win: 0,
// //   //     timestamp: new Date().toLocaleTimeString(),
// //   //     result: "pending",
// //   //   };

// //   //   setBetHistory((prev) => [newBet, ...prev].slice(0, 10));

// //   //   await simulateSpin();

// //   //   const didWin = selectedMultiplier !== 0;
// //   //   console.log("Selected Multiplier:", selectedMultiplier);
// //   //   console.log("didWin:", didWin);
// //   //   const winAmount = didWin ? calculateWin(amount, selectedMultiplier) : 0;

// //   //   setUserProfile((prev) => ({
// //   //     ...prev,
// //   //     balance: prev.balance + winAmount,
// //   //   }));

// //   //   setBetHistory((prev) => {
// //   //     const updated = [...prev];
// //   //     updated[0] = {
// //   //       ...updated[0],
// //   //       win: winAmount,
// //   //       result: didWin ? "win" : "lose",
// //   //     };
// //   //     return updated;
// //   //   });

// //   //   setCurrentResult(
// //   //     didWin ? `You won ${winAmount.toFixed(2)} ₹!` : "You lost this round"
// //   //   );
// //   //   setIsSpinning(false);
// //   // };

// //   // Theme-specific styles
// //   const placeBet = async () => {
// //     const amount = parseFloat(betAmount);
// //     if (amount <= 0 || amount > userProfile.balance || isSpinning) return;

// //     setIsSpinning(true);
// //     setCurrentResult("Spinning...");

// //     // Deduct the bet
// //     setUserProfile((prev) => ({
// //       ...prev,
// //       balance: prev.balance - amount,
// //     }));

// //     const newBet: Bet = {
// //       id: Date.now(),
// //       amount,
// //       multiplier: 0,
// //       win: 0,
// //       timestamp: new Date().toLocaleTimeString(),
// //       result: "pending",
// //     };

// //     setBetHistory((prev) => [newBet, ...prev].slice(0, 10));

// //     const finalMultiplier = await simulateSpin(); // Get random multiplier after spin

// //     const didWin = finalMultiplier !== 0;
// //     const winAmount = didWin ? calculateWin(amount, finalMultiplier) : 0;

// //     // Update user balance if they won
// //     setUserProfile((prev) => ({
// //       ...prev,
// //       balance: prev.balance + winAmount,
// //     }));

// //     // Update bet history with result
// //     setBetHistory((prev) => {
// //       const updated = [...prev];
// //       updated[0] = {
// //         ...updated[0],
// //         multiplier: finalMultiplier,
// //         win: winAmount,
// //         result: didWin ? "win" : "lose",
// //       };
// //       return updated;
// //     });

// //     setCurrentResult(
// //       didWin
// //         ? `🎉 You won ${winAmount.toFixed(2)} ₹!`
// //         : "😢 You lost this round"
// //     );
// //     setIsSpinning(false);
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
// //     <div className={`min-h-screen ${bgColor} ${textColor} p-4 md:p-8`}>
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
// //                 onClick={refreshBalance}
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
// //             const angle = index * (360 / multipliers.length) - 90;
// //             const radius = 45;
// //             const x = radius * Math.cos((angle * Math.PI) / 180);
// //             const y = radius * Math.sin((angle * Math.PI) / 180);

// //             return (
// //               <button
// //                 key={multiplier}
// //                 disabled={isSpinning}
// //                 className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all ${getMultiplierColor(
// //                   multiplier
// //                 )} ${
// //                   selectedMultiplier === multiplier
// //                     ? "ring-4 ring-yellow-400 scale-110"
// //                     : ""
// //                 } ${
// //                   isSpinning
// //                     ? "opacity-50 cursor-not-allowed"
// //                     : "hover:scale-105"
// //                 }`}
// //                 style={{
// //                   left: `calc(50% + ${x}%)`,
// //                   top: `calc(50% + ${y}%)`,
// //                 }}
// //                 // onClick={() => !isSpinning && setSelectedMultiplier(multiplier)}
// //               >
// //                 <span className="text-xs md:text-sm">
// //                   {getMultiplierName(multiplier)}
// //                 </span>
// //               </button>
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
// //                     {bet.result === "pending"
// //                       ? "..."
// //                       : `${bet.result === "win" ? "+" : "-"}${bet.win.toFixed(
// //                           2
// //                         )}`}
// //                   </span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default WheelGame;

// import React, { useState, useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { WebSocket_URL } from '../../../Services/axiosInstance';
// import { useSelector } from 'react-redux';

// interface WheelResult {
//   userId: string;
//   betAmount: number;
//   result: string;
//   multiplier: number;
//   wonAmount: number;
//   finalBalance: number;
//   timestamp: Date;
// }

// interface BetHistoryItem {
//   id: string;
//   betAmount: number;
//   result: string;
//   multiplier: number;
//   wonAmount: number;
//   timestamp: Date;
// }

// interface User {
//   _id: string;
//   balance: number;
//   username: string;
// }

// const WheelGame: React.FC = () => {

//   const user = useSelector((state: any) => state.user);
//   // const [user, setUser] = useState<User>(userData);
//   const [betAmount, setBetAmount] = useState<string>('10');
//   const [isSpinning, setIsSpinning] = useState<boolean>(false);
//   const [result, setResult] = useState<WheelResult | null>(null);
//   const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
//   const [roomName] = useState<string>('wheel-room-1');
//   const [error, setError] = useState<string>('');
//   const [lastWinners, setLastWinners] = useState<WheelResult[]>([]);
//   const [balance, setBalance] = useState<number>(user?.balance || 0);
//   const [currentSegment, setCurrentSegment] = useState<string>('1x');

//   const socketRef = useRef<Socket | null>(null);
//   const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const spinStartTimeRef = useRef<number>(0);

//   // Wheel segments data
//   const segments = [
//     { label: '1x', color: 'bg-blue-500', textColor: 'text-white', multiplier: 1 },
//     { label: '0x', color: 'bg-red-500', textColor: 'text-white', multiplier: 0 },
//     { label: '1.5x', color: 'bg-yellow-500', textColor: 'text-black', multiplier: 1.5 },
//     { label: '1x', color: 'bg-blue-500', textColor: 'text-white', multiplier: 1 },
//     { label: '0x', color: 'bg-red-500', textColor: 'text-white', multiplier: 0 },
//     { label: '1.5x', color: 'bg-yellow-500', textColor: 'text-black', multiplier: 1.5 },
//     { label: '2x', color: 'bg-green-500', textColor: 'text-white', multiplier: 2 },
//     { label: '5x', color: 'bg-pink-500', textColor: 'text-white', multiplier: 5 },
//     { label: '2x', color: 'bg-green-500', textColor: 'text-white', multiplier: 2 },
//     { label: '3x', color: 'bg-purple-500', textColor: 'text-white', multiplier: 3 },
//   ];

//   // Initialize socket connection
//   useEffect(() => {
//     const socket = io(WebSocket_URL);
//     socketRef.current = socket;

//     // Join room when user is available
//     if (user) {
//       socket.emit('joinWheelGame', {
//         userId: user._id,
//         roomName
//       });
//     }

//     socket.on('wheelResult', (data: WheelResult) => {
//       console.log('Received wheel result:', data);
//       if (data.userId === user._id) {
//         setResult(data);
//         setBalance(data.finalBalance);
//         setIsSpinning(false);
//         stopVisualSpin(data.multiplier);

//         // Add to personal history
//         setBetHistory(prev => [{
//           id: Date.now().toString(),
//           betAmount: data.betAmount,
//           result: data.result,
//           multiplier: data.multiplier,
//           wonAmount: data.wonAmount,
//           timestamp: new Date(data.timestamp)
//         }, ...prev].slice(0, 10));
//       }

//       // Update last winners (show only other players)
//       if (data.userId !== user._id) {
//         setLastWinners(prev => [data, ...prev].slice(0, 5));
//       }
//     });

//     socket.on('wheelError', (error: { message: string }) => {
//       setError(error.message);
//       setIsSpinning(false);
//       stopVisualSpin();
//     });

//     return () => {
//       socket.disconnect();
//       if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
//     };
//   }, [user, roomName]);

//   const startVisualSpin = () => {
//     setIsSpinning(true);
//     setResult(null);
//     setError('');
//     spinStartTimeRef.current = Date.now();

//     let segmentIndex = 0;
//     const spinDuration = 3000; // 3 seconds

//     spinIntervalRef.current = setInterval(() => {
//       const elapsed = Date.now() - spinStartTimeRef.current;
//       const progress = Math.min(1, elapsed / spinDuration);

//       // Slow down as we approach the end
//       const speed = Math.max(50, 300 * (1 - progress));

//       segmentIndex = (segmentIndex + 1) % segments.length;
//       setCurrentSegment(segments[segmentIndex].label);

//       if (elapsed >= spinDuration) {
//         clearInterval(spinIntervalRef.current as NodeJS.Timeout);
//       }
//     }, 100);
//   };

//   const stopVisualSpin = (finalMultiplier?: number) => {
//     if (spinIntervalRef.current) {
//       clearInterval(spinIntervalRef.current);
//       spinIntervalRef.current = null;
//     }

//     if (finalMultiplier !== undefined) {
//       const finalSegment = segments.find(s => s.multiplier === finalMultiplier);
//       if (finalSegment) {
//         setCurrentSegment(finalSegment.label);
//       }
//     }
//   };

//   const handleSpin = () => {
//     if (!user || isSpinning) return;

//     const amount = parseFloat(betAmount);
//     if (isNaN(amount) || amount <= 0) {
//       setError('Please enter a valid bet amount');
//       return;
//     }

//     if (balance < amount) {
//       setError('Insufficient balance');
//       return;
//     }

//     startVisualSpin();

//     // Emit spin event after a short delay for visual sync
//     setTimeout(() => {
//       socketRef.current?.emit('spinWheel', {
//         userId: user._id,
//         betAmount: amount,
//         roomName
//       });
//     }, 500);
//   };

//   const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*\.?\d{0,2}$/.test(value)) {
//       setBetAmount(value);
//     }
//   };

//   const setPercentageBet = (percent: number) => {
//     if (!user) return;
//     const amount = (balance * percent / 100).toFixed(2);
//     setBetAmount(amount);
//   };

//   const getResultColor = () => {
//     if (!result) return '';
//     if (result.multiplier === 0) return 'text-red-500';
//     if (result.multiplier < 1.5) return 'text-yellow-500';
//     if (result.multiplier < 3) return 'text-green-500';
//     return 'text-purple-500';
//   };

//   const getSegmentColor = (label: string) => {
//     const segment = segments.find(s => s.label === label);
//     return segment ? segment.color : 'bg-gray-500';
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8">Wheel of Fortune</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Wheel and Controls */}
//           <div className="lg:col-span-2 flex flex-col items-center">
//             {/* Wheel Visualization */}
//             <div className="relative w-64 h-64 mb-8">
//               <div className={`absolute inset-0 rounded-full border-8 ${getSegmentColor(currentSegment)} flex items-center justify-center transition-colors duration-100`}>
//                 <div className="text-4xl font-bold">{currentSegment}</div>
//               </div>
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
//             </div>

//             {result && (
//               <div className={`text-center text-xl font-bold mb-4 ${getResultColor()}`}>
//                 {result.multiplier === 0 ? (
//                   <span>You lost ₹{result.betAmount.toFixed(2)}</span>
//                 ) : (
//                   <span>You won ₹{result.wonAmount.toFixed(2)}!</span>
//                 )}
//               </div>
//             )}

//             {error && (
//               <div className="text-red-500 text-center mb-4">{error}</div>
//             )}

//             <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-lg">
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Bet Amount (₹)</label>
//                 <div className="flex">
//                   <input
//                     type="text"
//                     value={betAmount}
//                     onChange={handleBetChange}
//                     disabled={isSpinning}
//                     className="flex-1 p-3 rounded-l-lg bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button
//                     onClick={() => setBetAmount(balance.toFixed(2))}
//                     disabled={isSpinning}
//                     className="px-4 py-3 rounded-r-lg bg-gray-600 hover:bg-gray-500 font-medium"
//                   >
//                     Max
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 gap-2 mb-6">
//                 {[10, 25, 50, 100].map((amount) => (
//                   <button
//                     key={amount}
//                     onClick={() => setBetAmount(amount.toString())}
//                     disabled={isSpinning}
//                     className="py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium"
//                   >
//                     ₹{amount}
//                   </button>
//                 ))}
//               </div>

//               <div className="grid grid-cols-3 gap-2 mb-6">
//                 {[10, 25, 50].map((percent) => (
//                   <button
//                     key={percent}
//                     onClick={() => setPercentageBet(percent)}
//                     disabled={isSpinning}
//                     className="py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium"
//                   >
//                     {percent}%
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={handleSpin}
//                 disabled={isSpinning || !user || !betAmount}
//                 className={`w-full py-4 rounded-lg font-bold text-lg ${
//                   isSpinning
//                     ? 'bg-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700 text-white'
//                 } transition-colors`}
//               >
//                 {isSpinning ? 'Spinning...' : 'SPIN WHEEL'}
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Info and History */}
//           <div className="space-y-6">
//             {/* User Balance */}
//             <div className="p-4 rounded-lg bg-gray-800 shadow">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-sm font-medium">Your Balance</h3>
//                   <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Last Winners */}
//             <div className="p-4 rounded-lg bg-gray-800 shadow">
//               <h3 className="text-lg font-bold mb-3">Recent Winners</h3>
//               {lastWinners.length > 0 ? (
//                 <div className="space-y-3">
//                   {lastWinners.map((winner, index) => (
//                     <div key={index} className="flex justify-between items-center">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
//                           {winner.userId.charAt(0).toUpperCase()}
//                         </div>
//                         <span className="font-medium">Player{winner.userId.slice(-4)}</span>
//                       </div>
//                       <span className="font-bold text-green-500">+₹{winner.wonAmount.toFixed(2)}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No winners yet</p>
//               )}
//             </div>

//             {/* Bet History */}
//             <div className="p-4 rounded-lg bg-gray-800 shadow">
//               <h3 className="text-lg font-bold mb-3">Your Recent Bets</h3>
//               {betHistory.length > 0 ? (
//                 <div className="space-y-3">
//                   {betHistory.map((bet) => (
//                     <div key={bet.id} className="flex justify-between items-center">
//                       <div>
//                         <span className="font-medium">₹{bet.betAmount.toFixed(2)}</span>
//                         <span className="mx-2">→</span>
//                         <span className={bet.multiplier === 0 ? 'text-red-500' : 'text-green-500'}>
//                           {bet.multiplier}x
//                         </span>
//                       </div>
//                       <span className={bet.multiplier === 0 ? 'text-red-500' : 'text-green-500'}>
//                         {bet.multiplier === 0 ? '-₹' : '+₹'}{bet.wonAmount.toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No bets yet</p>
//               )}
//             </div>

//             {/* Wheel Segments Info */}
//             <div className="p-4 rounded-lg bg-gray-800 shadow">
//               <h3 className="text-lg font-bold mb-3">Wheel Segments</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {[
//                   { label: '1x', color: 'bg-blue-500', prob: '40%' },
//                   { label: '0x', color: 'bg-red-500', prob: '20%' },
//                   { label: '1.5x', color: 'bg-yellow-500', prob: '20%' },
//                   { label: '2x', color: 'bg-green-500', prob: '15%' },
//                   { label: '3x', color: 'bg-purple-500', prob: '3%' },
//                   { label: '5x', color: 'bg-pink-500', prob: '2%' },
//                 ].map((segment) => (
//                   <div key={segment.label} className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full ${segment.color} mr-2`}></div>
//                     <span className="font-medium">{segment.label}</span>
//                     <span className="ml-auto text-gray-500">{segment.prob}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WheelGame;

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../utils/ThemeContext";
import { io, Socket } from "socket.io-client";
import { WebSocket_URL } from "../../../Services/axiosInstance";
import { useSelector } from "react-redux";
import { UserData } from "../../Profile/types";
import toast from "react-hot-toast";
import { userService } from "../../../Services/userService";
import { setUser } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../Navbar";

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


  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<string>("10.00");
  const [userProfile, setUserProfile] = useState<UserData>(userData);
  const [betHistory, setBetHistory] = useState<Bet[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [user, setuser] = useState(userData)

  const socketRef = useRef<Socket | null>(null);
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const multipliers = [0, 1, 1.5, 2, 3, 5];
  const segmentAngles = [0, 60, 120, 180, 240, 300];

  // Initialize socket connection
  useEffect(() => {
    const socket = io(WebSocket_URL);
    socketRef.current = socket;

    // socket.on("wheelResult", (data) => {
    //   console.log("Received wheel result:", data);
    //   setIsSpinning(false);
    //   setSelectedMultiplier(data.multiplier);
    //   setCurrentResult(
    //     data.multiplier === 0
    //       ? "😢 You lost this round"
    //       : `🎉 You won ${data.wonAmount.toFixed(2)} ₹!`
    //   );
    //   setUserProfile((prev) => ({ ...prev, balance: data.finalBalance }));

    //   // Update bet history
    //   setBetHistory((prev) =>
    //     [
    //       {
    //         id: Date.now(),
    //         amount: data.betAmount,
    //         multiplier: data.multiplier,
    //         win: data.wonAmount,
    //         timestamp: new Date().toLocaleTimeString(),
    //         result:
    //           data.multiplier === 0 ? ("lose" as "lose") : ("win" as "win"),
    //       },
    //       ...prev,
    //     ].slice(0, 10)
    //   );

    //   if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    // });

    socket.on("wheelResult", (data) => {
      // console.log("Received wheel result:", data);

      // Keep wheel spinning for 3.5 seconds before showing final result
      setTimeout(() => {
        setIsSpinning(false); // Stop spinning
        setSelectedMultiplier(data.multiplier); // Show correct multiplier at the end

        setCurrentResult(
          data.multiplier === 0
            ? "😢 You lost this round"
            : `🎉 You won ${data.wonAmount.toFixed(2)} ₹!`
        );

       if(data.multiplier!==0){
         setUserProfile((prev: any) => {
            const newBalance = prev.balance + data.wonAmount;

            const updatedUser = {
              ...prev,
              balance: newBalance,
            };

            // Update Redux store too
            dispatch(setUser(updatedUser));

            return updatedUser;
          });
       }

        // Update bet history
        setBetHistory((prev) =>
          [
            {
              id: Date.now(),
              amount: data.amount,
              multiplier: data.multiplier,
              win: data.wonAmount,
              timestamp: new Date().toLocaleTimeString(),
              result:
                data.multiplier === 0 ? ("lose" as const) : ("win" as const),
            },
            ...prev,
          ].slice(0, 10)
        );

        if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      }, 3500); // ⏳ Delay result by 3.5 seconds
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
  }, []);

  const getMultiplierColor = (multiplier: number): string => {
    if (multiplier === 0)
      return theme === "green" ? "bg-gray-400" : "bg-gray-700";
    if (multiplier === 1)
      return theme === "green" ? "bg-green-500" : "bg-green-700";
    if (multiplier === 1.5)
      return theme === "green" ? "bg-blue-500" : "bg-blue-700";
    if (multiplier === 2)
      return theme === "green" ? "bg-purple-500" : "bg-purple-700";
    if (multiplier === 3)
      return theme === "green" ? "bg-yellow-500" : "bg-yellow-700";
    if (multiplier === 5)
      return theme === "green" ? "bg-red-500" : "bg-red-700";
    return theme === "green" ? "bg-gray-400" : "bg-gray-700";
  };

  const getMultiplierName = (multiplier: number): string => {
    if (multiplier === 0) return "Lose";
    return `${multiplier}x`;
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setBetAmount(value);
    }
  };

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
      } else toast.error(res?.message || "Failed to fetch balance");
    } catch (error) {
      console.error("Balance error:", error);
      toast.error("Error fetching balance");
    }
  };

  const simulateSpin = () => {
    let iterations = 0;
    const totalIterations = 30 + Math.floor(Math.random() * 20);

    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

    spinIntervalRef.current = setInterval(() => {
      iterations++;
      const randomIndex = Math.floor(Math.random() * multipliers.length);
      setSelectedMultiplier(multipliers[randomIndex]); // random spin visual

      if (iterations >= totalIterations) {
        clearInterval(spinIntervalRef.current!);
      }
    }, 100);
  };

  const placeBet = async () => {
    const amount = parseFloat(betAmount);
    if (amount <= 0 || amount > userProfile.balance || isSpinning) return;


      setUserProfile((prev: any) => ({
      ...prev,
      balance: prev.balance - amount,
    }));

    setIsSpinning(true);
    setCurrentResult("Spinning...");


    // Start visual spin
    simulateSpin();

    // Emit spin event to server
    socketRef.current?.emit("spinWheel", {
      userId: userProfile._id, // Replace with actual user ID
      amount: amount,
    });
  };

  const bgColor = theme === "green" ? "bg-green-100" : "bg-gray-900";
  const textColor = theme === "green" ? "text-green-900" : "text-white";
  const cardBg = theme === "green" ? "bg-white" : "bg-gray-800";
  const inputBg = theme === "green" ? "bg-green-50" : "bg-gray-700";
  const buttonBg =
    theme === "green"
      ? "bg-green-600 hover:bg-green-500"
      : "bg-blue-600 hover:bg-blue-500";

  return (
    <>
    
    <Navbar/>
    
    <div className={`min-h-screen ${bgColor} ${textColor} p-4 md:p-8 pt-16`}>
      <div className="max-w-md mx-auto">
        {/* Header with user profile and balance */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            {userProfile.profilePic && (
              <img
                src={userProfile.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              />
            )}
            <div>
              <h1 className="text-lg font-bold">{userProfile.username}</h1>
              <button
                onClick={toggleTheme}
                className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-800"
              >
                {theme === "green" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </div>

          <div className={`${cardBg} px-4 py-2 rounded-lg shadow`}>
            <div className="flex items-center">
              <p className="text-sm">Balance:</p>
              <button
                onClick={getUserBalance}
                disabled={isLoading}
                className="ml-2 text-sm"
              >
                {isLoading ? "..." : "🔄"}
              </button>
            </div>
            <p className="font-bold text-lg">
              {userProfile.balance.toFixed(2)} ₹
            </p>
          </div>
        </div>

        {/* Wheel */}
        <div className="relative w-full aspect-square max-w-xs mx-auto mb-8">
          <div
            className={`absolute inset-0 rounded-full border-4 ${
              theme === "green" ? "border-green-300" : "border-gray-700"
            }`}
          ></div>
          {multipliers.map((multiplier, index) => {
            const angle = segmentAngles[index];
            const radius = 45;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={multiplier}
                className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all ${getMultiplierColor(
                  multiplier
                )} ${
                  selectedMultiplier === multiplier
                    ? "ring-4 ring-yellow-400 scale-110"
                    : ""
                } ${isSpinning ? "opacity-90" : ""}`}
                style={{
                  left: `calc(50% + ${x}%)`,
                  top: `calc(50% + ${y}%)`,
                }}
              >
                <span className="text-xs md:text-sm">
                  {getMultiplierName(multiplier)}
                </span>
              </div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-16 h-16 md:w-20 md:h-20 ${cardBg} rounded-full flex flex-col items-center justify-center border-2 ${
                theme === "green" ? "border-green-300" : "border-gray-600"
              }`}
            >
              <span className="text-xs">Selected</span>
              <span className="text-lg md:text-xl font-bold">
                {selectedMultiplier === 0
                  ? "Lose"
                  : `${selectedMultiplier.toFixed(1)}x`}
              </span>
            </div>
          </div>
        </div>

        {currentResult && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-bold ${
              currentResult.includes("won")
                ? theme === "green"
                  ? "bg-green-200 text-green-800"
                  : "bg-green-900 text-green-300"
                : currentResult.includes("lost")
                ? theme === "green"
                  ? "bg-red-200 text-red-800"
                  : "bg-red-900 text-red-300"
                : cardBg
            }`}
          >
            {currentResult}
          </div>
        )}

        {/* Multiplier Legend */}
        <div className={`mb-6 ${cardBg} p-3 rounded-lg shadow`}>
          <h2 className="text-lg font-bold mb-2 text-center">Multipliers</h2>
          <div className="grid grid-cols-3 gap-2">
            {multipliers.map((multiplier) => (
              <div
                key={multiplier}
                className={`flex items-center justify-center p-2 rounded ${getMultiplierColor(
                  multiplier
                )}`}
              >
                <span className="font-bold text-white">
                  {getMultiplierName(multiplier)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBg} p-4 rounded-lg mb-6 shadow`}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Bet Amount (₹)</label>
            <div className="flex">
              <input
                type="text"
                value={betAmount}
                onChange={handleBetAmountChange}
                disabled={isSpinning}
                className={`flex-1 ${inputBg} ${textColor} p-3 rounded-l-lg focus:outline-none focus:ring-2 ${
                  theme === "green"
                    ? "focus:ring-green-500"
                    : "focus:ring-blue-500"
                } disabled:opacity-50`}
                placeholder="0.00"
              />
              <button
                onClick={() => setBetAmount(userProfile.balance.toFixed(2))}
                disabled={isSpinning}
                className={`${
                  theme === "green"
                    ? "bg-green-500 hover:bg-green-400"
                    : "bg-gray-600 hover:bg-gray-500"
                } px-3 rounded-r-lg text-sm text-white disabled:opacity-50`}
              >
                Max
              </button>
            </div>
          </div>

          <button
            onClick={placeBet}
            disabled={
              isSpinning ||
              parseFloat(betAmount) <= 0 ||
              parseFloat(betAmount) > userProfile.balance
            }
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
              isSpinning
                ? "bg-gray-600 cursor-not-allowed"
                : `${buttonBg} text-white`
            }`}
          >
            {isSpinning ? "Spinning..." : "Place Bet"}
          </button>
        </div>

        {/* Bet History */}
        {betHistory.length > 0 && (
          <div className={`${cardBg} p-4 rounded-lg shadow`}>
            <h2 className="text-lg font-bold mb-2">Recent Bets</h2>
            <ul className="space-y-2 text-sm">
              {betHistory.map((bet) => (
                <li key={bet.id} className="flex justify-between">
                  <span>
                    {bet.timestamp} - {bet.amount.toFixed(2)} @ {bet.multiplier}
                    x
                  </span>
                  <span
                    className={`font-bold ${
                      bet.result === "win"
                        ? theme === "green"
                          ? "text-green-600"
                          : "text-green-400"
                        : bet.result === "lose"
                        ? theme === "green"
                          ? "text-red-600"
                          : "text-red-400"
                        : theme === "green"
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {bet.result === "win" ? "+" : "-"}
                    {bet.win.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

    </>
  );
};

export default WheelGame;
