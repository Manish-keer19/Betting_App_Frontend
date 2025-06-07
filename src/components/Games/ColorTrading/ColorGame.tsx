// import { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import io  from "socket.io-client";
// import { TfiReload } from "react-icons/tfi";
// import { toast } from "sonner";
// import { Howl } from "howler";
// import countdownSound from "../../../assets/music/count.mp3"
// import { userService } from "../../../Services/userService";
// import { setUser } from "../../../features/userSlice";
// import Navbar from "../../Navbar";
// import { WebSocket_URL } from "../../../Services/axiosInstance";

// type GameColor = "red" | "green" | "blue";
// type GameResult = "red" | "green" | "blue" | null;
// type GameStatus = "waiting" | "betting" | "result";

// interface RoundHistory {
//   roundId: string;
//   result: GameResult;
//   endedAt?: Date;
// }

// interface UserBet {
//   _id: string;
//   choice: GameColor;
//   amount: number;
//   result: "win" | "lose";
//   payout: number;
//   createdAt: string;
// }

// const socket = io(WebSocket_URL);

// export default function ColorGame() {
//   const dispatch = useDispatch();
//   const userData = useSelector((state: any) => state.user);

//   const [sound] = useState(
//     () =>
//       new Howl({
//         src: [countdownSound],
//         volume: 0.5,
//       })
//   );

//   const [roundId, setRoundId] = useState("");
//   const [selectedColor, setSelectedColor] = useState<GameColor | null>(null);
//   const [betAmount, setBetAmount] = useState<number>(100);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [status, setStatus] = useState("");
//   const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
//   const [resultHistory, setResultHistory] = useState<RoundHistory[]>([]);
//   const [user, setUserdata] = useState(userData);
//   const [isUserBetted, setIsUserBetted] = useState<boolean>(false);
//   const [userHistory, setUserHistory] = useState<UserBet[]>([]);
//   const [winningColor, setWinningColor] = useState<GameResult>(null);

//   const timerIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const serverTimeOffsetRef = useRef(0);
//   const lastSyncRef = useRef(0);

//   const colors = {
//     bg: "bg-gray-900",
//     card: "bg-gray-800",
//     text: "text-white",
//     button: "bg-gray-700 hover:bg-gray-600",
//     border: "border-gray-600",
//     active: "ring-4 ring-yellow-400",
//     highlight: "text-yellow-400",
//     input: "bg-gray-700 text-white placeholder-gray-400",
//   };

//   // Sound effects for countdown
//   useEffect(() => {
//     if (timeLeft <= 5 && timeLeft > 0) {
//       sound.stop();
//       sound.play();
//     }

//     if (timeLeft === 0) {
//       sound.stop();
//     }

//     return () => {
//       sound.stop();
//     };
//   }, [timeLeft, sound]);

//   // Socket event handlers
//   useEffect(() => {
//     console.log("Connecting to socket...");
//     socket.connect();

//     socket.on("color_newRound", ({ roundId, startedAt, history }) => {
//       setIsUserBetted(false);
//       setRoundId(roundId);
//       setSelectedColor(null);
//       setWinningColor(null);
//       setGameStatus("betting");
//       startTimer(startedAt);
//       setResultHistory(history || []);
//       setStatus("New round started! Place your bet!");
//     });

//     socket.on("color_roundResult", ({ roundId, result, history }) => {
//       setWinningColor(result);
//       setGameStatus("result");
//       setResultHistory(history || []);
//       setStatus(`Round ${roundId.slice(-4)} result: ${result}`);
//     });

//     socket.on("color_roundOutcome", ({ result, choice, amount, message }) => {
//       setStatus(message);

//       if (result === "win") {
//         toast.success(message);
//       } else {
//         toast.error(message);
//       }

//       setIsUserBetted(false);

//       if (result === "win") {
//         setUserdata((prev: any) => {
//           const newBalance = prev.balance + amount;
//           const updatedUser = { ...prev, balance: newBalance };
//           dispatch(setUser(updatedUser));
//           return updatedUser;
//         });

//         setUserHistory((prev) => [
//           {
//             _id: `${Date.now()}`,
//             choice,
//             amount,
//             result,
//             payout: amount * (choice === "blue" ? 5 : 1.95),
//             createdAt: new Date().toISOString(),
//           },
//           ...prev,
//         ]);
//       } else {
//         setUserHistory((prev) => [
//           {
//             _id: `${Date.now()}`,
//             choice,
//             amount,
//             result,
//             payout: 0,
//             createdAt: new Date().toISOString(),
//           },
//           ...prev,
//         ]);
//       }
//     });

//     socket.on("color_error", (message) => {
//       setStatus(`Error: ${message}`);
//       toast.error(message);
//     });

//     socket.on("color_balanceUpdate", ({ balance }) => {
//       setUserdata((prev: any) => ({ ...prev, balance }));
//       dispatch(setUser({ ...userData, balance }));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [dispatch, userData]);

//   // Timer synchronization with server
//   const startTimer = (startedAt: string) => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     const calculateRemaining = () => {
//       const serverNow = Date.now() + serverTimeOffsetRef.current;
//       const roundEnd = new Date(startedAt).getTime() + 30000;
//       return Math.max(0, Math.floor((roundEnd - serverNow) / 1000));
//     };

//     const syncWithServer = () => {
//       const now = Date.now();
//       socket.emit("getServerTime", {}, (serverTime: number) => {
//         const roundTripTime = Date.now() - now;
//         serverTimeOffsetRef.current = serverTime - Date.now() + roundTripTime / 2;
//         lastSyncRef.current = Date.now();
//         setTimeLeft(calculateRemaining());
//       });
//     };

//     syncWithServer();

//     let expected = Date.now() + 1000;
//     const driftCorrection = (now: number) => {
//       const drift = now - expected;
//       expected += 1000;
//       return Math.max(0, 1000 - drift);
//     };

//     timerIntervalRef.current = setInterval(() => {
//       const now = Date.now();

//       if (now - lastSyncRef.current > 30000 || Math.abs(serverTimeOffsetRef.current) > 1000) {
//         syncWithServer();
//       }

//       const remaining = calculateRemaining();
//       setTimeLeft(remaining);

//       if (remaining <= 5 && remaining > 0) {
//         setGameStatus("betting");
//       } else if (remaining === 0) {
//         setGameStatus("result");
//       }

//       const nextTick = driftCorrection(now);
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//         timerIntervalRef.current = setTimeout(() => {
//           startTimer(startedAt);
//         }, nextTick);
//       }
//     }, 1000);

//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//     };
//   };

//   const placeBet = () => {
//     if (!selectedColor) {
//       setStatus("Please select a color first");
//       return;
//     }
//     if (betAmount <= 0 || isNaN(betAmount)) {
//       setStatus("Please enter a valid bet amount");
//       return;
//     }
//     if (userData.balance < betAmount) {
//       setStatus("Insufficient balance");
//       return;
//     }
//     if (isUserBetted) {
//       toast.error("You've already placed a bet this round");
//       return;
//     }
//     if (timeLeft <= 5) {
//       toast.error("Betting time has ended");
//       return;
//     }

//     setUserdata((prev: any) => ({
//       ...prev,
//       balance: prev.balance - betAmount,
//     }));

//     socket.emit("placeColorBet", {
//       userId: userData._id,
//       choice: selectedColor,
//       amount: betAmount,
//       roundId,
//     });

//     setIsUserBetted(true);
//     setStatus(`Bet placed: ₹${betAmount} on ${selectedColor}`);
//   };

//   const fetchUserHistory = async () => {
//     try {
//       const token = userData.token;
//       if (!token) {
//         toast.error("Token not found");
//         return;
//       }
//       const response = await userService.getUserBetHistoryByGameTyp(token,"ColorPrediction");
//       setUserHistory(response.data);
//     } catch (error) {
//       console.error("Failed to fetch user history:", error);
//       toast.error("Failed to load history");
//     }
//   };

//   const getUserBalance = async () => {
//     try {
//       if (!user?.token) {
//         toast.error("Token not found");
//         return;
//       }
//       const res = await userService.getUserBalance(user.token);
//       if (res?.success) {
//         setUserdata((prev: any) => ({ ...prev, balance: res.data.balance }));
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
//       console.error("Balance error:", error);
//       toast.error("Error fetching balance");
//     }
//   };

//   useEffect(() => {
//     if (userData?._id) {
//       fetchUserHistory();
//       socket.emit("color_registerUser", "colorGame");
//     }
//   }, [userData?._id]);

//   const getColorClass = (color: GameColor) => {
//     if (gameStatus === "result" && winningColor === color) {
//       return "animate-pulse scale-105";
//     }
//     if (selectedColor === color) {
//       return "ring-4 ring-yellow-400";
//     }
//     return "";
//   };

//   const getColorButtonStyle = (color: GameColor) => {
//     const baseStyle = "p-6 rounded-lg flex flex-col items-center justify-center transition-all";
//     const colorStyle = {
//       red: "bg-red-600 hover:bg-red-700",
//       green: "bg-green-600 hover:bg-green-700",
//       blue: "bg-blue-600 hover:bg-blue-700",
//     }[color];

//     const disabledStyle = gameStatus !== "betting" ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

//     return `${baseStyle} ${colorStyle} ${getColorClass(color)} ${disabledStyle}`;
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={`min-h-screen ${colors.bg} ${colors.text} p-4 pt-[7vh]`}>
//         <div className="max-w-md mx-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-yellow-400">COLOR PREDICTION</h1>
//             <div className="flex items-center gap-2">
//               <span className="text-sm">
//                 ₹{typeof userData.balance === "number" ? userData.balance.toFixed(2) : "0.00"}
//               </span>
//               <TfiReload
//                 onClick={getUserBalance}
//                 className="text-yellow-400 cursor-pointer"
//                 size={18}
//               />
//             </div>
//           </div>

//           {/* User Profile */}
//           <div className={`flex items-center gap-3 p-3 rounded-lg ${colors.card} mb-4`}>
//             <img
//               src={userData.profilePic || "/default-avatar.png"}
//               className="w-10 h-10 rounded-full border border-yellow-400"
//               alt="Avatar"
//             />
//             <div>
//               <p className="font-medium">{userData.username}</p>
//               <p className="text-xs text-gray-400">{userData.email}</p>
//             </div>
//           </div>

//           {/* Game Info */}
//           <div className={`p-4 rounded-lg ${colors.card} mb-4`}>
//             <div className="grid grid-cols-2 gap-3 mb-3">
//               <div>
//                 <p className="text-xs text-gray-400">Round ID</p>
//                 <p className="font-medium text-sm truncate">
//                   #{roundId.slice(0, 8)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Time Left</p>
//                 <p className={`font-bold ${timeLeft < 10 ? "text-red-400" : "text-yellow-400"}`}>
//                   {timeLeft}s
//                 </p>
//               </div>
//             </div>

//             <div className={`p-3 rounded ${colors.input} text-center`}>
//               <p className="text-sm truncate">
//                 {status || "Waiting for round..."}
//               </p>
//             </div>
//           </div>

//           {/* Color Selection */}
//           <div className={`p-4 rounded-lg ${colors.card} mb-4`}>
//             <h2 className="text-lg font-bold mb-3">CHOOSE A COLOR</h2>
//             <div className="grid grid-cols-3 gap-3 mb-4">
//               {(["red", "green", "blue"] as GameColor[]).map((color) => (
//                 <button
//                   key={color}
//                   disabled={gameStatus !== "betting"}
//                   onClick={() => setSelectedColor(color)}
//                   className={getColorButtonStyle(color)}
//                 >
//                   <span className="text-xl font-bold">{color.toUpperCase()}</span>
//                   <span className="text-sm">
//                     {color === "blue" ? "5.0x" : "1.95x"}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             <div className="space-y-3">
//               <input
//                 type="number"
//                 placeholder="Enter bet amount (₹)"
//                 value={betAmount}
//                 onChange={(e) => setBetAmount(Number(e.target.value) || 0)}
//                 className={`w-full px-4 py-3 rounded-lg ${colors.input} focus:outline-none focus:ring-1 focus:ring-yellow-400`}
//                 min="1"
//                 max={userData.balance}
//               />

//               <div className="grid grid-cols-5 gap-2 mb-2">
//                 {[100, 200, 500, 1000, 2000].map((amount) => (
//                   <button
//                     key={amount}
//                     onClick={() => setBetAmount(amount)}
//                     className={`py-2 rounded ${colors.button} ${betAmount === amount ? "bg-yellow-600 text-white" : ""}`}
//                   >
//                     ₹{amount}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={placeBet}
//                 disabled={!selectedColor || !betAmount || gameStatus !== "betting" || isUserBetted}
//                 className={`w-full py-3 rounded-lg font-bold transition-all ${
//                   selectedColor && betAmount && gameStatus === "betting" && !isUserBetted
//                     ? "bg-yellow-600 hover:bg-yellow-500"
//                     : "bg-gray-600 cursor-not-allowed"
//                 }`}
//               >
//                 {selectedColor ? `BET ON ${selectedColor.toUpperCase()}` : "SELECT A COLOR"}
//               </button>
//             </div>
//           </div>

//           {/* Recent Results */}
//           <div className={`p-4 rounded-lg ${colors.card} mb-4`}>
//             <h2 className="text-lg font-bold mb-3">RECENT RESULTS</h2>
//             {resultHistory.length > 0 ? (
//               <div className="flex gap-2 overflow-x-auto pb-2">
//                 {resultHistory.slice().reverse().map((item, index) => (
//                   <div
//                     key={index}
//                     className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
//                       item.result === "red" ? "bg-red-600" :
//                       item.result === "green" ? "bg-green-600" :
//                       "bg-blue-600"
//                     }`}
//                   >
//                     <span className="font-bold text-white">
//                       {item.result?.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-400 text-center py-4">No results yet</p>
//             )}
//           </div>

//           {/* User Bet History */}
//           <div className={`p-4 rounded-lg ${colors.card}`}>
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-lg font-bold">YOUR BET HISTORY</h2>
//               <TfiReload
//                 onClick={fetchUserHistory}
//                 className="text-yellow-400 cursor-pointer"
//                 size={18}
//               />
//             </div>

//             {userHistory.length > 0 ? (
//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {userHistory.map((bet) => (
//                   <div
//                     key={bet._id}
//                     className={`p-3 rounded-lg flex justify-between items-center ${
//                       bet.result === "win" ? "bg-green-900/30" : "bg-red-900/30"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                           bet.choice === "red" ? "bg-red-600" :
//                           bet.choice === "green" ? "bg-green-600" :
//                           "bg-blue-600"
//                         }`}
//                       >
//                         <span className="text-white text-xs font-bold">
//                           {bet.choice.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="font-medium">₹{bet.amount}</p>
//                         <p className="text-xs text-gray-400">
//                           {new Date(bet.createdAt).toLocaleTimeString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className={bet.result === "win" ? "text-green-400" : "text-red-400"}>
//                         {bet.result.toUpperCase()}
//                       </p>
//                       <p className="text-sm">
//                         {bet.result === "win" ? `+₹${bet.payout.toFixed(2)}` : `-₹${bet.amount}`}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-400 text-center py-4">No bet history found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import {
  FiRefreshCw,
  FiClock,
  FiDollarSign,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import { toast } from "sonner";
import { Howl } from "howler";
import countdownSound from "../../../assets/music/count.mp3";
import { userService } from "../../../Services/userService";
import { setUser } from "../../../features/userSlice";
import Navbar from "../../Navbar";
import { WebSocket_URL } from "../../../Services/axiosInstance";

type GameColor = "red" | "green" | "blue";
type GameResult = "red" | "green" | "blue" | null;
type GameStatus = "waiting" | "betting" | "result";

interface RoundHistory {
  roundId: string;
  result: GameResult;
  endedAt?: Date;
}

interface UserBet {
  _id: string;
  choice: GameColor;
  amount: number;
  result: "win" | "lose";
  payout: number;
  createdAt: string;
}

const socket = io(WebSocket_URL);

export default function ColorGame() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  const [sound] = useState(
    () =>
      new Howl({
        src: [countdownSound],
        volume: 0.5,
      })
  );

  const [roundId, setRoundId] = useState("");
  const [selectedColor, setSelectedColor] = useState<GameColor | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [status, setStatus] = useState("Waiting for game to start...");
  const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
  const [resultHistory, setResultHistory] = useState<RoundHistory[]>([]);
  const [user, setUserdata] = useState(userData);
  const [isUserBetted, setIsUserBetted] = useState<boolean>(false);
  const [userHistory, setUserHistory] = useState<UserBet[]>([]);
  const [winningColor, setWinningColor] = useState<GameResult>(null);
  const [showHistory, setShowHistory] = useState(false);

  const timerIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serverTimeOffsetRef = useRef(0);
  const lastSyncRef = useRef(0);

  // Color scheme
  const theme = {
    bg: "bg-gradient-to-br from-gray-900 to-gray-800",
    card: "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50",
    text: "text-white",
    highlight: "text-amber-400",
    button:
      "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400",
    input:
      "bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400",
    red: "bg-gradient-to-b from-red-600 to-red-500",
    green: "bg-gradient-to-b from-green-600 to-green-500",
    blue: "bg-gradient-to-b from-blue-600 to-blue-500",
    active: "ring-4 ring-amber-400/50 shadow-lg scale-105",
    win: "bg-green-500/10 border-l-4 border-green-500",
    lose: "bg-red-500/10 border-l-4 border-red-500",
  };

  // Sound effects for countdown
  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      sound.stop();
      sound.play();
    }

    if (timeLeft === 0) {
      sound.stop();
    }

    return () => {
      sound.stop();
    };
  }, [timeLeft, sound]);

  const socketRef = useRef<Socket | null>(null);

  // Socket event handlers (same as before)
  useEffect(() => {
    const socket = io(WebSocket_URL);
    socketRef.current = socket;

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      toast.error("Failed to connect to game server");
    });

    socket.on("connect", () => {
      console.log("Connected to game server");
      if (userData?._id) {
        socket.emit("color_registerUser", userData._id);
      }
    });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from game server");
    //   toast.error("Disconnected from game server. Reconnecting...");
    //   setGameStatus("waiting");
    //   setStatus("Reconnecting...");
    // });

    socket.on("color_gameState", ({ currentRound, history }) => {
      // console.log("Game state updated:", currentRound, history);
      setIsUserBetted(false);
      setRoundId(currentRound.roundId);
      setGameStatus("betting");
      startTimer(currentRound.startedAt);
      setResultHistory(history || []);
      // setStatus("Game state updated. Place your bets!");
    });

    socket.on("color_newRound", ({ roundId, startedAt, history }) => {
      setIsUserBetted(false);
      setRoundId(roundId);
      setSelectedColor(null);
      setWinningColor(null);
      setGameStatus("betting");
      startTimer(startedAt);
      setResultHistory(history || []);
      setStatus("Place your bets! Time is ticking!");
    });

    socket.on("color_roundResult", ({ roundId, result, history }) => {
      setWinningColor(result);
      setGameStatus("result");
      setResultHistory(history || []);
      setStatus(`Round ${roundId.slice(-4)} result: ${result}`);
    });

    socket.on("color_roundOutcome", ({ result, choice, amount, message }) => {
      setStatus(message);
      console.log("Round outcome:", result, choice, amount, message);

      if (result === "win") {
        toast.success(message, {
          position: "top-center",
          style: { background: "#4CAF50", color: "white" },
        });
      
        setUserdata((prev: any) => {
          const newBalance = prev.balance + amount;

          const updatedUser = {
            ...prev,
            balance: newBalance,
          };

          // Update Redux store too
          dispatch(setUser(updatedUser));

          return updatedUser;
        });
      } else {
        toast.error(message, {
          position: "top-center",
          style: { background: "#F44336", color: "white" },
        });
      }

      setIsUserBetted(false);

      if (result === "win") {
        setUserdata((prev: any) => {
          const newBalance = prev.balance + amount;
          const updatedUser = { ...prev, balance: newBalance };
          dispatch(setUser(updatedUser));
          return updatedUser;
        });

        setUserHistory((prev) => [
          {
            _id: `${Date.now()}`,
            choice,
            amount,
            result,
            payout: amount * (choice === "blue" ? 5 : 1.95),
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      } else {
        setUserHistory((prev) => [
          {
            _id: `${Date.now()}`,
            choice,
            amount,
            result,
            payout: 0,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    });

    socket.on("color_error", (message) => {
      setStatus(`Error: ${message}`);
      toast.error(message);
    });

    socket.on("color_balanceUpdate", ({ balance }) => {
      setUserdata((prev: any) => ({ ...prev, balance }));
      dispatch(setUser({ ...userData, balance }));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, userData]);

  // Timer synchronization with server (same as before)
  const startTimer = (startedAt: string) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    const calculateRemaining = () => {
      const serverNow = Date.now() + serverTimeOffsetRef.current;
      const roundEnd = new Date(startedAt).getTime() + 30000;
      return Math.max(0, Math.floor((roundEnd - serverNow) / 1000));
    };

    const syncWithServer = () => {
      const now = Date.now();
      socket.emit("getServerTime", {}, (serverTime: number) => {
        const roundTripTime = Date.now() - now;
        serverTimeOffsetRef.current =
          serverTime - Date.now() + roundTripTime / 2;
        lastSyncRef.current = Date.now();
        setTimeLeft(calculateRemaining());
      });
    };

    syncWithServer();

    let expected = Date.now() + 1000;
    const driftCorrection = (now: number) => {
      const drift = now - expected;
      expected += 1000;
      return Math.max(0, 1000 - drift);
    };

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();

      if (
        now - lastSyncRef.current > 30000 ||
        Math.abs(serverTimeOffsetRef.current) > 1000
      ) {
        syncWithServer();
      }

      const remaining = calculateRemaining();
      setTimeLeft(remaining);

      if (remaining <= 5 && remaining > 0) {
        setGameStatus("betting");
      } else if (remaining === 0) {
        setGameStatus("result");
      }

      const nextTick = driftCorrection(now);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setTimeout(() => {
          startTimer(startedAt);
        }, nextTick);
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  };

  const placeBet = () => {
    if (!selectedColor) {
      setStatus("Please select a color first");
      return;
    }
    if (betAmount <= 0 || isNaN(betAmount)) {
      setStatus("Please enter a valid bet amount");
      return;
    }
    if (userData.balance < betAmount) {
      setStatus("Insufficient balance");
      return;
    }
    if (isUserBetted) {
      toast.error("You've already placed a bet this round");
      return;
    }
    if (timeLeft <= 5) {
      toast.error("Betting time has ended");
      return;
    }

    // setUserdata((prev: any) => ({
    //   ...prev,
    //   balance: prev.balance - betAmount,
    // }));

    setUserdata((prev: any) => {
      const newBalance = prev.balance - betAmount;

      const updatedUser = {
        ...prev,
        balance: newBalance,
      };

      // Update Redux store too
      dispatch(setUser(updatedUser));

      return updatedUser;
    });

    socket.emit("placeColorBet", {
      userId: userData._id,
      choice: selectedColor,
      amount: betAmount,
      roundId,
    });

    setIsUserBetted(true);
    setStatus(`Bet placed: ₹${betAmount} on ${selectedColor}`);
  };

  const fetchUserHistory = async () => {
    try {
      const token = userData.token;
      if (!token) {
        toast.error("Token not found");
        return;
      }
      const response = await userService.getUserBetHistoryByGameTyp(
        token,
        "ColorPrediction"
      );
      setUserHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch user history:", error);
      toast.error("Failed to load history");
    }
  };

  const getUserBalance = async () => {
    try {
      if (!user?.token) {
        toast.error("Token not found");
        return;
      }
      const res = await userService.getUserBalance(user.token);
      if (res?.success) {
        setUserdata((prev: any) => ({ ...prev, balance: res.data.balance }));
        dispatch(
          setUser({
            ...user,
            balance: res.data.balance,
            token: user.token || "",
          })
        );
      } else {
        toast.error(res?.message || "Failed to fetch balance");
      }
    } catch (error) {
      console.error("Balance error:", error);
      toast.error("Error fetching balance");
    }
  };

  useEffect(() => {
    if (userData?._id) {
      fetchUserHistory();
      // socket.emit("color_registerUser", "colorGame");
    }
  }, [userData?._id]);

  const getColorClass = (color: GameColor) => {
    if (gameStatus === "result" && winningColor === color) {
      return "animate-pulse shadow-lg scale-105";
    }
    if (selectedColor === color) {
      return theme.active;
    }
    return "";
  };

  const getColorButtonStyle = (color: GameColor) => {
    const baseStyle =
      "p-6 rounded-xl flex flex-col items-center justify-center transition-all shadow-md";
    const colorStyle = theme[color];
    const disabledStyle =
      gameStatus !== "betting"
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer hover:brightness-110";

    return `${baseStyle} ${colorStyle} ${getColorClass(
      color
    )} ${disabledStyle}`;
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${theme.bg} ${theme.text} p-4 pt-28`}>
        <div className="max-w-2xl mx-auto">
          {/* Game Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Color Prediction
              </h1>
              <p className="text-gray-400">
                Predict the winning color and multiply your bet
              </p>
            </div>

            <div className="flex items-center gap-4 bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-amber-400" size={18} />
                <span className="font-medium">
                  ₹
                  {typeof userData.balance === "number"
                    ? userData.balance.toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <button
                onClick={getUserBalance}
                className="p-1 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <FiRefreshCw className="text-amber-400" size={16} />
              </button>
            </div>
          </div>

          {/* Game Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Game Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Game Status Card */}
              <div className={`${theme.card} p-5 rounded-xl`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-amber-400" />
                    <span className="font-medium">
                      Round #{roundId.slice(0, 6)}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full ${
                      timeLeft < 10
                        ? "bg-red-500/20 text-red-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {timeLeft}s
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme.input} mb-4`}>
                  <p className="text-center font-medium truncate">{status}</p>
                </div>

                {/* Color Selection */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {(["red", "green", "blue"] as GameColor[]).map((color) => (
                    <button
                      key={color}
                      disabled={gameStatus !== "betting"}
                      onClick={() => setSelectedColor(color)}
                      className={getColorButtonStyle(color)}
                    >
                      <span className="text-xl font-bold text-white drop-shadow-md">
                        {color.toUpperCase()}
                      </span>
                      <span className="text-sm text-white/90 mt-1">
                        {color === "blue" ? "5.0x" : "1.95x"}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bet Controls */}
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter bet amount"
                      value={betAmount}
                      onChange={(e) =>
                        setBetAmount(Number(e.target.value) || 0)
                      }
                      className={`w-full px-4 py-3 rounded-lg ${theme.input} focus:outline-none focus:ring-2 focus:ring-amber-400/50`}
                      min="1"
                      max={userData.balance}
                    />
                    <span className="absolute right-3 top-3 text-gray-400">
                      ₹
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[100, 200, 500, 1000, 2000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          betAmount === amount
                            ? "bg-amber-600 text-white"
                            : "bg-gray-700/50 hover:bg-gray-700"
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={placeBet}
                    disabled={
                      !selectedColor ||
                      !betAmount ||
                      gameStatus !== "betting" ||
                      isUserBetted
                    }
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      selectedColor &&
                      betAmount &&
                      gameStatus === "betting" &&
                      !isUserBetted
                        ? `${theme.button} hover:shadow-lg`
                        : "bg-gray-700 cursor-not-allowed opacity-70"
                    }`}
                  >
                    {isUserBetted
                      ? "BET PLACED"
                      : selectedColor
                      ? `BET ON ${selectedColor.toUpperCase()}`
                      : "SELECT A COLOR"}
                  </button>
                </div>
              </div>

              {/* Recent Results */}
              <div className={`${theme.card} p-5 rounded-xl`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <FiTrendingUp className="text-amber-400" />
                    Recent Results
                  </h2>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-sm text-amber-400 hover:underline"
                  >
                    {showHistory ? "Hide History" : "Show History"}
                  </button>
                </div>

                {showHistory ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {userHistory.length > 0 ? (
                      userHistory.map((bet) => (
                        <div
                          key={bet._id}
                          className={`p-3 rounded-lg ${
                            bet.result === "win" ? theme.win : theme.lose
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  bet.choice === "red"
                                    ? theme.red
                                    : bet.choice === "green"
                                    ? theme.green
                                    : theme.blue
                                }`}
                              >
                                <span className="text-white font-bold">
                                  {bet.choice.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">₹{bet.amount}</p>
                                <p className="text-xs text-gray-400">
                                  {new Date(bet.createdAt).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={
                                  bet.result === "win"
                                    ? "text-green-400 font-bold"
                                    : "text-red-400 font-bold"
                                }
                              >
                                {bet.result.toUpperCase()}
                              </p>
                              <p className="text-sm">
                                {bet.result === "win"
                                  ? `+₹${bet.payout.toFixed(2)}`
                                  : `-₹${bet.amount}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        No bet history found
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {resultHistory.length > 0 ? (
                      resultHistory
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                              item.result === "red"
                                ? theme.red
                                : item.result === "green"
                                ? theme.green
                                : theme.blue
                            }`}
                          >
                            <span className="font-bold text-white text-lg">
                              {item.result?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        No results yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - User Info */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className={`${theme.card} p-5 rounded-xl`}>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={userData.profilePic || "/default-avatar.png"}
                    className="w-14 h-14 rounded-full border-2 border-amber-400/50"
                    alt="Avatar"
                  />
                  <div>
                    <p className="font-bold">{userData.username}</p>
                    <p className="text-sm text-gray-400 truncate max-w-[180px]">
                      {userData.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Total Bets</p>
                    <p className="font-bold">{userHistory.length}</p>
                  </div>
                  <div className="bg-gray-700/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Wins</p>
                    <p className="font-bold text-green-400">
                      {userHistory.filter((bet) => bet.result === "win").length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Game Stats */}
              <div className={`${theme.card} p-5 rounded-xl`}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FiAward className="text-amber-400" />
                  Game Stats
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Red Wins</span>
                    <span className="font-medium">
                      {resultHistory.filter((r) => r.result === "red").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Green Wins</span>
                    <span className="font-medium">
                      {resultHistory.filter((r) => r.result === "green").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Blue Wins</span>
                    <span className="font-medium">
                      {resultHistory.filter((r) => r.result === "blue").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className={`${theme.card} p-5 rounded-xl`}>
                <h2 className="text-lg font-bold mb-3">Quick Tips</h2>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Blue has higher payout (5x) but lower chance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Red/Green have better odds (1.95x)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Betting closes when timer reaches 5s</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
