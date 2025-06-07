import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { TfiReload } from "react-icons/tfi";
import { toast } from "sonner";
// import { useTheme } from "../../utils/ThemeContext";
import { userService } from "../../Services/userService";
import { setUser } from "../../features/userSlice";
import Navbar from "../Navbar";
import { WebSocket_URL } from "../../Services/axiosInstance";
import { Howl } from "howler";
import countdownSound from "../../assets//music/count.mp3";

// const socket = io("http://localhost:3000");

const socket = io(WebSocket_URL);

export default function HeadTailGame() {
  // const { theme } = useTheme();
  // const isGreen = theme === "green";

  const [sound] = useState(
    () =>
      new Howl({
        src: [countdownSound],
        volume: 0.5,
      })
  );

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  const [roundId, setRoundId] = useState("");
  const [choice, setChoice] = useState<"head" | "tail" | null>(null);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState(30);
  const [status, setStatus] = useState("");
  const [resultHistory, setResultHistory] = useState<
    Array<{ roundId: string; result: string }>
  >([]);
  const [user, setUserdata] = useState(userData);

  const [isUserBeted, setIsUserBeted] = useState<Boolean>(false);
  const [userHistory, setUserHistory] = useState<
    Array<{
      _id: string;
      choice: string;
      amount: number;
      result: string;
      payout: number;
      createdAt: string;
    }>
  >([]);



  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );
  const serverTimeOffsetRef = useRef(0);
  const lastSyncRef = useRef(0);

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

  // const choiceRef = useRef(choice);

  // useEffect(() => {
  //   choiceRef.current = choice; // Update the ref whenever the choice changes
  // }, [choice]);

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
    console.log("Connecting to socket...");
    socket.connect();
    socket.on("currentRound", ({ roundId, startedAt, roundHistory }) => {
      setIsUserBeted(false); // Reset user bet status for the new round
      setRoundId(roundId);
      startTimer(startedAt);
      setResultHistory(roundHistory || []);
      setStatus("Current round started! Place your bet!");
    });

    socket.on("joinedRound", ({ roundId }) => {
      setStatus(`Joined Round ${roundId}`);
    });

    // socket.on("roundResult", ({ roundId, result,message }) => {

    //   setStatus(`Round ${roundId} Winner: ${result}`);
    //   setChoice(null);
    //   setBetAmount(10);
    //   setResultHistory((prev) => [...prev, { roundId, result }].slice(-5));

    // });

    // socket.on("roundResult", ({ roundId, result, message }) => {

    //   setStatus(`Round ${roundId} Winner: ${result}`);

    //   if (choice === result) {
    //     toast.success(`You won! Result: ${result}`, { duration: 10000 });
    //   } else {
    //     toast.error(`You lost! Result: ${result}`, { duration: 10000 });
    //   }
    //   setChoice(null);
    //   setBetAmount(10);
    //   setResultHistory((prev) => [...prev, { roundId, result }].slice(-5));
    // });

    socket.on(
      "roundOutcome",
      ({ result, choice, amount, message }) => {
        // console.log("Round outcome:", { result, choice, winningSide, amount });

        setStatus(message); // show status message

        // Optional toast notification
        if (result === "win") {
          toast.success(message);
        } else {
          toast.error(message);
        }

        // Reset UI if needed
        // setLockedChoice(null); // or keep it locked for 2 seconds before reset
        setIsUserBeted(false); // allow user to bet in the next round
        // Optional: Fetch new balance from backend OR update balance here
        if (result === "win") {
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

          // console.log("user won ");

          setUserHistory((prev) => [
            {
              _id: `${Date.now()}`, // or use a better unique id if available
              choice,
              amount,
              result,
              payout: result === "win" ? amount : 0,
              createdAt: new Date().toISOString(),
            },

            ...prev,
          ]);
        } else {
          // console.log("user loose");

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
      }
    );

    socket.on("newRound", ({ roundId, startedAt }) => {
      setRoundId(roundId);
      startTimer(startedAt);
      setStatus("New round started! Place your bet!");
      setIsUserBeted(false); // Reset user bet status for the new round
      setChoice(null); // Reset choice for the new round
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

    socket.on("userRegistered", (roomName) => {
      console.log("User registered in room", roomName);
    });

    socket.on("roundResultToAll", ({ room, roundId, result }) => {
      // console.log(`Room: ${room} → Round Result:`, roundId, result);

      setResultHistory((prev) =>
        [...prev, { room, roundId, result }].slice(-5)
      );
    });

    socket.on("error", (message) => {
      // console.log("Socket error:", message);
      // toast.error(`Error: ${message}`);
      setStatus(`Error: ${message}`);
    });

    // socket.on("wonMessage", ({ message, amount }: any) => {
    // console.log("wonMessage", message, amount);

    //   setUserdata((prev: any) => ({
    //     ...prev,
    //     balance: prev.balance + amount,
    //   }));
    //   dispatch(
    //     setUser({
    //       ...userData,
    //       balance: userData.balance,
    //     })
    //   );
    // });

    // socket.on("wonMessage", ({ message, amount }: any) => {
    // console.log("wonMessage", message, amount);

    //   setUserdata((prev: any) => {
    //     const newBalance = prev.balance + amount;

    //     const updatedUser = {
    //       ...prev,
    //       balance: newBalance,
    //     };

    //     // Update Redux store too
    //     dispatch(setUser(updatedUser));

    //     return updatedUser;
    //   });
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Replace your startTimer function with this:
  const startTimer = (startedAt: string) => {
    // Clear any existing interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    // Calculate initial time remaining with server sync
    const calculateRemaining = () => {
      const serverNow = Date.now() + serverTimeOffsetRef.current;
      const roundEnd = new Date(startedAt).getTime() + 30000;
      return Math.max(0, Math.floor((roundEnd - serverNow) / 1000));
    };

    // Initial sync with server
    const syncWithServer = () => {
      const now = Date.now();
      socket.emit("getServerTime", {}, (serverTime: number) => {
        const roundTripTime = Date.now() - now;
        serverTimeOffsetRef.current =
          serverTime - Date.now() + roundTripTime / 2;
        lastSyncRef.current = Date.now();

        // Update time immediately after sync
        setTimeLeft(calculateRemaining());
      });
    };

    // First sync
    syncWithServer();

    // Set up interval with drift correction
    let expected = Date.now() + 1000;
    const driftCorrection = (now: number) => {
      const drift = now - expected;
      expected += 1000;
      return Math.max(0, 1000 - drift);
    };

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();

      // Re-sync every 30 seconds or if drift is significant
      if (
        now - lastSyncRef.current > 30000 ||
        Math.abs(serverTimeOffsetRef.current) > 1000
      ) {
        syncWithServer();
      }

      setTimeLeft(calculateRemaining());

      // Correct for drift
      const nextTick = driftCorrection(now);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setTimeout(() => {
          startTimer(startedAt); // Restart with fresh calculation
        }, nextTick);
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  };

  const handleChoice = (c: "head" | "tail") => setChoice(c);

  // const placeBet = () => {
  //   const amount = Number(betAmount);
  //   setIsUserBeted(true);
  //   if (!choice) return setStatus("Select Head or Tail first");
  //   if (isNaN(amount) || amount <= 0)
  //     return setStatus("Enter valid bet amount");
  //   if (userData.balance < amount) return setStatus("Insufficient balance");

  //   setUserdata((prev: any) => ({
  //     ...prev,
  //     balance: prev.balance - amount,
  //   }));

  //   if (isUserBeted) {
  //     toast.error("You already placed a bet in this round", {
  //       duration: 5000,
  //     });
  //     return;
  //   }

  //   socket.emit("placeBet", {
  //     userId: userData._id,
  //     choice,
  //     amount,
  //     roundId,
  //   });

  //   setBetAmount(10); // Reset bet amount after placing the bet
  // };

  useEffect(() => {
    if (userData?._id) {
      fetchUserHistory();
      socket.emit("registerUser", "headTailGame");
    }
  }, [userData?._id]);

  const fetchUserHistory = async () => {
    try {
      const token = userData.token;
      if (!token) {
        toast.error("Token not found");
      }
      const response = await userService.getUserBetHistoryHeadTail(token);
      setUserHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch user history:", error);
      toast.error("Failed to load history");
    }
  };

  const placeBet = () => {
    const amount = Number(betAmount);
    if (!choice) return setStatus("Select Head or Tail first");
    if (isNaN(amount) || amount <= 0)
      return setStatus("Enter valid bet amount");
    if (userData.balance < amount) return setStatus("Insufficient balance");

    if (isUserBeted) {
      toast.error("You already placed a bet in this round", {
        duration: 5000,
      });
      return;
    }

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

    setIsUserBeted(true); // ✅ Set this AFTER placing the bet
    // setBetAmount(10); // Reset bet amount after placing the bet
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
      socket.emit("registerUser", "headTailGame"); // userId should be available after login
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-4 mt-24 `}>
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
                disabled={!roundId || timeLeft <= 5}
                onClick={() => handleChoice("head")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  choice === "head" ? colors.active : colors.button
                } ${
                  !roundId || (timeLeft <= 5 && "opacity-50 cursor-not-allowed")
                } `}
              >
                HEAD
              </button>
              <button
                disabled={!roundId || timeLeft <= 5}
                onClick={() => handleChoice("tail")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  choice === "tail" ? colors.active : colors.button
                } ${
                  !roundId || (timeLeft <= 5 && "opacity-50 cursor-not-allowed")
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
                disabled={!choice || !betAmount || timeLeft <= 5 || !roundId}
                className={`w-full py-3 rounded-lg font-bold bg-yellow-600 hover:bg-yellow-500 transition-all ${
                  (!choice || !betAmount) && "opacity-50 cursor-not-allowed"
                }  ${
                  !roundId || (timeLeft <= 5 && "opacity-50 cursor-not-allowed")
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

          {/* User Bet History */}
          <div className={`p-4 rounded-lg ${colors.card} mt-4`}>
            {/* <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">YOUR BET HISTORY</h2>
              <TfiReload
                onClick={fetchUserHistory}
                className="text-yellow-400 cursor-pointer"
                size={18}
              />
            </div> */}

            {userHistory.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {userHistory.map((bet) => (
                  <div
                    key={bet._id}
                    className={`p-3 rounded-lg flex justify-between items-center ${
                      bet.result === "win" ? "bg-green-900/30" : "bg-red-900/30"
                    }`}
                  >
                    <div>
                      <p className="font-medium">
                        {bet.choice.toUpperCase()} - ₹{bet.amount}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(bet.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={
                          bet.result === "win"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {bet.result.toUpperCase()}
                      </p>
                      <p className="text-sm">
                        {bet.result === "win"
                          ? `+₹${bet.payout}`
                          : `-₹${bet.amount}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">
                No bet history found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}




