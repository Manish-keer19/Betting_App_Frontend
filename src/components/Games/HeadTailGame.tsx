// // // // import { useEffect, useState } from "react";
// // // // import { useSelector } from "react-redux";
// // // // import io from "socket.io-client";

// // // // const socket = io("http://localhost:3000");

// // // // export default function HeadTailGame() {

// // // //   const userData = useSelector((state: any) => state.user);
// // // //   console.log("userdata ",userData);
// // // //   const [roundId, setRoundId] = useState("");
// // // //   const [choice, setChoice] = useState(null);
// // // //   const [timeLeft, setTimeLeft] = useState(60);
// // // //   const [status, setStatus] = useState("");

// // // //   useEffect(() => {
// // // //     socket.on("currentRound", ({ roundId, startedAt }) => {
// // // //       setRoundId(roundId);
// // // //       startTimer(startedAt);
// // // //     });

// // // //     socket.on("joinedRound", ({ roundId }) => {
// // // //       setStatus(`You joined Round ${roundId}`);
// // // //     });

// // // //     socket.on("roundResult", ({ roundId, result }) => {
// // // //       setStatus(`Round ${roundId} Winner: ${result}`);
// // // //       setChoice(null);
// // // //     });

// // // //     socket.on("newRound", ({ roundId, startedAt }) => {
// // // //       setRoundId(roundId);
// // // //       startTimer(startedAt);
// // // //     });

// // // //     return () => socket.disconnect();
// // // //   }, []);

// // // //   const startTimer = (startedAt:any) => {
// // // //     const end = new Date(startedAt).getTime() + 60000;
// // // //     const interval = setInterval(() => {
// // // //       const now = Date.now();
// // // //       const left = Math.max(0, Math.floor((end - now) / 1000));
// // // //       setTimeLeft(left);
// // // //       if (left === 0) clearInterval(interval);
// // // //     }, 1000);
// // // //   };

// // // //   const handleChoice = (c:any) => {
// // // //     setChoice(c);
// // // //     socket.emit("joinRound", {
// // // //       userId: socket.id,
// // // //       choice: c,
// // // //     });
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-dark text-green flex items-center justify-center text-center">

// // // //       <div>
// // // //         <h1 className="text-4xl font-bold mb-4">Head or Tail Game</h1>
// // // //         <p className="mb-2">Round: {roundId}</p>
// // // //         <p className="text-xl mb-4">Time Left: {timeLeft}s</p>
// // // //         <div className="flex justify-center gap-4 mb-4">
// // // //           <button
// // // //             onClick={() => handleChoice("head")}
// // // //             className={`px-6 py-2 bg-green text-dark rounded font-bold ${
// // // //               choice === "head" && "border-2 border-white"
// // // //             }`}
// // // //           >
// // // //             Head
// // // //           </button>
// // // //           <button
// // // //             onClick={() => handleChoice("tail")}
// // // //             className={`px-6 py-2 bg-green text-dark rounded font-bold ${
// // // //               choice === "tail" && "border-2 border-white"
// // // //             }`}
// // // //           >
// // // //             Tail
// // // //           </button>
// // // //         </div>
// // // //         <p>{status}</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useEffect, useState } from "react";
// // // import { useSelector } from "react-redux";
// // // import io from "socket.io-client";

// // // const socket = io("http://localhost:3000");

// // // export default function HeadTailGame() {
// // //   const userData = useSelector((state: any) => state.user); // Get user data from Redux store
// // //   console.log("userdata ", userData);

// // //   const [roundId, setRoundId] = useState("");
// // //   const [choice, setChoice] = useState(null);
// // //   const [timeLeft, setTimeLeft] = useState(60);
// // //   const [status, setStatus] = useState("");

// // //   useEffect(() => {
// // //     socket.on("currentRound", ({ roundId, startedAt }) => {
// // //       setRoundId(roundId);
// // //       startTimer(startedAt);
// // //     });

// // //     socket.on("joinedRound", ({ roundId }) => {
// // //       setStatus(`You joined Round ${roundId}`);
// // //     });

// // //     socket.on("roundResult", ({ roundId, result }) => {
// // //       setStatus(`Round ${roundId} Winner: ${result}`);
// // //       setChoice(null);
// // //     });

// // //     socket.on("newRound", ({ roundId, startedAt }) => {
// // //       setRoundId(roundId);
// // //       startTimer(startedAt);
// // //     });

// // //     return () => socket.disconnect();
// // //   }, []);

// // //   const startTimer = (startedAt: any) => {
// // //     const end = new Date(startedAt).getTime() + 60000;
// // //     const interval = setInterval(() => {
// // //       const now = Date.now();
// // //       const left = Math.max(0, Math.floor((end - now) / 1000));
// // //       setTimeLeft(left);
// // //       if (left === 0) clearInterval(interval);
// // //     }, 1000);
// // //   };

// // //   const handleChoice = (c: any) => {
// // //     setChoice(c);
// // //     socket.emit("joinRound", {
// // //       userId: socket.id,
// // //       choice: c,
// // //     });
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-dark text-green flex items-center justify-center text-center">
// // //       <div>
// // //         <h1 className="text-4xl font-bold mb-4">Head or Tail Game</h1>

// // //         {/* Display user data */}
// // //         <div className="mb-4">
// // //           <p className="text-lg font-semibold">Username: {userData.username}</p>
// // //           <p className="text-lg font-semibold">Email: {userData.email}</p>
// // //           <p className="text-lg font-semibold">Balance: ₹{userData.balance}</p>
// // //         </div>

// // //         <p className="mb-2">Round: {roundId}</p>
// // //         <p className="text-xl mb-4">Time Left: {timeLeft}s</p>

// // //         <div className="flex justify-center gap-4 mb-4">
// // //           <button
// // //             onClick={() => handleChoice("head")}
// // //             className={`px-6 py-2 bg-green text-dark rounded font-bold ${
// // //               choice === "head" && "border-2 border-white"
// // //             }`}
// // //           >
// // //             Head
// // //           </button>
// // //           <button
// // //             onClick={() => handleChoice("tail")}
// // //             className={`px-6 py-2 bg-green text-dark rounded font-bold ${
// // //               choice === "tail" && "border-2 border-white"
// // //             }`}
// // //           >
// // //             Tail
// // //           </button>
// // //         </div>
// // //         <p>{status}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import io from "socket.io-client";
// // import { useTheme } from "../../utils/ThemeContext";

// // import { TfiReload } from "react-icons/tfi";
// // import toast from "react-hot-toast";
// // import { userService } from "../../Services/userService";
// // import { setUser } from "../../features/userSlice";
// // import { useDispatch } from "react-redux";
// // const socket = io("http://localhost:3000");

// // export default function HeadTailGame() {
// //   const { theme } = useTheme();
// //   const isGreen = theme === "green";

// //   const dispatch = useDispatch();

// //   const userData = useSelector((state: any) => state.user);
// //   const [roundId, setRoundId] = useState("");
// //   const [choice, setChoice] = useState<"head" | "tail" | null>(null);
// //   const [betAmount, setBetAmount] = useState("");
// //   const [timeLeft, setTimeLeft] = useState(60);
// //   const [status, setStatus] = useState("");
// //   const [resultHistory, setResultHistory] = useState<
// //     Array<{
// //       roundId: string;
// //       result: string;
// //     }>
// //   >([]);

// //   const [user, setUserdata] = useState(userData);

// //   // Theme colors
// //   const bgColor = isGreen ? "bg-green-900" : "bg-gray-900";
// //   const textColor = isGreen ? "text-green-100" : "text-white";
// //   const buttonColor = isGreen
// //     ? "bg-green-700 hover:bg-green-600"
// //     : "bg-gray-700 hover:bg-gray-600";
// //   const borderColor = isGreen ? "border-green-500" : "border-gray-500";
// //   const activeChoiceStyle = isGreen
// //     ? "bg-green-600 border-green-300"
// //     : "bg-gray-600 border-gray-300";

// //   useEffect(() => {
// //     socket.on("currentRound", ({ roundId, startedAt }) => {
// //       setRoundId(roundId);
// //       startTimer(startedAt);
// //     });

// //     socket.on("joinedRound", ({ roundId }) => {
// //       setStatus(`You joined Round ${roundId}`);
// //     });

// //     socket.on("roundResult", ({ roundId, result }) => {
// //       setStatus(`Round ${roundId} Winner: ${result}`);
// //       setChoice(null);
// //       setBetAmount("");
// //       setResultHistory((prev) => [...prev, { roundId, result }].slice(-5));
// //     });

// //     socket.on("newRound", ({ roundId, startedAt }) => {
// //       setRoundId(roundId);
// //       startTimer(startedAt);
// //       setStatus("New round started! Place your bet!");
// //     });

// //     socket.on("betPlaced", ({ amount, choice }) => {
// //       setStatus(`Bet placed: ₹${amount} on ${choice}`);
// //     });

// //     socket.on("error", (message) => {
// //       setStatus(`Error: ${message}`);
// //     });

// //     return () => socket.disconnect();
// //   }, []);

// //   const startTimer = (startedAt: string) => {
// //     const end = new Date(startedAt).getTime() + 60000;
// //     const interval = setInterval(() => {
// //       const now = Date.now();
// //       const left = Math.max(0, Math.floor((end - now) / 1000));
// //       setTimeLeft(left);
// //       if (left === 0) clearInterval(interval);
// //     }, 1000);
// //   };

// //   const handleChoice = (c: "head" | "tail") => {
// //     setChoice(c);
// //   };

// //   const placeBet = () => {
// //     if (!choice) {
// //       setStatus("Please select Head or Tail first");
// //       return;
// //     }

// //     const amount = parseFloat(betAmount);
// //     if (isNaN(amount) || amount <= 0) {
// //       setStatus("Please enter a valid bet amount");
// //       return;
// //     }

// //     if (userData.balance < amount) {
// //       setStatus("Insufficient balance");
// //       return;
// //     }

// //     socket.emit("placeBet", {
// //       userId: userData._id,
// //       choice,
// //       amount,
// //       roundId,
// //     });
// //   };

// //   const getUserBalance = async () => {
// //     try {
// //       if (!user?.token) {
// //         toast.error("Token not found");
// //         return;
// //       }
// //       const res = await userService.getUserBalance(user.token);

// //       if (res?.success) {
// //         setUserdata((prevUser: any) => ({
// //           ...prevUser,
// //           balance: res.data.balance,
// //         }));
// //         dispatch(
// //           setUser({
// //             ...user,
// //             balance: res.data.balance,
// //             token: user.token || "",
// //           })
// //         );
// //         // toast.success("Balance fetched successfully!");
// //       } else {
// //         toast.error(res?.message || "Failed to fetch balance");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching deposits:", error);
// //       toast.error("Something went wrong while fetching balance");
// //     }
// //   };

// //   return (
// //     <div
// //       className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center p-4`}
// //     >
// //       <div
// //         className={`w-full max-w-2xl border ${borderColor} rounded-xl p-6 shadow-lg`}
// //       >
// //         <h1 className="text-3xl font-bold mb-6 text-center">
// //           Head or Tail Game
// //         </h1>

// //         {/* User Info */}
// //         <div
// //           className={`mb-6 p-4 rounded-lg   flex items-center justify-between ${
// //             isGreen ? "bg-green-800" : "bg-gray-800"
// //           }`}
// //         >
// //           <div className=" flex gap-5   items-center justify-center">
// //             <div className="relative w-16 h-16">
// //               <img
// //                 src={userData.profilePic || "/default-avatar.png"}
// //                 alt="User Avatar"
// //                 className="w-16 h-16 rounded-full border-2 border-white"
// //               />
// //             </div>
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <p className="text-lg font-semibold">
// //                   Username: {userData.username}
// //                 </p>
// //                 <p className="text-lg font-semibold">Email: {userData.email}</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="flex items-center justify-center gap-2">
// //             <div
// //               className={`text-2xl font-bold ${
// //                 isGreen ? "text-green-300" : "text-gray-300"
// //               }`}
// //             >
// //               ₹{userData.balance}
// //             </div>
// //             <TfiReload
// //               size={22}
// //               onClick={() => getUserBalance()}
// //               className="inline ml-2 text-white hover:text-black cursor-pointer transition-transform duration-200 hover:rotate-90 font-bold"
// //               title="Refresh Balance"
// //             />
// //           </div>
// //         </div>

// //         {/* Game Info */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //           <div
// //             className={`p-4 rounded-lg ${
// //               isGreen ? "bg-green-800" : "bg-gray-800"
// //             }`}
// //           >
// //             <p className="text-sm opacity-80">Current Round</p>
// //             <p className="text-xl font-bold">{roundId}</p>
// //           </div>
// //           <div
// //             className={`p-4 rounded-lg ${
// //               isGreen ? "bg-green-800" : "bg-gray-800"
// //             }`}
// //           >
// //             <p className="text-sm opacity-80">Time Left</p>
// //             <p className="text-xl font-bold">{timeLeft}s</p>
// //           </div>
// //           <div
// //             className={`p-4 rounded-lg ${
// //               isGreen ? "bg-green-800" : "bg-gray-800"
// //             }`}
// //           >
// //             <p className="text-sm opacity-80">Status</p>
// //             <p className="text-xl font-bold">{status || "Waiting..."}</p>
// //           </div>
// //         </div>

// //         {/* Betting Area */}
// //         <div
// //           className={`mb-6 p-4 rounded-lg ${
// //             isGreen ? "bg-green-800" : "bg-gray-800"
// //           }`}
// //         >
// //           <div className="flex flex-col md:flex-row gap-4 mb-4">
// //             <button
// //               onClick={() => handleChoice("head")}
// //               className={`flex-1 py-3 rounded-lg font-bold transition ${
// //                 choice === "head" ? activeChoiceStyle : buttonColor
// //               }`}
// //             >
// //               Head
// //             </button>
// //             <button
// //               onClick={() => handleChoice("tail")}
// //               className={`flex-1 py-3 rounded-lg font-bold transition ${
// //                 choice === "tail" ? activeChoiceStyle : buttonColor
// //               }`}
// //             >
// //               Tail
// //             </button>
// //           </div>

// //           <div className="flex flex-col md:flex-row gap-4">
// //             <input
// //               type="number"
// //               placeholder="Bet amount (₹)"
// //               value={betAmount}
// //               onChange={(e) => setBetAmount(e.target.value)}
// //               className={`flex-1 px-4 py-3 rounded-lg ${
// //                 isGreen
// //                   ? "bg-green-700 text-white placeholder-green-300"
// //                   : "bg-gray-700 text-white placeholder-gray-400"
// //               } focus:outline-none focus:ring-2 ${
// //                 isGreen ? "focus:ring-green-500" : "focus:ring-gray-500"
// //               }`}
// //             />
// //             <button
// //               onClick={placeBet}
// //               className={`px-6 py-3 rounded-lg font-bold ${buttonColor} transition`}
// //               disabled={!choice || !betAmount}
// //             >
// //               Place Bet
// //             </button>
// //           </div>
// //         </div>

// //         {/* Recent Results */}
// //         <div>
// //           <h2 className="text-xl font-bold mb-2">Recent Results</h2>
// //           <div className="flex gap-2">
// //             {resultHistory.length > 0 ? (
// //               resultHistory.map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className={`p-2 rounded ${
// //                     item.result === "head"
// //                       ? isGreen
// //                         ? "bg-green-700"
// //                         : "bg-blue-700"
// //                       : isGreen
// //                       ? "bg-green-600"
// //                       : "bg-gray-700"
// //                   }`}
// //                 >
// //                   <p className="text-xs">Round {item.roundId.slice(-4)}</p>
// //                   <p className="font-bold">{item.result.toUpperCase()}</p>
// //                 </div>
// //               ))
// //             ) : (
// //               <p>No results yet</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client";
// import { TfiReload } from "react-icons/tfi";
// import toast from "react-hot-toast";
// import { useTheme } from "../../utils/ThemeContext";
// import { userService } from "../../Services/userService";
// import { setUser } from "../../features/userSlice";

// const socket = io("http://localhost:3000");

// export default function HeadTailGame() {
//   const { theme } = useTheme();
//   const isGreen = theme === "green";

//   const dispatch = useDispatch();
//   const userData = useSelector((state: any) => state.user);

//   const [roundId, setRoundId] = useState("");
//   const [choice, setChoice] = useState<"head" | "tail" | null>(null);
//   const [betAmount, setBetAmount] = useState("");
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [status, setStatus] = useState("");
//   const [resultHistory, setResultHistory] = useState<
//     Array<{ roundId: string; result: string }>
//   >([]);
//   const [user, setUserdata] = useState(userData);

//   const colors = {
//     bg: isGreen ? "bg-green-950" : "bg-gray-900",
//     card: isGreen ? "bg-green-800" : "bg-gray-800",
//     text: isGreen ? "text-green-100" : "text-white",
//     button: isGreen
//       ? "bg-green-700 hover:bg-green-600"
//       : "bg-gray-700 hover:bg-gray-600",
//     border: isGreen ? "border-green-500" : "border-gray-500",
//     active: isGreen
//       ? "bg-green-600 border-green-300"
//       : "bg-[gold] border-gray-300",
//     highlight: isGreen ? "text-green-300" : "text-gray-300",
//   };

//   useEffect(() => {
//     socket.on("currentRound", ({ roundId, startedAt }) => {
//       setRoundId(roundId);
//       startTimer(startedAt);
//     });

//     socket.on("joinedRound", ({ roundId }) => {
//       setStatus(`You joined Round ${roundId}`);
//     });

//     socket.on("roundResult", ({ roundId, result }) => {
//       setStatus(`Round ${roundId} Winner: ${result}`);
//       setChoice(null);
//       setBetAmount("");
//       setResultHistory((prev) => [...prev, { roundId, result }].slice(-5));
//     });

//     socket.on("newRound", ({ roundId, startedAt }) => {
//       setRoundId(roundId);
//       startTimer(startedAt);
//       setStatus("New round started! Place your bet!");
//     });

//     socket.on("betPlaced", ({ amount, choice }) => {
//       setStatus(`Bet placed: ₹${amount} on ${choice}`);
//     });

//     socket.on("error", (message) => {
//       setStatus(`Error: ${message}`);
//     });

//     return () => socket.disconnect();
//   }, []);

//   const startTimer = (startedAt: string) => {
//     const end = new Date(startedAt).getTime() + 60000;
//     const interval = setInterval(() => {
//       const now = Date.now();
//       const left = Math.max(0, Math.floor((end - now) / 1000));
//       setTimeLeft(left);
//       if (left === 0) clearInterval(interval);
//     }, 1000);
//   };

//   const handleChoice = (c: "head" | "tail") => setChoice(c);

//   const placeBet = () => {
//     const amount = parseFloat(betAmount);
//     if (!choice) return setStatus("Select Head or Tail first");
//     if (isNaN(amount) || amount <= 0)
//       return setStatus("Enter valid bet amount");
//     if (userData.balance < amount) return setStatus("Insufficient balance");

//     setUserdata((prev: any) => ({
//       ...prev,
//       balance: prev.balance - amount,
//     }));

//     socket.emit("placeBet", {
//       userId: userData._id,
//       choice,
//       amount,
//       roundId,
//     });
//   };

//   const getUserBalance = async () => {
//     try {
//       if (!user?.token) return toast.error("Token not found");

//       const res = await userService.getUserBalance(user.token);
//       if (res?.success) {
//         setUserdata((prev) => ({ ...prev, balance: res.data.balance }));
//         dispatch(
//           setUser({
//             ...user,
//             balance: res.data.balance,
//             token: user.token || "",
//           })
//         );
//       } else toast.error(res?.message || "Failed to fetch balance");
//     } catch (error) {
//       console.error("Balance error:", error);
//       toast.error("Error fetching balance");
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen ${colors.bg} ${colors.text} p-4 flex justify-center items-center`}
//     >
//       <div
//         className={`w-full max-w-3xl p-6 rounded-xl shadow-2xl border ${colors.border}`}
//       >
//         <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
//           Head or Tail Game
//         </h1>

//         {/* User Info */}
//         <div
//           className={`flex justify-between items-center p-4 rounded-lg mb-6 ${colors.card}`}
//         >
//           <div className="flex items-center gap-4">
//             <img
//               src={userData.profilePic || "/default-avatar.png"}
//               className="w-14 h-14 rounded-full border-2 border-white"
//               alt="Avatar"
//             />
//             <div>
//               <p className="font-semibold">Username: {userData.username}</p>
//               <p className="text-sm opacity-80">Email: {userData.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <p className={`text-xl font-bold ${colors.highlight}`}>
//               ₹{userData.balance}
//             </p>
//             <TfiReload
//               title="Refresh Balance"
//               onClick={getUserBalance}
//               className="cursor-pointer hover:rotate-90 transition-transform duration-300"
//             />
//           </div>
//         </div>

//         {/* Round Info */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <InfoCard title="Round" value={roundId} cardColor={colors.card} />
//           <InfoCard
//             title="Time Left"
//             value={`${timeLeft}s`}
//             cardColor={colors.card}
//           />
//           <InfoCard
//             title="Status"
//             value={status || "Waiting..."}
//             cardColor={colors.card}
//           />
//         </div>

//         {/* Betting */}
//         <div className={`p-4 rounded-lg mb-6 ${colors.card}`}>
//           <div className="flex flex-col md:flex-row gap-4 mb-4">
//             <button
//               onClick={() => handleChoice("head")}
//               className={`flex-1 py-3 rounded-lg font-bold transition ${
//                 choice === "head" ? colors.active : colors.button
//               }`}
//             >
//               Head
//             </button>
//             <button
//               onClick={() => handleChoice("tail")}
//               className={`flex-1 py-3 rounded-lg font-bold transition ${
//                 choice === "tail" ? colors.active : colors.button
//               }`}
//             >
//               Tail
//             </button>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4">
//             <input
//               type="number"
//               placeholder="Bet Amount (₹)"
//               value={betAmount}
//               onChange={(e) => setBetAmount(e.target.value)}
//               className={`flex-1 px-4 py-3 rounded-lg ${
//                 isGreen
//                   ? "bg-green-700 text-white placeholder-green-300"
//                   : "bg-gray-700 text-white placeholder-gray-400"
//               } focus:outline-none focus:ring-2 ${
//                 isGreen ? "focus:ring-green-500" : "focus:ring-gray-500"
//               }`}
//             />
//             <button
//               onClick={placeBet}
//               className={`px-6 py-3 rounded-lg font-bold transition ${colors.button}`}
//               disabled={!choice || !betAmount}
//             >
//               Place Bet
//             </button>
//           </div>
//         </div>

//         {/* Result History */}
//         <div>
//           <h2 className="text-xl font-bold mb-2">Recent Results</h2>
//           <div className="flex gap-2 flex-wrap">
//             {resultHistory.length > 0 ? (
//               resultHistory.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 rounded-md w-20 text-center ${
//                     item.result === "head"
//                       ? isGreen
//                         ? "bg-green-700"
//                         : "bg-blue-700"
//                       : isGreen
//                       ? "bg-green-600"
//                       : "bg-gray-700"
//                   }`}
//                 >
//                   <p className="text-xs">#{item.roundId.slice(-4)}</p>
//                   <p className="font-bold">{item.result.toUpperCase()}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No results yet</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoCard({
//   title,
//   value,
//   cardColor,
// }: {
//   title: string;
//   value: string;
//   cardColor: string;
// }) {
//   return (
//     <div className={`p-4 rounded-lg ${cardColor}`}>
//       <p className="text-sm opacity-70">{title}</p>
//       <p className="text-xl font-bold">{value}</p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";
// import { useTheme } from "../../utils/ThemeContext";
import { userService } from "../../Services/userService";
import { setUser } from "../../features/userSlice";
import Navbar from "../Navbar";
import { WebSocket_URL } from "../../Services/axiosInstance";

// const socket = io("http://localhost:3000");

const socket = io(WebSocket_URL);

export default function HeadTailGame() {
  // const { theme } = useTheme();
  // const isGreen = theme === "green";

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  const [roundId, setRoundId] = useState("");
  const [choice, setChoice] = useState<"head" | "tail" | null>(null);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState(60);
  const [status, setStatus] = useState("");
  const [resultHistory, setResultHistory] = useState<
    Array<{ roundId: string; result: string }>
  >([]);
  const [user, setUserdata] = useState(userData);

  const colors = {
    bg: "bg-black",
    card: "bg-gray-900",
    text: "text-white",
    button: "bg-gray-800 hover:bg-gray-700",
    border: "border-gray-700",
    active: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black",
    highlight: "text-yellow-400",
    input: "bg-gray-800 text-white placeholder-gray-500",
  };

  useEffect(() => {
    socket.on("currentRound", ({ roundId, startedAt }) => {
      setRoundId(roundId);
      startTimer(startedAt);
    });

    socket.on("joinedRound", ({ roundId }) => {
      setStatus(`Joined Round ${roundId}`);
    });

    socket.on("roundResult", ({ roundId, result }) => {
      setStatus(`Round ${roundId} Winner: ${result}`);
      setChoice(null);
      setBetAmount(10);
      setResultHistory((prev) => [...prev, { roundId, result }].slice(-5));
    });

    socket.on("newRound", ({ roundId, startedAt }) => {
      setRoundId(roundId);
      startTimer(startedAt);
      setStatus("New round started! Place your bet!");
    });

    socket.on("betPlaced", ({ amount, choice }) => {
      setStatus(`Bet placed: ₹${amount} on ${choice}`);
    });

    socket.on("balanceUpdate", ({ balance }) => {
      setUserdata((prev: any) => ({
        ...prev,
        balance,
      }));
      dispatch(
        setUser({
          ...userData,
          balance,
        })
      );
    });

    socket.on("wonMessage", ({ message, amount }) => {
      setStatus(`You won: ₹${amount}`);
      console.log("🎉 Win Message Received:", message, amount);
      setUserdata((prev: any) => ({
        ...prev,
        balance: prev.balance + amount,
      }));
      dispatch(
        setUser({
          ...userData,
          balance: userData.balance,
        })
      );
    });

    socket.on("error", (message) => {
      setStatus(`Error: ${message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startTimer = (startedAt: string) => {
    const end = new Date(startedAt).getTime() + 60000;
    const interval = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.floor((end - now) / 1000));
      setTimeLeft(left);
      if (left === 0) clearInterval(interval);
    }, 1000);
  };

  const handleChoice = (c: "head" | "tail") => setChoice(c);

  const placeBet = () => {
    const amount = Number(betAmount);
    if (!choice) return setStatus("Select Head or Tail first");
    if (isNaN(amount) || amount <= 0)
      return setStatus("Enter valid bet amount");
    if (userData.balance < amount) return setStatus("Insufficient balance");

    setUserdata((prev: any) => ({
      ...prev,
      balance: prev.balance - amount,
    }));

    socket.emit("placeBet", {
      userId: userData._id,
      choice,
      amount,
      roundId,
    });

    setBetAmount(0); // Reset bet amount after placing the bet
  };

  const getUserBalance = async () => {
    try {
      if (!user?.token) return toast.error("Token not found");

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
      } else toast.error(res?.message || "Failed to fetch balance");
    } catch (error) {
      console.error("Balance error:", error);
      toast.error("Error fetching balance");
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-4 pt-[7vh]`}>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-yellow-400">HEAD OR TAIL</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {/* ₹{userData.balance.toFixed(2)} */}₹
                {typeof userData.balance === "number"
                  ? userData.balance.toFixed(2)
                  : "0.00"}
              </span>
              <TfiReload
                onClick={getUserBalance}
                className="text-yellow-400 cursor-pointer"
                size={18}
              />
            </div>
          </div>

          {/* User Profile */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${colors.card} mb-4`}
          >
            <img
              src={userData.profilePic || "/default-avatar.png"}
              className="w-10 h-10 rounded-full border border-yellow-400"
              alt="Avatar"
            />
            <div>
              <p className="font-medium">{userData.username}</p>
              <p className="text-xs text-gray-400">{userData.email}</p>
            </div>
          </div>

          {/* Game Info */}
          <div className={`p-4 rounded-lg ${colors.card} mb-4`}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-400">Round ID</p>
                <p className="font-medium text-sm truncate">
                  #{roundId.slice(0, 8)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Time Left</p>
                <p
                  className={`font-bold ${
                    timeLeft < 10 ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {timeLeft}s
                </p>
              </div>
            </div>

            <div className={`p-3 rounded ${colors.input} text-center`}>
              <p className="text-sm truncate">
                {status || "Waiting for round..."}
              </p>
            </div>
          </div>

          {/* Bet Selection */}
          <div className={`p-4 rounded-lg ${colors.card} mb-4`}>
            <h2 className="text-lg font-bold mb-3">CHOOSE YOUR BET</h2>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleChoice("head")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  choice === "head" ? colors.active : colors.button
                }`}
              >
                HEAD
              </button>
              <button
                onClick={() => handleChoice("tail")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  choice === "tail" ? colors.active : colors.button
                }`}
              >
                TAIL
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="tel"
                placeholder="Enter bet amount (₹)"
                value={betAmount}
                onChange={(e) =>
                  setBetAmount(e.target.value ? Number(e.target.value) : 0)
                }
                className={`w-full px-4 py-3 rounded-lg ${colors.input} focus:outline-none focus:ring-1 focus:ring-yellow-400`}
              />
              <button
                onClick={placeBet}
                disabled={!choice || !betAmount}
                className={`w-full py-3 rounded-lg font-bold bg-yellow-600 hover:bg-yellow-500 transition-all ${
                  (!choice || !betAmount) && "opacity-50 cursor-not-allowed"
                }`}
              >
                PLACE BET
              </button>
            </div>
          </div>

          {/* Recent Results */}
          <div className={`p-4 rounded-lg ${colors.card}`}>
            <h2 className="text-lg font-bold mb-3">RECENT RESULTS</h2>
            {resultHistory.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {resultHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex flex-col items-center justify-center ${
                      item.result === "head" ? "bg-blue-900" : "bg-gray-700"
                    }`}
                  >
                    <span className="text-xs">#{item.roundId.slice(-4)}</span>
                    <span className="font-bold text-lg">
                      {item.result.toUpperCase().charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No results yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
