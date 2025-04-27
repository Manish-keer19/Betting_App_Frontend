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

    // socket.on("roundResult", ({ roundId, result,message }) => {

    //      console.log("Received roundResult:", roundId, result, message);

    //   setStatus(`Round ${roundId} Winner: ${result}`);
    //   setChoice(null);
    //   setBetAmount(10);
    //   setResultHistory((prev) => [...prev, { roundId, result }].slice(-5));
    //   console.log("Round Result:", message);
    // });

    socket.on("roundResult", ({ roundId, result, message }) => {
      console.log("Received round result:", roundId, result, message);
      setStatus(`Round ${roundId} Winner: ${result}`);
      console.log("choice", choice, "result", result);
      if (choice === result) {
        toast.success(`You won! Result: ${result}`, { duration: 10000 });
      } else {
        toast.error(`You lost! Result: ${result}`, { duration: 10000 });
      }
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

    // socket.on("wonMessage", ({ message, amount }) => {
    //   // setStatus(`You won: ₹${amount}`);
    //   console.log("🎉 Win Message Received:", message, amount);
    //   // setUserdata((prev: any) => ({
    //   //   ...prev,
    //   //   balance: prev.balance + amount,
    //   // }));
    //   // dispatch(
    //   //   setUser({
    //   //     ...userData,
    //   //     balance: userData.balance,
    //   //   })
    //   // );
    // });

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

  useEffect(() => {
    console.log("we are going to register user", user?._id);
    if (user?._id) {
      socket.emit("registerUser", user?._id); // userId should be available after login
    }
  }, []);

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
