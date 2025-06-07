// // import { useState, useEffect, useCallback, useRef } from "react";
// // import { FaCoins, FaChevronUp, FaChevronDown } from "react-icons/fa";
// // import { RiLiveFill } from "react-icons/ri";
// // import { useSelector } from "react-redux";
// // import { toast } from "sonner";
// // import { useDispatch } from "react-redux";
// // import { setUser } from "../../../features/userSlice";
// // import { WebSocket_URL } from "../../../Services/axiosInstance";
// // import { io, Socket } from "socket.io-client";
// // import Navbar from "../../Navbar";
// // import { userService } from "../../../Services/userService";
// // import { TfiReload } from "react-icons/tfi";
// // // import { FaChevronUp, FaChevronDown, FaCoins } from 'react-icons/fa';

// // import { Howl } from "howler";
// // import countdownSound from "../../../assets/music/count.mp3";

// // // Duration of each round in milliseconds
// // const ROUND_DURATION = 30000;

// // // Define types for your socket events
// // type SocketEvents = {
// //   risefall_gameState: (data: {
// //     currentRound: {
// //       roundId: string;
// //       startedAt: string;
// //       timeLeft: number;
// //       serverTime?: number; // Optional, if server sends current time
// //     };
// //     history: RoundHistory[];
// //   }) => void;
// //   risefall_newRound: (data: {
// //     roundId: string;
// //     startedAt: string;
// //     history: RoundHistory[];
// //     serverTime?: number; // Optional, if server sends current time
// //   }) => void;
// //   risefall_roundOutcome: (data: {
// //     result: "win" | "lose";
// //     amount: number;
// //     message: string;
// //     choice: string;
// //   }) => void;
// //   risefall_betPlaced: (data: { amount: number; choice: "up" | "down" }) => void;
// //   risefall_balanceUpdate: (data: { balance: number }) => void;
// //   risefall_error: (message: string) => void;
// //   risefall_userBets: (data: UserBet[]) => void;
// // };

// // type RoundHistory = {
// //   roundId: string;
// //   result: "up" | "down";
// //   totals: { up: number; down: number };
// //   endedAt: string;
// // };

// // type UserBet = {
// //   roundId: string;
// //   choice: "up" | "down";
// //   amount: number;
// //   result: "win" | "lose" | "pending";
// //   payout: number;
// //   createdAt: string;
// // };

// // const ForexTradingApp = () => {
// //   const [sound] = useState(
// //     () =>
// //       new Howl({
// //         src: [countdownSound],
// //         volume: 0.5,
// //       })
// //   );

// //   // Add these refs at the component top
// //   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
// //   const serverTimeOffsetRef = useRef(0);
// //   const endTimeRef = useRef(0);
// //   const dispatch = useDispatch();
// //   const user = useSelector((state: any) => state.user);
// //   const [userData, setUserData] = useState(user);
// //   const [socket, setSocket] = useState<Socket | null>(null);
// //   const [connected, setConnected] = useState(false);
// //   const [timeLeft, setTimeLeft] = useState(30);
// //   const [betAmount, setBetAmount] = useState(10);
// //   const [roundId, setRoundId] = useState("");
// //   const [history, setHistory] = useState<RoundHistory[]>([]);
// //   const [hasBet, setHasBet] = useState(false);
// //   const [status, setStatus] = useState("Connecting...");
// //   // const [userBets, setUserBets] = useState<UserBet[]>([]);
// //   const [activeTab, setActiveTab] = useState("game"); // 'game' or 'history'

// //   const [userHistory, setUserHistory] = useState<
// //     Array<{
// //       _id: string;
// //       choice: string;
// //       amount: number;
// //       result: string;
// //       payout: number;
// //       createdAt: string;
// //     }>
// //   >([]);
// //   const placedBetRef = useRef<any>(null);

// //   const [placedBet, setPlacedBet] = useState<{
// //     roundId: string;
// //     choice: "up" | "down";
// //     amount: number;
// //   } | null>(null);
// //   //  const [timeLeft, setTimeLeft] = useState(30);

// //   // Clean up on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (timerRef.current) {
// //         clearInterval(timerRef.current);
// //       }
// //     };
// //   }, []);

// //   // const startTimer = useCallback((startedAt: string) => {
// //   //   // Clear any existing timer first
// //   //   if (timerRef.current) {
// //   //     clearInterval(timerRef.current);
// //   //     timerRef.current = null;
// //   //   }

// //   //   // Calculate end time (server time + 30 seconds)
// //   //   const serverStartTime = new Date(startedAt).getTime();
// //   //   endTimeRef.current = serverStartTime + 30000;
// //   //   const now = Date.now();

// //   //   // Calculate initial time left (rounded to nearest second)
// //   //   const initialLeft = Math.max(
// //   //     0,
// //   //     Math.round((endTimeRef.current - now) / 1000)
// //   //   );
// //   //   setTimeLeft(initialLeft);

// //   //   // Only start timer if there's time left
// //   //   if (initialLeft <= 0) {
// //   //     setTimeLeft(0);
// //   //     return;
// //   //   }

// //   //   // Start precise timer
// //   //   timerRef.current = setInterval(() => {
// //   //     const now = Date.now();
// //   //     const left = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

// //   //     setTimeLeft(left);

// //   //     // Clear interval when time is up
// //   //     if (left <= 0 && timerRef.current) {
// //   //       clearInterval(timerRef.current);
// //   //       timerRef.current = null;
// //   //     }
// //   //   }, 100);
// //   // }, []);

// //   // Initialize socket connection

// //   // Replace your startTimer function with this:
// //   const startTimer = useCallback((startedAt: string, serverTime?: number) => {
// //     // Clear any existing timer
// //     if (timerRef.current) {
// //       clearInterval(timerRef.current);
// //       timerRef.current = null;
// //     }

// //     // Calculate server-client time offset
// //     if (serverTime) {
// //       const now = Date.now();
// //       serverTimeOffsetRef.current = serverTime - now;
// //     }

// //     // Calculate precise end time (server time + 30 seconds)
// //     const serverStartTime = new Date(startedAt).getTime();
// //     endTimeRef.current = serverStartTime + ROUND_DURATION;

// //     // Initial calculation
// //     const updateTimeLeft = () => {
// //       const now = Date.now() + serverTimeOffsetRef.current;
// //       const left = Math.max(0, endTimeRef.current - now);
// //       setTimeLeft(Math.floor(left / 1000));

// //       // Stop timer when round ends
// //       if (left <= 0) {
// //         if (timerRef.current) {
// //           clearInterval(timerRef.current);
// //           timerRef.current = null;
// //         }
// //       }
// //     };

// //     // Initial update
// //     updateTimeLeft();

// //     // Start high-precision timer (100ms interval for smooth updates)
// //     timerRef.current = setInterval(updateTimeLeft, 100);

// //     return () => {
// //       if (timerRef.current) {
// //         clearInterval(timerRef.current);
// //       }
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const newSocket = io(WebSocket_URL);
// //     setSocket(newSocket);

// //     return () => {
// //       newSocket.disconnect();
// //     };
// //   }, []);

// //   const fetchUserHistory = async () => {
// //     try {
// //       const token = userData.token;
// //       if (!token) {
// //         toast.error("Token not found");
// //       }
// //       // const response = await userService.getUserBetHistoryHeadTail(token);
// //       const response = await userService.getUserBetHistoryByGameTyp(
// //         token,
// //         "ForexTree"
// //       );
// //       setUserHistory(response.data);
// //     } catch (error) {
// //       // console.error("Failed to fetch user history:", error);
// //       toast.error("Failed to load history");
// //     }
// //   };

// //   useEffect(() => {
// //     if (timeLeft <= 5 && timeLeft > 0) {
// //       sound.stop();
// //       sound.play();
// //     }

// //     if (timeLeft === 0) {
// //       sound.stop();
// //     }

// //     return () => {
// //       sound.stop();
// //     };
// //   }, [timeLeft, sound]);

// //   useEffect(() => {
// //     if (userData?._id) {
// //       fetchUserHistory();
// //     }
// //   }, [userData?._id]);

// //   useEffect(() => {
// //     if (!socket || !user?._id) return;
// //   }, []);

// //   // Set up socket events
// //   useEffect(() => {
// //     if (!socket || !user?._id) return;

// //     // const onGameState: SocketEvents["gameState"] = (data) => {
// //     //   setRoundId(data.currentRound.roundId);
// //     //   startTimer(data.currentRound.startedAt);
// //     //   setHistory(data.history || []);
// //     //   setConnected(true);
// //     //   setStatus("Place your bet!");
// //     // };

// //     // const onNewRound: SocketEvents["newRound"] = (data) => {

// //     //   setRoundId(data.roundId);
// //     //   startTimer(data.startedAt);
// //     //   setHasBet(false);
// //     //   setStatus("New round started! Place your bet!");
// //     //   setHistory(data.history || []);
// //     // };

// //     // Update your socket event handlers
// //     const onGameState: SocketEvents["risefall_gameState"] = (data) => {
// //       // console.log("🟢 GameState received", data);
// //       setRoundId(data.currentRound.roundId);
// //       startTimer(data.currentRound.startedAt, data.currentRound.serverTime);
// //       setHistory(data.history || []);
// //       setConnected(true);
// //       setStatus("Place your bet!");
// //     };

// //     const onNewRound: SocketEvents["risefall_newRound"] = (data) => {
// //       // console.log("new round started");
// //       setRoundId(data.roundId);
// //       startTimer(data.startedAt, data.serverTime);
// //       setHasBet(false);
// //       setStatus("New round started! Place your bet!");
// //       setHistory(data.history || []);
// //     };

// //     // const startTimer = (startedAt: string) => {
// //     //   const end = new Date(startedAt).getTime() + 30000;
// //     //   const interval = setInterval(() => {
// //     //     const now = Date.now();
// //     //     const left = Math.max(0, Math.floor((end - now) / 1000));
// //     //     setTimeLeft(left);
// //     //     if (left === 0) clearInterval(interval);
// //     //   }, 1000);
// //     // };

// //     const onRoundOutcome: SocketEvents["risefall_roundOutcome"] = ({
// //       result,
// //       amount,
// //       message,
// //       choice,
// //     }) => {
// //       setStatus(message);
// //       // console.log("Round outcome:", result, amount, message, choice);
// //       toast[result === "win" ? "success" : "error"](message);

// //       if (result === "win") {
// //         setUserData((prev: { balance: number }) => ({
// //           ...prev,
// //           balance: prev.balance + amount,
// //         }));
// //         dispatch(
// //           setUser({
// //             ...userData,
// //             balance: userData.balance + amount,
// //           })
// //         );

// //         // console.log("user amount is ", amount);

// //         setUserHistory((prev) => [
// //           {
// //             _id: `${Date.now()}`, // or use a better unique id if available
// //             choice,
// //             amount,
// //             result,
// //             payout: result === "win" ? amount : 0,
// //             createdAt: new Date().toISOString(),
// //           },

// //           ...prev,
// //         ]);
// //       } else {
// //         setUserHistory((prev) => [
// //           {
// //             _id: `${Date.now()}`,
// //             choice,
// //             amount,
// //             result,
// //             payout: 0,
// //             createdAt: new Date().toISOString(),
// //           },
// //           ...prev,
// //         ]);
// //       }

// //       // console.log("round outcome", result, amount, message, choice);

// //       if (!placedBetRef.current) {
// //         // console.log("No bet placed for this round");
// //         return;
// //       }

// //       // const currentBet = placedBetRef.current;

// //       // if (result === "win") {
// //       //   const newBet = {
// //       //     roundId: roundId,
// //       //     choice: choice as "up" | "down", // explicit cast
// //       //     amount: currentBet.amount, // example: 100
// //       //     result: "win" as "win",
// //       //     payout: amount, // example: amount * 2 or custom logic
// //       //     createdAt: new Date().toISOString(),
// //       //   };

// //       //   setUserBets((prev) => [...prev, newBet]);
// //       // } else {
// //       //   const newBet = {
// //       //     roundId: roundId,
// //       //     choice: choice as "up" | "down", // explicit cast
// //       //     amount: currentBet.amount, // example: 100
// //       //     result: "lose" as "lose",
// //       //     payout: 0,
// //       //     createdAt: new Date().toISOString(),
// //       //   };

// //       //   setUserBets((prev) => [...prev, newBet]);
// //       // }

// //       // setBetAmount(0);

// //       setPlacedBet(null);
// //     };

// //     const onBetPlaced: SocketEvents["risefall_betPlaced"] = ({
// //       amount,
// //       choice,
// //     }) => {
// //       setHasBet(true);
// //       setStatus(`Bet placed: ₹${amount} on ${choice}`);
// //     };

// //     const onBalanceUpdate: SocketEvents["risefall_balanceUpdate"] = ({
// //       balance,
// //     }) => {
// //       setUserData((prev: any) => ({ ...prev, balance }));
// //       dispatch(setUser({ ...userData, balance }));
// //     };

// //     const onError: SocketEvents["risefall_error"] = (message) => {
// //       console.log("error msg is ", message);
// //     };

// //     // const onUserBets: SocketEvents["userBets"] = (bets) => {
// //     //   setUserBets(bets);
// //     // };

// //     socket.on("risefall_gameState", onGameState);
// //     socket.on("risefall_newRound", onNewRound);
// //     socket.on("risefall_roundOutcome", onRoundOutcome);
// //     socket.on("risefall_betPlaced", onBetPlaced);
// //     socket.on("risefall_balanceUpdate", onBalanceUpdate);
// //     socket.on("risefall_error", onError);
// //     // socket.on("userBets", onUserBets);

// //     // Register user and fetch initial data
// //     socket.emit("risefall_registerUser", "updownGame");
// //     // socket.emit("getUserBets", user._id);

// //     return () => {
// //       if (socket) {
// //         socket.off("risefall_gameState", onGameState);
// //         socket.off("risefall_newRound", onNewRound);
// //         socket.off("risefall_roundOutcome", onRoundOutcome);
// //         socket.off("risefall_betPlaced", onBetPlaced);
// //         socket.off("risefall_balanceUpdate", onBalanceUpdate);
// //         socket.off("risefall_error", onError);
// //         // socket.off("userBets", onUserBets);
// //       }
// //     };
// //   }, [socket, user?._id]);

// //   const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const value = e.target.value;
// //     if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
// //       setBetAmount(value === "" ? 0 : Number(value));
// //     }
// //   };

// //   const placeBet = useCallback(
// //     (choice: "up" | "down") => {
// //       if (!choice) return;
// //       if (!socket || !userData?._id) return;
// //       if (hasBet) return toast.error("You already bet this round");
// //       if (betAmount < 1) return toast.error("Invalid bet amount");
// //       if (userData.balance < betAmount)
// //         return toast.error("Insufficient balance");

// //       // Mark the bet as placed
// //       setHasBet(true);

// //       setPlacedBet({
// //         roundId,
// //         choice,
// //         amount: betAmount,
// //       });
// //       placedBetRef.current = {
// //         roundId,
// //         choice,
// //         amount: betAmount,
// //       };

// //       // Emit to the server
// //       socket.emit("placeBetForex", {
// //         userId: userData._id,
// //         roundId, // important to send roundId if server needs it
// //         choice,
// //         amount: betAmount,
// //       });

// //       setStatus(`Bet placed on "${choice.toUpperCase()}"`);
// //       setBetAmount(10);
// //     },
// //     [socket, userData, betAmount, hasBet, roundId]
// //   );

// //   const quickBets = [10, 50, 100, 500];

// //   useEffect(() => {
// //     // console.log("placedBet changed:", placedBet);
// //   }, [placedBet]);

// //   const getUserBalance = async () => {
// //     try {
// //       if (!user?.token) return toast.error("Token not found");

// //       const res = await userService.getUserBalance(user.token);
// //       if (res?.success) {
// //         setUserData((prev: any) => ({ ...prev, balance: res.data.balance }));
// //         dispatch(
// //           setUser({
// //             ...user,
// //             balance: res.data.balance,
// //             token: user.token || "",
// //           })
// //         );
// //       } else toast.error(res?.message || "Failed to fetch balance");
// //     } catch (error) {
// //       // console.error("Balance error:", error);
// //       toast.error("Error fetching balance");
// //     }
// //   };

// //   const Candlestick = ({ item }: { item: RoundHistory }) => {
// //     const total = item.totals.up + item.totals.down;
// //     const upPercent = total > 0 ? (item.totals.up / total) * 100 : 50;

// //     return (
// //       <div className="flex flex-col items-center mx-1">
// //         <div className="relative h-24 w-6">
// //           <div
// //             className={`absolute left-1/2 w-0.5 h-full ${
// //               item.result === "up" ? "bg-green-500" : "bg-red-500"
// //             }`}
// //           ></div>
// //           <div
// //             className="absolute bottom-0 w-full"
// //             style={{ height: `${100 - upPercent}%` }}
// //           >
// //             <div
// //               className={`w-full h-full ${
// //                 item.result === "up" ? "bg-green-300" : "bg-red-300"
// //               }`}
// //             ></div>
// //           </div>
// //           <div
// //             className="absolute top-0 w-full"
// //             style={{ height: `${upPercent}%` }}
// //           >
// //             <div
// //               className={`w-full h-full ${
// //                 item.result === "up" ? "bg-green-500" : "bg-red-500"
// //               }`}
// //             ></div>
// //           </div>
// //         </div>
// //         <div
// //           className={`text-xs mt-1 font-bold ${
// //             item.result === "up" ? "text-green-400" : "text-red-400"
// //           }`}
// //         >
// //           {item.result.toUpperCase()}
// //         </div>
// //       </div>
// //     );
// //   };

// //   // const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
// //   //   const date = new Date(bet.createdAt).toLocaleTimeString();

// //   //   return (
// //   //     <div
// //   //       className={`p-3 mb-2 rounded-lg ${
// //   //         bet.result === "win" ? "bg-green-900/50" : "bg-red-900/50"
// //   //       }`}
// //   //     >
// //   //       <div className="flex justify-between items-center">
// //   //         <div>
// //   //           <span className="font-semibold">Round #{bet.roundId}</span>
// //   //           <span className="text-xs ml-2 text-gray-400">{date}</span>
// //   //         </div>
// //   //         <div
// //   //           className={`font-bold ${
// //   //             bet.result === "win" ? "text-green-400" : "text-red-400"
// //   //           }`}
// //   //         >
// //   //           {bet.result === "win" ? "+" : "-"}₹{bet.amount}
// //   //         </div>
// //   //       </div>
// //   //       <div className="flex justify-between mt-1 text-sm">
// //   //         <div
// //   //           className={`flex items-center ${
// //   //             bet.choice === "up" ? "text-green-400" : "text-red-400"
// //   //           }`}
// //   //         >
// //   //           {bet.choice === "up" ? (
// //   //             <FaChevronUp className="mr-1" />
// //   //           ) : (
// //   //             <FaChevronDown className="mr-1" />
// //   //           )}
// //   //           {/* {bet.choice.toUpperCase()} */}
// //   //           {/* {bet?.choice?.toUpperCase() || "N/A"} */}
// //   //           {bet?.choice || "N/A"}
// //   //         </div>
// //   //         <div className="flex items-center text-yellow-400">
// //   //           <FaCoins className="mr-1" />
// //   //           {bet.result === "win" ? `+₹${bet.payout}` : `-₹${bet.amount}`}
// //   //         </div>
// //   //       </div>
// //   //     </div>
// //   //   );
// //   // };

// //   // const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
// //   //   const date = new Date(bet.createdAt).toLocaleTimeString();
// //   //   const isWin = bet.result === "win";
// //   //   const isPending = bet.result === "pending";

// //   //   return (
// //   //     <div
// //   //       className={`p-3 mb-2 rounded-lg ${
// //   //         isPending
// //   //           ? "bg-gray-800/50"
// //   //           : isWin
// //   //           ? "bg-green-900/50"
// //   //           : "bg-red-900/50"
// //   //       }`}
// //   //     >
// //   //       <div className="flex justify-between items-center">
// //   //         <div>
// //   //           <span className="font-semibold">Round #{bet.roundId}</span>
// //   //           <span className="text-xs ml-2 text-gray-400">{date}</span>
// //   //         </div>
// //   //         <div
// //   //           className={`font-bold ${
// //   //             isPending
// //   //               ? "text-gray-400"
// //   //               : isWin
// //   //               ? "text-green-400"
// //   //               : "text-red-400"
// //   //           }`}
// //   //         >
// //   //           {isPending
// //   //             ? "Pending"
// //   //             : isWin
// //   //             ? `+₹${bet.payout.toFixed(2)}`
// //   //             : `-₹${bet.amount.toFixed(2)}`}
// //   //         </div>
// //   //       </div>
// //   //       <div className="flex justify-between mt-1 text-sm">
// //   //         <div
// //   //           className={`flex items-center ${
// //   //             bet.choice === "up" ? "text-green-400" : "text-red-400"
// //   //           }`}
// //   //         >
// //   //           {bet.choice === "up" ? (
// //   //             <FaChevronUp className="mr-1" />
// //   //           ) : (
// //   //             <FaChevronDown className="mr-1" />
// //   //           )}
// //   //           {bet.choice.toUpperCase()}
// //   //         </div>
// //   //         <div className="flex items-center text-yellow-400">
// //   //           <FaCoins className="mr-1" />₹{bet.amount.toFixed(2)}
// //   //         </div>
// //   //       </div>
// //   //       {isPending && (
// //   //         <div className="text-xs text-center mt-2 text-gray-300">
// //   //           Waiting for result...
// //   //         </div>
// //   //       )}
// //   //     </div>
// //   //   );
// //   // };

// //   const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
// //     // Format date to be more compact on mobile
// //     const date = new Date(bet.createdAt).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });

// //     // Shorten round ID to 6 characters (like "55aabb")
// //     const shortRoundId =
// //       bet.roundId.length > 6
// //         ? `${bet.roundId.slice(0, 2)}${bet.roundId.slice(-4)}`
// //         : bet.roundId;

// //     const isWin = bet.result === "win";
// //     const isPending = bet.result === "pending";

// //     return (
// //       <div
// //         className={`p-3 mb-2 rounded-lg ${
// //           isPending
// //             ? "bg-gray-800/50"
// //             : isWin
// //             ? "bg-green-900/50"
// //             : "bg-red-900/50"
// //         }`}
// //       >
// //         <div className="flex justify-between items-center flex-wrap gap-2">
// //           <div className="flex items-center">
// //             <span className="font-semibold text-sm sm:text-base">
// //               Round #{shortRoundId}
// //             </span>
// //             <span className="text-xs ml-2 text-gray-400 hidden xs:inline">
// //               {date}
// //             </span>
// //           </div>
// //           <div
// //             className={`font-bold text-sm sm:text-base ${
// //               isPending
// //                 ? "text-gray-400"
// //                 : isWin
// //                 ? "text-green-400"
// //                 : "text-red-400"
// //             }`}
// //           >
// //             {isPending
// //               ? "Pending"
// //               : isWin
// //               ? `+₹${bet.payout.toFixed(2)}`
// //               : `-₹${bet.amount.toFixed(2)}`}
// //           </div>
// //         </div>

// //         {/* Mobile-only date */}
// //         <div className="xs:hidden text-xs text-gray-400 mt-1">{date}</div>

// //         <div className="flex justify-between mt-1 text-xs sm:text-sm">
// //           <div
// //             className={`flex items-center ${
// //               bet.choice === "up" ? "text-green-400" : "text-red-400"
// //             }`}
// //           >
// //             {bet.choice === "up" ? (
// //               <FaChevronUp className="mr-1" size={12} />
// //             ) : (
// //               <FaChevronDown className="mr-1" size={12} />
// //             )}
// //             {bet.choice.toUpperCase()}
// //           </div>
// //           <div className="flex items-center text-yellow-400">
// //             <FaCoins className="mr-1" size={12} />₹{bet.amount.toFixed(2)}
// //           </div>
// //         </div>
// //         {isPending && (
// //           <div className="text-xs text-center mt-2 text-gray-300">
// //             Waiting for result...
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };
// //   return (
// //     <>
// //       <Navbar />
// //       <div className="p-4 max-w-md mx-auto bg-gray-900 text-white min-h-screen mt-24">
// //         {/* User Profile */}
// //         <div className="flex justify-between items-center mb-4 p-3 bg-gray-800 rounded-lg">
// //           <div className="flex items-center">
// //             <img
// //               src={userData.profilePic || "/default-avatar.png"}
// //               alt="Profile"
// //               className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
// //             />
// //             <div>
// //               <div className="font-bold">{userData.username}</div>
// //               <div className="flex items-center text-sm gap-2">
// //                 <span>₹{userData.balance?.toFixed(2) || "0.00"}</span>
// //                 <TfiReload
// //                   onClick={getUserBalance}
// //                   className="text-yellow-400 cursor-pointer"
// //                   size={15}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //           <div
// //             className={`flex items-center px-2 py-1 rounded ${
// //               connected ? "bg-green-500" : "bg-red-500"
// //             }`}
// //           >
// //             {connected && <RiLiveFill className="mr-1" />}
// //             {connected ? "LIVE" : "OFFLINE"}
// //           </div>
// //         </div>

// //         {/* Tabs */}
// //         <div className="flex mb-4 bg-gray-800 rounded-lg p-1">
// //           <button
// //             onClick={() => setActiveTab("game")}
// //             className={`flex-1 py-2 rounded-md ${
// //               activeTab === "game" ? "bg-gray-700" : ""
// //             }`}
// //           >
// //             Game
// //           </button>
// //           <button
// //             onClick={() => setActiveTab("history")}
// //             className={`flex-1 py-2 rounded-md ${
// //               activeTab === "history" ? "bg-gray-700" : ""
// //             }`}
// //           >
// //             My Bets
// //           </button>
// //         </div>

// //         {activeTab === "game" ? (
// //           <>
// //             {/* Current Round */}
// //             <div className="mb-4 p-4 rounded-lg bg-gray-800">
// //               <div className="flex justify-between items-center mb-2">
// //                 <span className="text-gray-300">
// //                   Round #{roundId || "----"}
// //                 </span>
// //                 <p
// //                   className={`font-bold ${
// //                     timeLeft < 5 ? "text-red-400" : "text-yellow-400"
// //                   }`}
// //                 >
// //                   {timeLeft}s
// //                 </p>
// //               </div>
// //               <div className="text-center text-sm text-gray-300">{status}</div>
// //             </div>

// //             {/* Betting Controls */}
// //             <div className="mb-4">
// //               <label className="block mb-2 text-gray-300">Bet Amount (₹)</label>
// //               <div className="flex mb-2">
// //                 <input
// //                   type="text"
// //                   value={betAmount}
// //                   onChange={handleBetAmountChange}
// //                   className="w-full p-3 rounded-l bg-gray-700 focus:outline-none"
// //                   min="1"
// //                 />
// //                 <button
// //                   onClick={() => setBetAmount(Math.floor(userData.balance))}
// //                   className="bg-blue-600 px-4 rounded-r hover:bg-blue-500"
// //                 >
// //                   MAX
// //                 </button>
// //               </div>
// //               <div className="grid grid-cols-4 gap-2 mb-4">
// //                 {quickBets.map((amount) => (
// //                   <button
// //                     key={amount}
// //                     onClick={() => setBetAmount(amount)}
// //                     className={`p-2 rounded ${
// //                       betAmount === amount ? "bg-blue-600" : "bg-gray-700"
// //                     }`}
// //                   >
// //                     ₹{amount}
// //                   </button>
// //                 ))}
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <button
// //                   onClick={() => placeBet("up")}
// //                   disabled={
// //                     !connected ||
// //                     hasBet ||
// //                     userData.balance < betAmount ||
// //                     timeLeft < 5
// //                   }
// //                   className={`p-4 rounded-lg flex flex-col items-center ${
// //                     !connected ||
// //                     hasBet ||
// //                     userData.balance < betAmount ||
// //                     timeLeft < 5
// //                       ? "bg-gray-600 cursor-not-allowed"
// //                       : "bg-green-600 hover:bg-green-500"
// //                   }`}
// //                 >
// //                   <FaChevronUp size={24} />
// //                   <span>BET UP</span>
// //                 </button>
// //                 <button
// //                   onClick={() => placeBet("down")}
// //                   disabled={
// //                     !connected ||
// //                     hasBet ||
// //                     userData.balance < betAmount ||
// //                     timeLeft < 5
// //                   }
// //                   className={`p-4 rounded-lg flex flex-col items-center ${
// //                     !connected ||
// //                     hasBet ||
// //                     userData.balance < betAmount ||
// //                     timeLeft < 5
// //                       ? "bg-gray-600 cursor-not-allowed"
// //                       : "bg-red-600 hover:bg-red-500"
// //                   }`}
// //                 >
// //                   <FaChevronDown size={24} />
// //                   <span>BET DOWN</span>
// //                 </button>
// //               </div>
// //             </div>

// //             {/* History Section */}
// //             <div className="mb-4 bg-gray-800 rounded-lg overflow-hidden">
// //               <div className="p-3 bg-gray-800">
// //                 <h2 className="text-lg font-semibold">Recent Rounds</h2>
// //               </div>
// //               <div className="p-4">
// //                 {history.length > 0 ? (
// //                   <div className="flex overflow-x-auto pb-2">
// //                     {history.map((item, i) => (
// //                       <Candlestick key={i} item={item} />
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p className="text-center text-gray-400 py-4">
// //                     No history yet
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="mb-4 bg-gray-800 rounded-lg overflow-hidden">
// //             <div className="p-3 bg-gray-800">
// //               <h2 className="text-lg font-semibold">My Bet History</h2>
// //             </div>
// //             <div className="p-4">
// //               {userHistory.length > 0 ? (
// //                 <div>
// //                   {userHistory.map((bet, i) => (
// //                     <BetHistoryItem
// //                       key={i}
// //                       bet={{
// //                         roundId: bet._id, // Map _id to roundId
// //                         choice: bet.choice as "up" | "down",
// //                         amount: bet.amount,
// //                         result: bet.result as "win" | "lose" | "pending",
// //                         payout: bet.payout,
// //                         createdAt: bet.createdAt,
// //                       }}
// //                     />
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <p className="text-center text-gray-400 py-4">
// //                   No bets placed yet
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default ForexTradingApp;








// import { useState, useEffect, useCallback, useRef } from "react";
// import { FaCoins, FaChevronUp, FaChevronDown, FaHistory } from "react-icons/fa";
// import { RiLiveFill, RiExchangeDollarLine } from "react-icons/ri";
// // import { GiCash, CgArrowsExchangeV } from "react-icons/all";
// import { GiCash } from "react-icons/gi";
// import { CgArrowsExchangeV } from "react-icons/cg";

// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../../features/userSlice";
// import { WebSocket_URL } from "../../../Services/axiosInstance";
// import { io, Socket } from "socket.io-client";
// import Navbar from "../../Navbar";
// import { userService } from "../../../Services/userService";
// import { TfiReload } from "react-icons/tfi";
// import { Howl } from "howler";
// import countdownSound from "../../../assets/music/count.mp3";

// // Duration of each round in milliseconds
// const ROUND_DURATION = 30000;

// // Define types for your socket events
// type SocketEvents = {
//   risefall_gameState: (data: {
//     currentRound: {
//       roundId: string;
//       startedAt: string;
//       timeLeft: number;
//       serverTime?: number;
//     };
//     history: RoundHistory[];
//   }) => void;
//   risefall_newRound: (data: {
//     roundId: string;
//     startedAt: string;
//     history: RoundHistory[];
//     serverTime?: number;
//   }) => void;
//   risefall_roundOutcome: (data: {
//     result: "win" | "lose";
//     amount: number;
//     message: string;
//     choice: string;
//   }) => void;
//   risefall_betPlaced: (data: { amount: number; choice: "up" | "down" }) => void;
//   risefall_balanceUpdate: (data: { balance: number }) => void;
//   risefall_error: (message: string) => void;
//   risefall_userBets: (data: UserBet[]) => void;
// };

// type RoundHistory = {
//   roundId: string;
//   result: "up" | "down";
//   totals: { up: number; down: number };
//   endedAt: string;
// };

// type UserBet = {
//   roundId: string;
//   choice: "up" | "down";
//   amount: number;
//   result: "win" | "lose" | "pending";
//   payout: number;
//   createdAt: string;
// };

// const ForexTradingApp = () => {
//   const [sound] = useState(
//     () =>
//       new Howl({
//         src: [countdownSound],
//         volume: 0.5,
//       })
//   );

//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const serverTimeOffsetRef = useRef(0);
//   const endTimeRef = useRef(0);
//   const dispatch = useDispatch();
//   const user = useSelector((state: any) => state.user);
//   const [userData, setUserData] = useState(user);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [connected, setConnected] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [betAmount, setBetAmount] = useState(10);
//   const [roundId, setRoundId] = useState("");
//   const [history, setHistory] = useState<RoundHistory[]>([]);
//   const [hasBet, setHasBet] = useState(false);
//   const [status, setStatus] = useState("Connecting...");
//   const [activeTab, setActiveTab] = useState("game");
//   const [userHistory, setUserHistory] = useState<any[]>([]);
//   const placedBetRef = useRef<any>(null);
//   // const [placedBet, setPlacedBet] = useState<{
//   //   roundId: string;
//   //   choice: "up" | "down";
//   //   amount: number;
//   // } | null>(null);
//   const [showHistory, setShowHistory] = useState(false);

//   // Clean up on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   const startTimer = useCallback((startedAt: string, serverTime?: number) => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     if (serverTime) {
//       const now = Date.now();
//       serverTimeOffsetRef.current = serverTime - now;
//     }

//     const serverStartTime = new Date(startedAt).getTime();
//     endTimeRef.current = serverStartTime + ROUND_DURATION;

//     const updateTimeLeft = () => {
//       const now = Date.now() + serverTimeOffsetRef.current;
//       const left = Math.max(0, endTimeRef.current - now);
//       setTimeLeft(Math.floor(left / 1000));

//       if (left <= 0) {
//         if (timerRef.current) {
//           clearInterval(timerRef.current);
//           timerRef.current = null;
//         }
//       }
//     };

//     updateTimeLeft();
//     timerRef.current = setInterval(updateTimeLeft, 100);

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const newSocket = io(WebSocket_URL);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const fetchUserHistory = async () => {
//     try {
//       const token = userData.token;
//       if (!token) {
//         toast.error("Token not found");
//       }
//       const response = await userService.getUserBetHistoryByGameTyp(
//         token,
//         "ForexTree"
//       );
//       setUserHistory(response.data);
//     } catch (error) {
//       toast.error("Failed to load history");
//     }
//   };

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

//   useEffect(() => {
//     if (userData?._id) {
//       fetchUserHistory();
//     }
//   }, [userData?._id]);

//   useEffect(() => {
//     if (!socket || !user?._id) return;

//     const onGameState: SocketEvents["risefall_gameState"] = (data) => {
//       setRoundId(data.currentRound.roundId);
//       startTimer(data.currentRound.startedAt, data.currentRound.serverTime);
//       setHistory(data.history || []);
//       setConnected(true);
//       setStatus("Place your bet!");
//     };

//     const onNewRound: SocketEvents["risefall_newRound"] = (data) => {
//       setRoundId(data.roundId);
//       startTimer(data.startedAt, data.serverTime);
//       setHasBet(false);
//       setStatus("New round started! Place your bet!");
//       setHistory(data.history || []);
//     };

//     const onRoundOutcome: SocketEvents["risefall_roundOutcome"] = ({
//       result,
//       amount,
//       message,
//       choice,
//     }) => {
//       setStatus(message);
//       toast[result === "win" ? "success" : "error"](message);

//       if (result === "win") {
//         setUserData((prev: { balance: number }) => ({
//           ...prev,
//           balance: prev.balance + amount,
//         }));
//         dispatch(
//           setUser({
//             ...userData,
//             balance: userData.balance + amount,
//           })
//         );

//         setUserHistory((prev) => [
//           {
//             _id: `${Date.now()}`,
//             choice,
//             amount,
//             result,
//             payout: result === "win" ? amount : 0,
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

//       if (!placedBetRef.current) {
//         return;
//       }

//       // setPlacedBet(null);
//     };

//     const onBetPlaced: SocketEvents["risefall_betPlaced"] = ({
//       amount,
//       choice,
//     }) => {
//       setHasBet(true);
//       setStatus(`Bet placed: ₹${amount} on ${choice}`);
//     };

//     const onBalanceUpdate: SocketEvents["risefall_balanceUpdate"] = ({
//       balance,
//     }) => {
//       setUserData((prev: any) => ({ ...prev, balance }));
//       dispatch(setUser({ ...userData, balance }));
//     };

//     const onError: SocketEvents["risefall_error"] = (message) => {
//       console.log("error msg is ", message);
//     };

//     socket.on("risefall_gameState", onGameState);
//     socket.on("risefall_newRound", onNewRound);
//     socket.on("risefall_roundOutcome", onRoundOutcome);
//     socket.on("risefall_betPlaced", onBetPlaced);
//     socket.on("risefall_balanceUpdate", onBalanceUpdate);
//     socket.on("risefall_error", onError);

//     socket.emit("risefall_registerUser", "updownGame");

//     return () => {
//       if (socket) {
//         socket.off("risefall_gameState", onGameState);
//         socket.off("risefall_newRound", onNewRound);
//         socket.off("risefall_roundOutcome", onRoundOutcome);
//         socket.off("risefall_betPlaced", onBetPlaced);
//         socket.off("risefall_balanceUpdate", onBalanceUpdate);
//         socket.off("risefall_error", onError);
//       }
//     };
//   }, [socket, user?._id]);

//   const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
//       setBetAmount(value === "" ? 0 : Number(value));
//     }
//   };

//   const placeBet = useCallback(
//     (choice: "up" | "down") => {
//       if (!choice) return;
//       if (!socket || !userData?._id) return;
//       if (hasBet) return toast.error("You already bet this round");
//       if (betAmount < 1) return toast.error("Invalid bet amount");
//       if (userData.balance < betAmount)
//         return toast.error("Insufficient balance");

//       setHasBet(true);
//       // setPlacedBet({
//       //   roundId,
//       //   choice,
//       //   amount: betAmount,
//       // });
//       placedBetRef.current = {
//         roundId,
//         choice,
//         amount: betAmount,
//       };

//       socket.emit("placeBetForex", {
//         userId: userData._id,
//         roundId,
//         choice,
//         amount: betAmount,
//       });

//       setStatus(`Bet placed on "${choice.toUpperCase()}"`);
//       setBetAmount(10);
//     },
//     [socket, userData, betAmount, hasBet, roundId]
//   );

//   const quickBets = [10, 50, 100, 500];

//   const getUserBalance = async () => {
//     try {
//       if (!user?.token) return toast.error("Token not found");

//       const res = await userService.getUserBalance(user.token);
//       if (res?.success) {
//         setUserData((prev: any) => ({ ...prev, balance: res.data.balance }));
//         dispatch(
//           setUser({
//             ...user,
//             balance: res.data.balance,
//             token: user.token || "",
//           })
//         );
//       } else toast.error(res?.message || "Failed to fetch balance");
//     } catch (error) {
//       toast.error("Error fetching balance");
//     }
//   };

//   const Candlestick = ({ item }: { item: RoundHistory }) => {
//     const total = item.totals.up + item.totals.down;
//     const upPercent = total > 0 ? (item.totals.up / total) * 100 : 50;

//     return (
//       <div className="flex flex-col items-center mx-1">
//         <div className="relative h-24 w-6">
//           <div
//             className={`absolute left-1/2 w-0.5 h-full ${
//               item.result === "up" ? "bg-green-500" : "bg-red-500"
//             }`}
//           ></div>
//           <div
//             className="absolute bottom-0 w-full"
//             style={{ height: `${100 - upPercent}%` }}
//           >
//             <div
//               className={`w-full h-full ${
//                 item.result === "up" ? "bg-green-300" : "bg-red-300"
//               }`}
//             ></div>
//           </div>
//           <div
//             className="absolute top-0 w-full"
//             style={{ height: `${upPercent}%` }}
//           >
//             <div
//               className={`w-full h-full ${
//                 item.result === "up" ? "bg-green-500" : "bg-red-500"
//               }`}
//             ></div>
//           </div>
//         </div>
//         <div
//           className={`text-xs mt-1 font-bold ${
//             item.result === "up" ? "text-green-400" : "text-red-400"
//           }`}
//         >
//           {item.result.toUpperCase()}
//         </div>
//       </div>
//     );
//   };

//   const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
//     const date = new Date(bet.createdAt).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     const shortRoundId =
//       bet.roundId.length > 6
//         ? `${bet.roundId.slice(0, 2)}${bet.roundId.slice(-4)}`
//         : bet.roundId;

//     const isWin = bet.result === "win";
//     const isPending = bet.result === "pending";

//     return (
//       <div
//         className={`p-3 mb-2 rounded-lg ${
//           isPending
//             ? "bg-gray-800/50 border border-gray-700"
//             : isWin
//             ? "bg-green-900/20 border border-green-800"
//             : "bg-red-900/20 border border-red-800"
//         }`}
//       >
//         <div className="flex justify-between items-center flex-wrap gap-2">
//           <div className="flex items-center">
//             <span className="font-semibold text-sm sm:text-base">
//               Round #{shortRoundId}
//             </span>
//             <span className="text-xs ml-2 text-gray-400 hidden xs:inline">
//               {date}
//             </span>
//           </div>
//           <div
//             className={`font-bold text-sm sm:text-base ${
//               isPending
//                 ? "text-gray-400"
//                 : isWin
//                 ? "text-green-400"
//                 : "text-red-400"
//             }`}
//           >
//             {isPending
//               ? "Pending"
//               : isWin
//               ? `+₹${bet.payout.toFixed(2)}`
//               : `-₹${bet.amount.toFixed(2)}`}
//           </div>
//         </div>

//         <div className="xs:hidden text-xs text-gray-400 mt-1">{date}</div>

//         <div className="flex justify-between mt-1 text-xs sm:text-sm">
//           <div
//             className={`flex items-center ${
//               bet.choice === "up" ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {bet.choice === "up" ? (
//               <FaChevronUp className="mr-1" size={12} />
//             ) : (
//               <FaChevronDown className="mr-1" size={12} />
//             )}
//             {bet.choice.toUpperCase()}
//           </div>
//           <div className="flex items-center text-yellow-400">
//             <FaCoins className="mr-1" size={12} />₹{bet.amount.toFixed(2)}
//           </div>
//         </div>
//         {isPending && (
//           <div className="text-xs text-center mt-2 text-gray-300">
//             Waiting for result...
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen pt-24">
//         {/* User Profile */}
//         <div className="flex justify-between items-center mb-6 p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-lg">
//           <div className="flex items-center">
//             <div className="relative">
//               <img
//                 src={userData.profilePic || "/default-avatar.png"}
//                 alt="Profile"
//                 className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500 shadow-md"
//               />
//               {/* <div
//                 className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-800 ${
//                   connected ? "bg-green-500" : "bg-red-500"
//                 }`}
//               ></div> */}
//             </div>
//             <div>
//               <div className="font-bold text-lg">{userData.username}</div>
//               <div className="flex items-center text-sm gap-2">
//                 <span className="flex items-center text-yellow-400">
//                   <GiCash className="mr-1" />
//                   ₹{userData.balance?.toFixed(2) || "0.00"}
//                 </span>
//                 <TfiReload
//                   onClick={getUserBalance}
//                   className="text-blue-400 cursor-pointer hover:text-blue-300 transition"
//                   size={15}
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//               connected
//                 ? "bg-green-900/50 text-green-400"
//                 : "bg-red-900/50 text-red-400"
//             }`}
//           >
//             {connected && <RiLiveFill className="mr-1.5" />}
//             {connected ? "LIVE" : "OFFLINE"}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex mb-6 bg-gray-800/80 rounded-xl p-1 border border-gray-700">
//           <button
//             onClick={() => setActiveTab("game")}
//             className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition ${
//               activeTab === "game"
//                 ? "bg-blue-600/80 shadow-md"
//                 : "hover:bg-gray-700/50"
//             }`}
//           >
//             <CgArrowsExchangeV />
//             Trade
//           </button>
//           <button
//             onClick={() => setActiveTab("history")}
//             className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition ${
//               activeTab === "history"
//                 ? "bg-blue-600/80 shadow-md"
//                 : "hover:bg-gray-700/50"
//             }`}
//           >
//             <FaHistory />
//             History
//           </button>
//         </div>

//         {activeTab === "game" ? (
//           <>
//             {/* Current Round */}
//             <div className="mb-6 p-4 rounded-xl bg-gray-800/80 border border-gray-700 shadow-md">
//               <div className="flex justify-between items-center mb-3">
//                 <span className="text-gray-300 font-medium">
//                   Round #{roundId || "----"}
//                 </span>
//                 <div
//                   className={`px-3 py-1 rounded-full font-bold ${
//                     timeLeft < 5
//                       ? "bg-red-900/50 text-red-400 animate-pulse"
//                       : "bg-yellow-900/50 text-yellow-400"
//                   }`}
//                 >
//                   {timeLeft}s
//                 </div>
//               </div>
//               <div className="text-center text-sm text-gray-300 px-2 py-1 bg-gray-700/50 rounded-lg">
//                 {status}
//               </div>
//             </div>

//             {/* Betting Controls */}
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-3">
//                 <label className="block text-gray-300 font-medium">
//                   Bet Amount (₹)
//                 </label>
//                 <button
//                   onClick={() => setBetAmount(Math.floor(userData.balance))}
//                   className="text-xs bg-blue-600/50 hover:bg-blue-600 px-2 py-1 rounded"
//                 >
//                   Use Max Balance
//                 </button>
//               </div>
//               <div className="flex mb-4">
//                 <input
//                   type="text"
//                   value={betAmount}
//                   onChange={handleBetAmountChange}
//                   className="w-full p-4 rounded-l-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
//                   min="1"
//                 />
//                 <button
//                   onClick={() => setBetAmount(Math.floor(userData.balance))}
//                   className="bg-blue-600 hover:bg-blue-500 px-4 rounded-r-xl border border-blue-500 transition"
//                 >
//                   MAX
//                 </button>
//               </div>
//               <div className="grid grid-cols-4 gap-3 mb-6">
//                 {quickBets.map((amount) => (
//                   <button
//                     key={amount}
//                     onClick={() => setBetAmount(amount)}
//                     className={`p-3 rounded-lg transition ${
//                       betAmount === amount
//                         ? "bg-blue-600 shadow-md"
//                         : "bg-gray-700 hover:bg-gray-600"
//                     }`}
//                   >
//                     ₹{amount}
//                   </button>
//                 ))}
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <button
//                   onClick={() => placeBet("up")}
//                   disabled={
//                     !connected ||
//                     hasBet ||
//                     userData.balance < betAmount ||
//                     timeLeft < 5
//                   }
//                   className={`p-5 rounded-xl flex flex-col items-center transition-all ${
//                     !connected ||
//                     hasBet ||
//                     userData.balance < betAmount ||
//                     timeLeft < 5
//                       ? "bg-gray-700 cursor-not-allowed opacity-70"
//                       : "bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg hover:shadow-green-500/20"
//                   }`}
//                 >
//                   <FaChevronUp size={28} className="mb-2" />
//                   <span className="font-bold">BET UP</span>
//                   <span className="text-xs mt-1 opacity-80">
//                     {betAmount > 0 ? `₹${betAmount}` : "Enter amount"}
//                   </span>
//                 </button>
//                 <button
//                   onClick={() => placeBet("down")}
//                   disabled={
//                     !connected ||
//                     hasBet ||
//                     userData.balance < betAmount ||
//                     timeLeft < 5
//                   }
//                   className={`p-5 rounded-xl flex flex-col items-center transition-all ${
//                     !connected ||
//                     hasBet ||
//                     userData.balance < betAmount ||
//                     timeLeft < 5
//                       ? "bg-gray-700 cursor-not-allowed opacity-70"
//                       : "bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-lg hover:shadow-red-500/20"
//                   }`}
//                 >
//                   <FaChevronDown size={28} className="mb-2" />
//                   <span className="font-bold">BET DOWN</span>
//                   <span className="text-xs mt-1 opacity-80">
//                     {betAmount > 0 ? `₹${betAmount}` : "Enter amount"}
//                   </span>
//                 </button>
//               </div>

//               {/* History Section */}
//               <div
//                 className={`bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 ${
//                   showHistory ? "max-h-[500px]" : "max-h-[60px]"
//                 }`}
//               >
//                 <div
//                   className="p-4 flex justify-between items-center cursor-pointer"
//                   onClick={() => setShowHistory(!showHistory)}
//                 >
//                   <h2 className="text-lg font-semibold flex items-center gap-2">
//                     <RiExchangeDollarLine />
//                     Market Trends
//                   </h2>
//                   <div className="text-sm text-gray-400">
//                     {showHistory ? "Hide" : "Show"}
//                   </div>
//                 </div>
//                 <div className="p-4 border-t border-gray-700">
//                   {history.length > 0 ? (
//                     <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//                       {history.map((item, i) => (
//                         <Candlestick key={i} item={item} />
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-center text-gray-400 py-4">
//                       No history yet
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
//             <div className="p-4 bg-gray-800/50 border-b border-gray-700">
//               <h2 className="text-lg font-semibold flex items-center gap-2">
//                 <FaHistory />
//                 My Bet History
//               </h2>
//             </div>
//             <div className="p-4">
//               {userHistory.length > 0 ? (
//                 <div className="space-y-3">
//                   {userHistory.map((bet, i) => (
//                     <BetHistoryItem
//                       key={i}
//                       bet={{
//                         roundId: bet._id,
//                         choice: bet.choice as "up" | "down",
//                         amount: bet.amount,
//                         result: bet.result as "win" | "lose" | "pending",
//                         payout: bet.payout,
//                         createdAt: bet.createdAt,
//                       }}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <div className="text-gray-400 mb-2">
//                     No bets placed yet
//                   </div>
//                   <button
//                     onClick={() => setActiveTab("game")}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
//                   >
//                     Place Your First Bet
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ForexTradingApp;
















import { useState, useEffect, useCallback, useRef } from "react";
import { FaCoins, FaChevronUp, FaChevronDown, FaHistory } from "react-icons/fa";
import { RiLiveFill, RiExchangeDollarLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import { CgArrowsExchangeV } from "react-icons/cg";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { WebSocket_URL } from "../../../Services/axiosInstance";
import { io, Socket } from "socket.io-client";
import Navbar from "../../Navbar";
import { userService } from "../../../Services/userService";
import { TfiReload } from "react-icons/tfi";
import { Howl } from "howler";
import countdownSound from "../../../assets/music/count.mp3";
import { motion, AnimatePresence } from "framer-motion";

// Duration of each round in milliseconds
const ROUND_DURATION = 30000;

// Define types for your socket events
type SocketEvents = {
  risefall_gameState: (data: {
    currentRound: {
      roundId: string;
      startedAt: string;
      timeLeft: number;
      serverTime?: number;
    };
    history: RoundHistory[];
  }) => void;
  risefall_newRound: (data: {
    roundId: string;
    startedAt: string;
    history: RoundHistory[];
    serverTime?: number;
  }) => void;
  risefall_roundOutcome: (data: {
    result: "win" | "lose";
    amount: number;
    message: string;
    choice: string;
  }) => void;
  risefall_betPlaced: (data: { amount: number; choice: "up" | "down" }) => void;
  risefall_balanceUpdate: (data: { balance: number }) => void;
  risefall_error: (message: string) => void;
  risefall_userBets: (data: UserBet[]) => void;
};

type RoundHistory = {
  roundId: string;
  result: "up" | "down";
  totals: { up: number; down: number };
  endedAt: string;
};

type UserBet = {
  roundId: string;
  choice: "up" | "down";
  amount: number;
  result: "win" | "lose" | "pending";
  payout: number;
  createdAt: string;
};

const ForexTradingApp = () => {
  const [sound] = useState(
    () =>
      new Howl({
        src: [countdownSound],
        volume: 0.5,
      })
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const serverTimeOffsetRef = useRef(0);
  const endTimeRef = useRef(0);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState(user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [betAmount, setBetAmount] = useState(10);
  const [roundId, setRoundId] = useState("");
  const [history, setHistory] = useState<RoundHistory[]>([]);
  const [hasBet, setHasBet] = useState(false);
  const [status, setStatus] = useState("Connecting...");
  const [activeTab, setActiveTab] = useState("game");
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const placedBetRef = useRef<any>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [lastResult, setLastResult] = useState<{
    result: "up" | "down" | null;
    visible: boolean;
  }>({ result: null, visible: false });

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = useCallback((startedAt: string, serverTime?: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (serverTime) {
      const now = Date.now();
      serverTimeOffsetRef.current = serverTime - now;
    }

    const serverStartTime = new Date(startedAt).getTime();
    endTimeRef.current = serverStartTime + ROUND_DURATION;

    const updateTimeLeft = () => {
      const now = Date.now() + serverTimeOffsetRef.current;
      const left = Math.max(0, endTimeRef.current - now);
      setTimeLeft(Math.floor(left / 1000));

      if (left <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    updateTimeLeft();
    timerRef.current = setInterval(updateTimeLeft, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const newSocket = io(WebSocket_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchUserHistory = async () => {
    try {
      const token = userData.token;
      if (!token) {
        toast.error("Token not found");
      }
      const response = await userService.getUserBetHistoryByGameTyp(
        token,
        "ForexTree"
      );
      setUserHistory(response.data);
    } catch (error) {
      toast.error("Failed to load history");
    }
  };

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

  useEffect(() => {
    if (userData?._id) {
      fetchUserHistory();
    }
  }, [userData?._id]);

  useEffect(() => {
    if (!socket || !user?._id) return;

    const onGameState: SocketEvents["risefall_gameState"] = (data) => {
      setRoundId(data.currentRound.roundId);
      startTimer(data.currentRound.startedAt, data.currentRound.serverTime);
      setHistory(data.history || []);
      setConnected(true);
      setStatus("Place your bet!");
    };

    const onNewRound: SocketEvents["risefall_newRound"] = (data) => {
      setRoundId(data.roundId);
      startTimer(data.startedAt, data.serverTime);
      setHasBet(false);
      setStatus("New round started! Place your bet!");
      setHistory(data.history || []);
    };

    const onRoundOutcome: SocketEvents["risefall_roundOutcome"] = ({
      result,
      amount,
      message,
      choice,
    }) => {
      setStatus(message);
      toast[result === "win" ? "success" : "error"](message);

      // Show the result animation
      setLastResult({ result: choice as "up" | "down", visible: true });
      setTimeout(() => setLastResult(prev => ({ ...prev, visible: false })), 3000);

      if (result === "win") {
        setUserData((prev: { balance: number }) => ({
          ...prev,
          balance: prev.balance + amount,
        }));
        dispatch(
          setUser({
            ...userData,
            balance: userData.balance + amount,
          })
        );

        setUserHistory((prev) => [
          {
            _id: `${Date.now()}`,
            choice,
            amount,
            result,
            payout: result === "win" ? amount : 0,
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

      if (!placedBetRef.current) {
        return;
      }
    };

    const onBetPlaced: SocketEvents["risefall_betPlaced"] = ({
      amount,
      choice,
    }) => {
      setHasBet(true);
      setStatus(`Bet placed: ₹${amount} on ${choice}`);
    };

    const onBalanceUpdate: SocketEvents["risefall_balanceUpdate"] = ({
      balance,
    }) => {
      setUserData((prev: any) => ({ ...prev, balance }));
      dispatch(setUser({ ...userData, balance }));
    };

    const onError: SocketEvents["risefall_error"] = (message) => {
      console.log("error msg is ", message);
    };

    socket.on("risefall_gameState", onGameState);
    socket.on("risefall_newRound", onNewRound);
    socket.on("risefall_roundOutcome", onRoundOutcome);
    socket.on("risefall_betPlaced", onBetPlaced);
    socket.on("risefall_balanceUpdate", onBalanceUpdate);
    socket.on("risefall_error", onError);

    socket.emit("risefall_registerUser", "updownGame");

    return () => {
      if (socket) {
        socket.off("risefall_gameState", onGameState);
        socket.off("risefall_newRound", onNewRound);
        socket.off("risefall_roundOutcome", onRoundOutcome);
        socket.off("risefall_betPlaced", onBetPlaced);
        socket.off("risefall_balanceUpdate", onBalanceUpdate);
        socket.off("risefall_error", onError);
      }
    };
  }, [socket, user?._id]);

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setBetAmount(value === "" ? 0 : Number(value));
    }
  };

  const placeBet = useCallback(
    (choice: "up" | "down") => {
      if (!choice) return;
      if (!socket || !userData?._id) return;
      if (hasBet) return toast.error("You already bet this round");
      if (betAmount < 1) return toast.error("Invalid bet amount");
      if (userData.balance < betAmount)
        return toast.error("Insufficient balance");

      setHasBet(true);
      placedBetRef.current = {
        roundId,
        choice,
        amount: betAmount,
      };

      socket.emit("placeBetForex", {
        userId: userData._id,
        roundId,
        choice,
        amount: betAmount,
      });

      setStatus(`Bet placed on "${choice.toUpperCase()}"`);
      setBetAmount(10);
    },
    [socket, userData, betAmount, hasBet, roundId]
  );

  const quickBets = [10, 50, 100, 500];

  const getUserBalance = async () => {
    try {
      if (!user?.token) return toast.error("Token not found");

      const res = await userService.getUserBalance(user.token);
      if (res?.success) {
        setUserData((prev: any) => ({ ...prev, balance: res.data.balance }));
        dispatch(
          setUser({
            ...user,
            balance: res.data.balance,
            token: user.token || "",
          })
        );
      } else toast.error(res?.message || "Failed to fetch balance");
    } catch (error) {
      toast.error("Error fetching balance");
    }
  };

  const Candlestick = ({ item }: { item: RoundHistory }) => {
    const total = item.totals.up + item.totals.down;
    const upPercent = total > 0 ? (item.totals.up / total) * 100 : 50;

    return (
      <div className="flex flex-col items-center mx-1">
        <div className="relative h-24 w-6">
          <div
            className={`absolute left-1/2 w-0.5 h-full ${item.result === "up" ? "bg-green-500" : "bg-red-500"
              }`}
          ></div>
          <div
            className="absolute bottom-0 w-full"
            style={{ height: `${100 - upPercent}%` }}
          >
            <div
              className={`w-full h-full ${item.result === "up" ? "bg-green-300" : "bg-red-300"
                }`}
            ></div>
          </div>
          <div
            className="absolute top-0 w-full"
            style={{ height: `${upPercent}%` }}
          >
            <div
              className={`w-full h-full ${item.result === "up" ? "bg-green-500" : "bg-red-500"
                }`}
            ></div>
          </div>
        </div>
        <div
          className={`text-xs mt-1 font-bold ${item.result === "up" ? "text-green-400" : "text-red-400"
            }`}
        >
          {item.result.toUpperCase()}
        </div>
      </div>
    );
  };

  const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
    const date = new Date(bet.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const shortRoundId =
      bet.roundId.length > 6
        ? `${bet.roundId.slice(0, 2)}${bet.roundId.slice(-4)}`
        : bet.roundId;

    const isWin = bet.result === "win";
    const isPending = bet.result === "pending";

    return (
      <div
        className={`p-3 mb-2 rounded-lg ${isPending
          ? "bg-gray-800/50 border border-gray-700"
          : isWin
            ? "bg-green-900/20 border border-green-800"
            : "bg-red-900/20 border border-red-800"
          }`}
      >
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center">
            <span className="font-semibold text-sm sm:text-base">
              Round #{shortRoundId}
            </span>
            <span className="text-xs ml-2 text-gray-400 hidden xs:inline">
              {date}
            </span>
          </div>
          <div
            className={`font-bold text-sm sm:text-base ${isPending
              ? "text-gray-400"
              : isWin
                ? "text-green-400"
                : "text-red-400"
              }`}
          >
            {isPending
              ? "Pending"
              : isWin
                ? `+₹${bet.payout.toFixed(2)}`
                : `-₹${bet.amount.toFixed(2)}`}
          </div>
        </div>

        <div className="xs:hidden text-xs text-gray-400 mt-1">{date}</div>

        <div className="flex justify-between mt-1 text-xs sm:text-sm">
          <div
            className={`flex items-center ${bet.choice === "up" ? "text-green-400" : "text-red-400"
              }`}
          >
            {bet.choice === "up" ? (
              <FaChevronUp className="mr-1" size={12} />
            ) : (
              <FaChevronDown className="mr-1" size={12} />
            )}
            {bet.choice.toUpperCase()}
          </div>
          <div className="flex items-center text-yellow-400">
            <FaCoins className="mr-1" size={12} />₹{bet.amount.toFixed(2)}
          </div>
        </div>
        {isPending && (
          <div className="text-xs text-center mt-2 text-gray-300">
            Waiting for result...
          </div>
        )}
      </div>
    );
  };

  const ResultDisplay = ({ result }: { result: "up" | "down" }) => {
    const isUp = result === "up";

    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none`}
      >
        <div className="relative">
          {/* Background burst */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute inset-0 rounded-full ${isUp ? "bg-green-500/20" : "bg-red-500/20"
              }`}
          />

          {/* Main circle */}
          <motion.div
            className={`flex flex-col items-center justify-center w-64 h-64 rounded-full shadow-2xl ${isUp
              ? "bg-gradient-to-br from-green-500 to-green-600"
              : "bg-gradient-to-br from-red-500 to-red-600"
              }`}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-6xl mb-4"
            >
              {isUp ? (
                <FaChevronUp size={80} />
              ) : (
                <FaChevronDown size={80} />
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white text-3xl font-bold uppercase tracking-wider"
            >
              {result}
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 px-6 py-2 rounded-full ${isUp ? "bg-green-700" : "bg-red-700"
                } text-white font-bold text-lg`}
            >
              {isUp ? "PRICE ROSE" : "PRICE FELL"}
            </motion.div>
          </motion.div>

          {/* Confetti particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className={`absolute w-4 h-4 rounded-full ${isUp ? "bg-green-300" : "bg-red-300"
                }`}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen mt-24">
        {/* Animated Result Display */}
        <AnimatePresence>
          {lastResult.visible && lastResult.result !== null && (
            <ResultDisplay result={lastResult.result} />
          )}
        </AnimatePresence>

        {/* User Profile */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={userData.profilePic || "/default-avatar.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500 shadow-md"
              />
            </div>
            <div>
              <div className="font-bold text-lg">{userData.username}</div>
              <div className="flex items-center text-sm gap-2">
                <span className="flex items-center text-yellow-400">
                  <GiCash className="mr-1" />
                  ₹{userData.balance?.toFixed(2) || "0.00"}
                </span>
                <TfiReload
                  onClick={getUserBalance}
                  className="text-blue-400 cursor-pointer hover:text-blue-300 transition"
                  size={15}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${connected
              ? "bg-green-900/50 text-green-400"
              : "bg-red-900/50 text-red-400"
              }`}
          >
            {connected && <RiLiveFill className="mr-1.5" />}
            {connected ? "LIVE" : "OFFLINE"}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-800/80 rounded-xl p-1 border border-gray-700">
          <button
            onClick={() => setActiveTab("game")}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition ${activeTab === "game"
              ? "bg-blue-600/80 shadow-md"
              : "hover:bg-gray-700/50"
              }`}
          >
            <CgArrowsExchangeV />
            Trade
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition ${activeTab === "history"
              ? "bg-blue-600/80 shadow-md"
              : "hover:bg-gray-700/50"
              }`}
          >
            <FaHistory />
            History
          </button>
        </div>

        {activeTab === "game" ? (
          <>
            {/* Current Round */}
            <div className="mb-6 p-4 rounded-xl bg-gray-800/80 border border-gray-700 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-300 font-medium">
                  Round #{roundId || "----"}
                </span>
                <div
                  className={`px-3 py-1 rounded-full font-bold ${timeLeft < 5
                    ? "bg-red-900/50 text-red-400 animate-pulse"
                    : "bg-yellow-900/50 text-yellow-400"
                    }`}
                >
                  {timeLeft}s
                </div>
              </div>
              <div className="text-center text-sm text-gray-300 px-2 py-1 bg-gray-700/50 rounded-lg">
                {status}
              </div>
            </div>

            {/* Betting Controls */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-300 font-medium">
                  Bet Amount (₹)
                </label>
                <button
                  onClick={() => setBetAmount(Math.floor(userData.balance))}
                  className="text-xs bg-blue-600/50 hover:bg-blue-600 px-2 py-1 rounded"
                >
                  Use Max Balance
                </button>
              </div>
              <div className="flex mb-4">
                <input
                  type="text"
                  value={betAmount}
                  onChange={handleBetAmountChange}
                  className="w-full p-4 rounded-l-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  min="1"
                />
                <button
                  onClick={() => setBetAmount(Math.floor(userData.balance))}
                  className="bg-blue-600 hover:bg-blue-500 px-4 rounded-r-xl border border-blue-500 transition"
                >
                  MAX
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {quickBets.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`p-3 rounded-lg transition ${betAmount === amount
                      ? "bg-blue-600 shadow-md"
                      : "bg-gray-700 hover:bg-gray-600"
                      }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => placeBet("up")}
                  disabled={
                    !connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                  }
                  className={`p-5 rounded-xl flex flex-col items-center transition-all ${!connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                    ? "bg-gray-700 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg hover:shadow-green-500/20"
                    }`}
                >
                  <FaChevronUp size={28} className="mb-2" />
                  <span className="font-bold">BET UP</span>
                  <span className="text-xs mt-1 opacity-80">
                    {betAmount > 0 ? `₹${betAmount}` : "Enter amount"}
                  </span>
                </button>
                <button
                  onClick={() => placeBet("down")}
                  disabled={
                    !connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                  }
                  className={`p-5 rounded-xl flex flex-col items-center transition-all ${!connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                    ? "bg-gray-700 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-lg hover:shadow-red-500/20"
                    }`}
                >
                  <FaChevronDown size={28} className="mb-2" />
                  <span className="font-bold">BET DOWN</span>
                  <span className="text-xs mt-1 opacity-80">
                    {betAmount > 0 ? `₹${betAmount}` : "Enter amount"}
                  </span>
                </button>
              </div>

              {/* History Section */}
              <div
                className={`bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 ${showHistory ? "max-h-[500px]" : "max-h-[60px]"
                  }`}
              >
                <div
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <RiExchangeDollarLine />
                    Market Trends
                  </h2>
                  <div className="text-sm text-gray-400">
                    {showHistory ? "Hide" : "Show"}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-700">
                  {history.length > 0 ? (
                    <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      {history.map((item, i) => (
                        <Candlestick key={i} item={item} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 py-4">
                      No history yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
            <div className="p-4 bg-gray-800/50 border-b border-gray-700">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FaHistory />
                My Bet History
              </h2>
            </div>
            <div className="p-4">
              {userHistory.length > 0 ? (
                <div className="space-y-3">
                  {userHistory.map((bet, i) => (
                    <BetHistoryItem
                      key={i}
                      bet={{
                        roundId: bet._id,
                        choice: bet.choice as "up" | "down",
                        amount: bet.amount,
                        result: bet.result as "win" | "lose" | "pending",
                        payout: bet.payout,
                        createdAt: bet.createdAt,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    No bets placed yet
                  </div>
                  <button
                    onClick={() => setActiveTab("game")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                  >
                    Place Your First Bet
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForexTradingApp;