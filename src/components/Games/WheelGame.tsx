// import React, { useState } from "react";

// interface Bet {
//   id: number;
//   amount: number;
//   multiplier: number;
//   win: number;
//   timestamp: string;
//   result: "win" | "lose" | "pending";
// }

// const WheelGame: React.FC = () => {
//   const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
//   const [betAmount, setBetAmount] = useState<string>("0.00");
//   const [userBalance, setUserBalance] = useState<number>(100.0);
//   const [betHistory, setBetHistory] = useState<Bet[]>([]);
//   const [isSpinning, setIsSpinning] = useState<boolean>(false);
//   const [currentResult, setCurrentResult] = useState<string>("");

//   const multipliers = [0, 1, 1.5, 2, 3, 4];
//   // const quickBetOptions = ["1/2", "2x", "25%", "Max"];

//   const getMultiplierColor = (multiplier: number): string => {
//     if (multiplier === 0) return "bg-gray-400";
//     if (multiplier === 1) return "bg-green-500";
//     if (multiplier === 1.5) return "bg-blue-500";
//     if (multiplier === 2) return "bg-purple-500";
//     if (multiplier === 3) return "bg-yellow-500";
//     if (multiplier === 4) return "bg-red-500";
//     return "bg-gray-400";
//   };

//   const getMultiplierName = (multiplier: number): string => {
//     if (multiplier === 0) return "Lose";
//     return `${multiplier}x`;
//   };

//   const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
//       setBetAmount(value);
//     }
//   };

//   // const applyQuickBet = (option: string) => {
//   //   let newAmount = parseFloat(betAmount) || 0;
//   //   switch (option) {
//   //     case "1/2":
//   //       newAmount /= 2;
//   //       break;
//   //     case "2x":
//   //       newAmount *= 2;
//   //       break;
//   //     case "25%":
//   //       newAmount = userBalance * 0.25;
//   //       break;
//   //     case "Max":
//   //       newAmount = userBalance;
//   //       break;
//   //   }
//   //   setBetAmount(Math.min(newAmount, userBalance).toFixed(2));
//   // };

//   const calculateWin = (amount: number, multiplier: number): number => {
//     return amount * multiplier;
//   };

//   const simulateSpin = (): Promise<boolean> => {
//     return new Promise((resolve) => {
//       const spinDuration = 2000 + Math.random() * 1000;
//       const spinInterval = 100;
//       let elapsed = 0;

//       const spin = setInterval(() => {
//         elapsed += spinInterval;
//         const randomIndex = Math.floor(Math.random() * multipliers.length);
//         setSelectedMultiplier(multipliers[randomIndex]);

//         if (elapsed >= spinDuration) {
//           clearInterval(spin);
//           resolve(true);
//         }
//       }, spinInterval);
//     });
//   };

//   const placeBet = async () => {
//     const amount = parseFloat(betAmount);
//     if (
//       amount <= 0 ||
//       // selectedMultiplier <= 0 ||
//       amount > userBalance ||
//       isSpinning
//     )
//       return;

//     setIsSpinning(true);
//     setCurrentResult("Spinning...");

//     setUserBalance((prev) => prev - amount);

//     const newBet: Bet = {
//       id: Date.now(),
//       amount,
//       multiplier: selectedMultiplier,
//       win: 0,
//       timestamp: new Date().toLocaleTimeString(),
//       result: "pending",
//     };

//     setBetHistory((prev) => [newBet, ...prev].slice(0, 10));

//     await simulateSpin();

//     const didWin = selectedMultiplier !== 0;
//     const winAmount = didWin ? calculateWin(amount, selectedMultiplier) : 0;

//     setUserBalance((prev) => prev + winAmount);

//     setBetHistory((prev) => {
//       const updated = [...prev];
//       updated[0] = {
//         ...updated[0],
//         win: winAmount,
//         result: didWin ? "win" : "lose",
//       };
//       return updated;
//     });

//     setCurrentResult(
//       didWin ? `You won ${winAmount.toFixed(2)} USDT!` : "You lost this round"
//     );
//     setIsSpinning(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
//       <div className="max-w-md mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-yellow-400">Multiplier Game</h1>
//           <div className="bg-gray-800 px-4 py-2 rounded-lg">
//             <p className="text-sm text-gray-400">Balance</p>
//             <p className="font-bold text-lg">{userBalance.toFixed(2)} USDT</p>
//           </div>
//         </div>

//         {/* Wheel */}
//         <div className="relative w-full aspect-square max-w-xs mx-auto mb-8">
//           <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
//           {multipliers.map((multiplier, index) => {
//             const angle = index * (360 / multipliers.length) - 90;
//             const radius = 45;
//             const x = radius * Math.cos((angle * Math.PI) / 180);
//             const y = radius * Math.sin((angle * Math.PI) / 180);

//             return (
//               <button
//                 key={multiplier}
//                 disabled={isSpinning}
//                 className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all ${getMultiplierColor(
//                   multiplier
//                 )} ${
//                   selectedMultiplier === multiplier
//                     ? "ring-4 ring-yellow-400 scale-110"
//                     : ""
//                 } ${
//                   isSpinning
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:scale-105"
//                 }`}
//                 style={{
//                   left: `calc(50% + ${x}%)`,
//                   top: `calc(50% + ${y}%)`,
//                 }}
//                 onClick={() => !isSpinning && setSelectedMultiplier(multiplier)}
//               >
//                 <span className="text-xs md:text-sm">
//                   {getMultiplierName(multiplier)}
//                 </span>
//               </button>
//             );
//           })}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex flex-col items-center justify-center border-2 border-gray-600">
//               <span className="text-xs text-gray-400">Selected</span>
//               <span className="text-lg md:text-xl font-bold">
//                 {selectedMultiplier === 0
//                   ? "Lose"
//                   : `${selectedMultiplier.toFixed(1)}x`}
//               </span>
//             </div>
//           </div>
//         </div>

//         {currentResult && (
//           <div
//             className={`mb-4 p-3 rounded-lg text-center font-bold ${
//               currentResult.includes("won")
//                 ? "bg-green-900 text-green-300"
//                 : currentResult.includes("lost")
//                 ? "bg-red-900 text-red-300"
//                 : "bg-gray-800"
//             }`}
//           >
//             {currentResult}
//           </div>
//         )}

//          {/* Multiplier Legend */}
//         <div className="mb-6 bg-gray-800 p-3 rounded-lg">
//           <h2 className="text-lg font-bold mb-2 text-center">Multipliers</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {multipliers.map((multiplier) => (
//               <div
//                 key={multiplier}
//                 className={`flex items-center justify-center p-2 rounded ${getMultiplierColor(
//                   multiplier
//                 )}`}
//               >
//                 <span className="font-bold">{getMultiplierName(multiplier)}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-gray-800 p-4 rounded-lg mb-6">
//           <div className="mb-4">
//             <label className="block text-sm text-gray-400 mb-1">
//               Bet Amount (USDT)
//             </label>
//             <div className="flex">
//               <input
//                 type="text"
//                 value={betAmount}
//                 onChange={handleBetAmountChange}
//                 disabled={isSpinning}
//                 className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
//                 placeholder="0.00"
//               />
//               <button
//                 onClick={() => setBetAmount(userBalance.toFixed(2))}
//                 disabled={isSpinning}
//                 className="bg-gray-600 px-3 rounded-r-lg text-sm hover:bg-gray-500 disabled:opacity-50"
//               >
//                 Max
//               </button>
//             </div>
//           </div>

//           {/* <div className="grid grid-cols-4 gap-2 mb-4">
//             {quickBetOptions.map((option) => (
//               <button
//                 key={option}
//                 disabled={isSpinning}
//                 className="bg-gray-700 p-2 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
//                 onClick={() => applyQuickBet(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div> */}

//           <button
//             onClick={placeBet}
//             disabled={
//               isSpinning ||
//               parseFloat(betAmount) <= 0 ||
//               parseFloat(betAmount) > userBalance
//             }
//             className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
//               isSpinning
//                 ? "bg-gray-600 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-500"
//             }`}
//           >
//             {isSpinning ? "Spinning..." : "Place Bet"}
//           </button>
//         </div>

//         {/* Bet History */}
//         {betHistory.length > 0 && (
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h2 className="text-lg font-bold mb-2">Recent Bets</h2>
//             <ul className="space-y-2 text-sm">
//               {betHistory.map((bet) => (
//                 <li key={bet.id} className="flex justify-between">
//                   <span>
//                     {bet.timestamp} - {bet.amount.toFixed(2)} @ {bet.multiplier}x
//                   </span>
//                   <span
//                     className={`font-bold ${
//                       bet.result === "win"
//                         ? "text-green-400"
//                         : bet.result === "lose"
//                         ? "text-red-400"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {bet.result === "pending"
//                       ? "..."
//                       : `${bet.result === "win" ? "+" : "-"}${bet.win.toFixed(
//                           2
//                         )}`}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WheelGame;

import React, { useState, useEffect } from "react";
import { useTheme } from "../../utils/ThemeContext"; // Assuming you have this context

interface Bet {
  id: number;
  amount: number;
  multiplier: number;
  win: number;
  timestamp: string;
  result: "win" | "lose" | "pending";
}

interface UserProfile {
  username: string;
  balance: number;
  profilePic: string;
}

const WheelGame: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<string>("0.00");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "Guest",
    balance: 100.0,
    profilePic: "",
  });
  const [betHistory, setBetHistory] = useState<Bet[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const multipliers = [0, 1, 1.5, 2, 3, 4];

  // Simulate fetching user data (replace with actual API call)
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user');
        // const data = await response.json();

        // Mock data based on your JSON
        const mockUserData = {
          username: "DON",
          balance: 85595.75,
          profilePic:
            "https://res.cloudinary.com/degag862k/image/upload/v1744893491/WhatsApp_Image_2025-04-17_at_09.07.23_19048e01_fk6hmm.jpg",
        };

        setUserProfile(mockUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const refreshBalance = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to refresh balance
      // const response = await fetch('/api/user/balance');
      // const data = await response.json();
      // setUserProfile(prev => ({...prev, balance: data.balance}));

      // Mock refresh - just use current balance
      setUserProfile((prev) => ({ ...prev }));
    } catch (error) {
      console.error("Error refreshing balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (multiplier === 4)
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

  const calculateWin = (amount: number, multiplier: number): number => {
    return amount * multiplier;
  };

  const simulateSpin = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const spinDuration = 2000 + Math.random() * 1000;
      const spinInterval = 100;
      let elapsed = 0;

      const spin = setInterval(() => {
        elapsed += spinInterval;
        const randomIndex = Math.floor(Math.random() * multipliers.length);
        setSelectedMultiplier(multipliers[randomIndex]);

        if (elapsed >= spinDuration) {
          clearInterval(spin);
          resolve(true);
        }
      }, spinInterval);
    });
  };

  const placeBet = async () => {
    const amount = parseFloat(betAmount);
    if (amount <= 0 || amount > userProfile.balance || isSpinning) return;

    setIsSpinning(true);
    setCurrentResult("Spinning...");

    setUserProfile((prev) => ({
      ...prev,
      balance: prev.balance - amount,
    }));

    const newBet: Bet = {
      id: Date.now(),
      amount,
      multiplier: selectedMultiplier,
      win: 0,
      timestamp: new Date().toLocaleTimeString(),
      result: "pending",
    };

    setBetHistory((prev) => [newBet, ...prev].slice(0, 10));

    await simulateSpin();

    const didWin = selectedMultiplier !== 0;
    const winAmount = didWin ? calculateWin(amount, selectedMultiplier) : 0;

    setUserProfile((prev) => ({
      ...prev,
      balance: prev.balance + winAmount,
    }));

    setBetHistory((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        win: winAmount,
        result: didWin ? "win" : "lose",
      };
      return updated;
    });

    setCurrentResult(
      didWin ? `You won ${winAmount.toFixed(2)} USDT!` : "You lost this round"
    );
    setIsSpinning(false);
  };

  // Theme-specific styles
  const bgColor = theme === "green" ? "bg-green-100" : "bg-gray-900";
  const textColor = theme === "green" ? "text-green-900" : "text-white";
  const cardBg = theme === "green" ? "bg-white" : "bg-gray-800";
  const inputBg = theme === "green" ? "bg-green-50" : "bg-gray-700";
  const buttonBg =
    theme === "green"
      ? "bg-green-600 hover:bg-green-500"
      : "bg-blue-600 hover:bg-blue-500";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-4 md:p-8`}>
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
                onClick={refreshBalance}
                disabled={isLoading}
                className="ml-2 text-sm"
              >
                {isLoading ? "..." : "🔄"}
              </button>
            </div>
            <p className="font-bold text-lg">
              {userProfile.balance.toFixed(2)} USDT
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
            const angle = index * (360 / multipliers.length) - 90;
            const radius = 45;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <button
                key={multiplier}
                disabled={isSpinning}
                className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all ${getMultiplierColor(
                  multiplier
                )} ${
                  selectedMultiplier === multiplier
                    ? "ring-4 ring-yellow-400 scale-110"
                    : ""
                } ${
                  isSpinning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                style={{
                  left: `calc(50% + ${x}%)`,
                  top: `calc(50% + ${y}%)`,
                }}
                onClick={() => !isSpinning && setSelectedMultiplier(multiplier)}
              >
                <span className="text-xs md:text-sm">
                  {getMultiplierName(multiplier)}
                </span>
              </button>
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
            <label className="block text-sm mb-1">Bet Amount (USDT)</label>
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
                    {bet.result === "pending"
                      ? "..."
                      : `${bet.result === "win" ? "+" : "-"}${bet.win.toFixed(
                          2
                        )}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelGame;
