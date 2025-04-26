import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { userService } from "../../Services/userService";

type Deposit = {
  _id: string;
  amount: number;
  transactionId: string;
  screenshotUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

type DepositHistoryProps = {
  theme: "green" | "black";
};

export const DepositHistory = ({ theme }: DepositHistoryProps) => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: any) => state.user);
  const isGreenTheme = theme === "green";

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await userService.getUserDeposits(user._id, user.token);
        if (res?.success) {
          setDeposits(res.data);
        } else {
          toast.error(res?.message || "Failed to fetch deposit history");
        }
      } catch (error) {
        console.error("Error fetching deposits:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && user?.token) {
      fetchDeposits();
    } else {
      toast.error("User not authenticated");
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!deposits || deposits.length === 0)
    return (
      <p className="text-center text-gray-400">No deposit history found.</p>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Deposit History</h2>
      {deposits.map((deposit) => (
        <div
          key={deposit._id}
          className={`p-4 rounded-lg shadow-md ${
            isGreenTheme
              ? "bg-green-800 bg-opacity-30"
              : "bg-gray-800 bg-opacity-50"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">₹{deposit.amount}</p>
              <p className="text-sm text-gray-300">
                Transaction ID: {deposit.transactionId}
              </p>
              <p className="text-sm text-gray-400">
                Date: {new Date(deposit.createdAt).toLocaleString()}
              </p>
              <p
                className={`mt-1 text-sm font-semibold ${
                  deposit.status === "approved"
                    ? "text-green-400"
                    : deposit.status === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                Status: {deposit.status.toUpperCase()}
              </p>
            </div>

            {deposit.screenshotUrl && (
              <a
                href={deposit.screenshotUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={deposit.screenshotUrl}
                  alt="Payment Screenshot"
                  className="w-24 h-24 object-cover rounded-lg border border-white border-opacity-20"
                />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
