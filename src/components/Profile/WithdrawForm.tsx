// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { userService } from "../../Services/userService";
// import { useSelector } from "react-redux";

// type BankDetails = {
//   accountNumber: string;
//   accountName: string;
//   ifscCode: string;
//   bankName: string;
//   upiId?: string;
//   accountHolderName?: string;
// };

// type WithdrawFormProps = {
//   currentBalance: number;
//   onWithdraw: (amount: number, bankDetails: BankDetails) => void;
//   isGreenTheme: boolean;
// };

// export const WithdrawForm = ({
//   currentBalance,
//   isGreenTheme,
// }: WithdrawFormProps) => {
//   const user = useSelector((state: any) => state.user);
//   const [amount, setAmount] = useState<number>(100);
//   const [withdrawalMethod, setWithdrawalMethod] = useState<"bank" | "upi">(
//     "bank"
//   );
//   const [bankDetails, setBankDetails] = useState<BankDetails>({
//     accountNumber: "",
//     accountName: "",
//     ifscCode: "",
//     bankName: "",
//     upiId: "",
//     accountHolderName: "",
//   });

//   // const [userBankDetail, setUserBankDetail] = useState<BankDetails>()

//   const validateForm = (): boolean => {
//     if (amount < 100) {
//       toast.error("Minimum withdrawal amount is ₹100");
//       return false;
//     }

//     if (amount > currentBalance) {
//       toast.error("Insufficient balance");
//       return false;
//     }

//     // if (withdrawalMethod === "bank") {
//     //   if (
//     //     !bankDetails.accountNumber ||
//     //     !bankDetails.accountName ||
//     //     !bankDetails.ifscCode ||
//     //     !bankDetails.bankName
//     //   ) {
//     //     toast.error("Please fill all bank details");
//     //     return false;
//     //   }
//     // } else {
//     //   if (!bankDetails.upiId) {
//     //     toast.error("Please enter your UPI ID");
//     //     return false;
//     //   }
//     // }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       if (amount < 100) {
//         toast.error("Minimum withdrawal amount is ₹100");
//         return;
//       }
//       const data = {
//         amount,
//       };

//       if (!user.token) {
//         toast.error("token not found");
//         return;
//       }

//       const res = await userService.widhdrawMoney(data, user?.token);
//       console.log("withdraw response", res);
//       if (res?.success) {
//         toast.success("Withdraw request submitted successfully");
//       }
//     } catch (error) {
//       console.error("Error processing withdrawal:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   const getuserBankDetails = async () => {
//     try {
//       const res = await userService.getuserBankDetails(user._id, user.token);
//       if (res?.success) {
//         setBankDetails(res.data);
//       } else {
//         toast.error(res?.message || "Failed to fetch bank details");
//       }
//     } catch (error) {
//       console.error("Error fetching bank details:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   const getUserWithdrawHistory = async () => {
//     try {
//       const res = await userService.getUserWithdrawHistory(
//         user._id,
//         user.token
//       );
//       if (res?.success) {

//         console.log("Withdraw history:", res.data);

//       } else {
//         toast.error(res?.message || "Failed to fetch withdraw history");
//       }

//     } catch (error) {
//       console.error("Error fetching withdraw history:", error);
//       toast.error("Something went wrong while fetching withdraw history");
//     }
//   }
//   useEffect(() => {
//     if (user?._id && user?.token) {
//       getuserBankDetails();
//       getUserWithdrawHistory();
//     } else {
//       toast.error("User not authenticated");
//     }
//   }, []);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <label className="block text-sm font-medium">
//           Amount (Minimum ₹100)
//         </label>
//         <input
//           type="number"
//           min="100"
//           max={currentBalance}
//           value={amount}
//           onChange={(e) => setAmount(Math.max(100, Number(e.target.value)))}
//           className="w-full p-2 rounded border bg-white bg-opacity-10 border-white border-opacity-30"
//         />
//         <p className="text-xs text-gray-300">
//           Available: ₹{currentBalance.toLocaleString()}
//         </p>
//       </div>

//       <div className="space-y-2">
//         <label className="block text-sm font-medium">Withdrawal Method</label>
//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => setWithdrawalMethod("bank")}
//             className={`px-4 py-2 rounded ${
//               withdrawalMethod === "bank"
//                 ? isGreenTheme
//                   ? "bg-green-600"
//                   : "bg-gray-800"
//                 : "bg-white bg-opacity-10"
//             }`}
//           >
//             Bank Transfer
//           </button>
//           <button
//             type="button"
//             onClick={() => setWithdrawalMethod("upi")}
//             className={`px-4 py-2 rounded ${
//               withdrawalMethod === "upi"
//                 ? isGreenTheme
//                   ? "bg-green-600"
//                   : "bg-gray-800"
//                 : "bg-white bg-opacity-10"
//             }`}
//           >
//             UPI
//           </button>
//         </div>
//       </div>

//       {withdrawalMethod === "bank" ? (
//         <div className="space-y-3">
//           <div>
//             <label className="block text-sm font-medium">Account Number</label>
//             <input
//               type="text"
//               value={bankDetails.accountNumber}
//               onChange={(e) =>
//                 setBankDetails({
//                   ...bankDetails,
//                   accountNumber: e.target.value,
//                 })
//               }
//               className="w-full p-2 rounded border bg-white bg-opacity-10 border-white border-opacity-30"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Account Holder Name
//             </label>
//             <input
//               type="text"
//               value={bankDetails.accountHolderName}
//               onChange={(e) =>
//                 setBankDetails({ ...bankDetails, accountName: e.target.value })
//               }
//               className="w-full p-2 rounded border bg-white bg-opacity-10 border-white border-opacity-30"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Bank Name</label>
//             <input
//               type="text"
//               value={bankDetails.bankName}
//               onChange={(e) =>
//                 setBankDetails({ ...bankDetails, bankName: e.target.value })
//               }
//               className="w-full p-2 rounded border bg-white bg-opacity-10 border-white border-opacity-30"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">IFSC Code</label>
//             <input
//               type="text"
//               value={bankDetails.ifscCode}
//               onChange={(e) =>
//                 setBankDetails({ ...bankDetails, ifscCode: e.target.value })
//               }
//               className="w-full p-2 rounded border bg-white bg-opacity-10 border-white border-opacity-30"
//             />
//           </div>
//         </div>
//       ) : (
//         <div>
//           <label className="block text-sm font-medium">UPI ID</label>
//           <input
//             type="text"
//             placeholder="yourname@upi"
//             value={bankDetails.upiId}
//             onChange={(e) =>
//               setBankDetails({ ...bankDetails, upiId: e.target.value })
//             }
//             className="w-full p-2 rounded border bg-white bg-opacity-10 border-white border-opacity-30"
//           />
//         </div>
//       )}

//       <button
//         type="submit"
//         className={`w-full py-2 rounded font-bold ${
//           isGreenTheme
//             ? "bg-green-600 hover:bg-green-700"
//             : "bg-gray-800 hover:bg-gray-700"
//         }`}
//       >
//         Withdraw ₹{amount}
//       </button>
//     </form>
//   );
// };

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userService } from "../../Services/userService";
import { useSelector } from "react-redux";
import { UserData } from "./types";

type BankDetails = {
  accountNumber: string;
  accountName: string;
  ifscCode: string;
  bankName: string;
  upiId?: string;
  accountHolderName?: string;
};

type WithdrawalHistory = {
  _id: string;
  amount: number;
  user: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type WithdrawFormProps = {
  currentBalance: number;
  onWithdraw: (amount: number, bankDetails: BankDetails) => void;
  isGreenTheme: boolean;
};

export const WithdrawForm = ({
  currentBalance,
  isGreenTheme,
}: WithdrawFormProps) => {
  const user = useSelector((state: any) => state.user);
  const [amount, setAmount] = useState<number>(110);
  const [withdrawalMethod, setWithdrawalMethod] = useState<"bank" | "upi">(
    "bank"
  );
  const [isBankDetailExist, setIsBankDetailExist] = useState<Boolean>(false);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "",
    accountName: "",
    ifscCode: "",
    bankName: "",
    upiId: "",
    accountHolderName: "",
  });
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    WithdrawalHistory[]
  >([]);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");

  const [userData, setuserData] = useState<UserData>(user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 110) {
      toast.error("Minimum withdrawal amount is ₹100");
      return;
    }

    if (userData.bonusAmount !== 0) {
      toast.error(
        `You need to play ₹${userData.bonusAmount} bonus amount before withdrawal`
      );
      return;
    }

    if (withdrawalMethod === "bank") {
      if (
        !bankDetails.accountNumber ||
        !bankDetails.ifscCode ||
        !bankDetails.accountHolderName ||
        !bankDetails.bankName
      ) {
        toast.error("Please first fill all bank details");
        return;
      }
    } else {
      if (!bankDetails.upiId) {
        toast.error("Please enter your UPI ID");
        return;
      }
    }

    if (!validateForm()) {
      return;
    }
    if (currentBalance < amount) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      const data = {
        amount,
      };

      if (!user.token) {
        toast.error("token not found");
        return;
      }

      const res = await userService.widhdrawMoney(data, user?.token);
      if (res?.success) {
        toast.success("Withdraw request submitted successfully");
        // Refresh history after successful withdrawal
        getUserWithdrawHistory();
        setActiveTab("history");
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      toast.error("Something went wrong");
    }
  };

  const validateForm = (): boolean => {
    if (amount < 100) {
      toast.error("Minimum withdrawal amount is ₹100");
      return false;
    }

    if (amount > currentBalance) {
      toast.error("Insufficient balance");
      return false;
    }

    return true;
  };
  const getuserBankDetails = async () => {
    try {
      const res = await userService.getuserBankDetails(user._id, user.token);
      if (res?.success) {
        setBankDetails(res.data);
        setIsBankDetailExist(true);
      } else {
        setIsBankDetailExist(false);
        // toast.error(res?.message || "Failed to fetch bank details");
      }
    } catch (error) {
      setIsBankDetailExist(false);
      console.error("Error fetching bank details:", error);
      // toast.error("Something went wrong");
    }
  };

  const getUserWithdrawHistory = async () => {
    try {
      const res = await userService.getUserWithdrawHistory(
        user._id,
        user.token
      );
      if (res?.success) {
        setWithdrawalHistory(res.data);
      } else {
        // toast.error(res?.message || "Failed to fetch withdraw history");
      }
    } catch (error) {
      console.error("Error fetching withdraw history:", error);
      // toast.error("Something went wrong while fetching withdraw history");
    }
  };

  useEffect(() => {
    if (user?._id && user?.token) {
      getUserBonus();
      getuserBankDetails();
      getUserWithdrawHistory();
    } else {
      toast.error("User not authenticated");
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserBonus = async () => {
    try {
      if (!user.token) {
        toast.error("token not found");
        return;
      }
      const res = await userService.getUserBonus(user._id, user.token);
      if (res?.success) {
        setuserData(
          (prev): UserData => ({
            ...prev,
            bonusAmount: res.data.bonusAmount,
            bonusPlayedAmount: res.data.bonusPlayedAmount,
          })
        );
      } else {
        toast.error(res?.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // toast.error("Something went wrong while fetching user data");
    }
  };

  const handleSaveBankDetails = async () => {
    if (
      !bankDetails.accountNumber ||
      !bankDetails.ifscCode ||
      !bankDetails.accountHolderName ||
      !bankDetails.bankName
    ) {
      toast.error("Please fill all bank details");
      return;
    }

    try {
      const res = await userService.saveBankDetails(bankDetails, user.token);
      if (res?.success) {
        toast.success("Bank details saved successfully");
        setIsBankDetailExist(true);
      } else {
        toast.error(res?.message || "Failed to save bank details");
      }
    } catch (error) {
      console.error("Error saving bank details:", error);
      toast.error("Something went wrong while saving bank details");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-lg">
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "form"
              ? isGreenTheme
                ? "text-green-400 border-b-2 border-green-400"
                : "text-white border-b-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("form")}
        >
          Withdraw Money
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "history"
              ? isGreenTheme
                ? "text-green-400 border-b-2 border-green-400"
                : "text-white border-b-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {activeTab === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Amount (Minimum ₹100)
            </label>
            <input
              type="tel" // Changed to number type for better mobile experience
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : 0)
              }
              className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400">
              Available: ₹{currentBalance.toLocaleString()}
            </p>

            {userData.bonusAmount !== 0 && (
              <p className="text-xs text-gray-400">
                You need to play{" "}
                <span className="font-bold ">₹{userData.bonusAmount}</span>{" "}
                bonus amount before withdrawal
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Withdrawal Method
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setWithdrawalMethod("bank")}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  withdrawalMethod === "bank"
                    ? isGreenTheme
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Bank Transfer
              </button>
              {/* <button
                type="button"
                onClick={() => setWithdrawalMethod("upi")}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  withdrawalMethod === "upi"
                    ? isGreenTheme
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                UPI
              </button> */}
            </div>
          </div>

          {withdrawalMethod === "bank" ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    setBankDetails({
                      ...bankDetails,
                      accountNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankDetails.accountHolderName}
                  onChange={(e) =>
                    setBankDetails({
                      ...bankDetails,
                      accountHolderName: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, bankName: e.target.value })
                  }
                  className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, ifscCode: e.target.value })
                  }
                  className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={bankDetails.upiId}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, upiId: e.target.value })
                }
                className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {!isBankDetailExist && (
            <button
              onClick={handleSaveBankDetails}
              className={`w-full py-3 rounded font-bold transition-colors ${
                isGreenTheme
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-white"
              }`}
            >
              Save Bank Detail
            </button>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded font-bold transition-colors ${
              isGreenTheme
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            Withdraw ₹{amount}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {withdrawalHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No withdrawal history found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {withdrawalHistory.map((withdrawal) => (
                    <tr key={withdrawal._id} className="hover:bg-gray-800">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                        ₹{withdrawal.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            withdrawal.status
                          )}`}
                        >
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(withdrawal.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
