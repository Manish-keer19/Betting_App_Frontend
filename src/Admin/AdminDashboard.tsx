// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { adminService } from "../Services/adminService";
// import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";

// type BankDetails = {
//   _id: string;
//   bankName: string;
//   accountHolderName: string;
//   accountNumber: string;
//   ifscCode: string;
//   user: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type Transaction = {
//   _id: string;
//   amount: number;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   transactionId: string;
//   paymentScreenshot: string;
//   createdAt: string;
//   updatedAt: string;
//   user: {
//     _id: string;
//     username: string;
//     email: string;
//     BankDetails?: BankDetails;
//   };
// };

// type TabType =
//   | "pending-deposits"
//   | "approved-deposits"
//   | "pending-withdrawals"
//   | "approved-withdrawals";

// const AdminDashboard = () => {
//   const user = useSelector((state: any) => state.user);
//   const token = user?.token || null;

//   // State for all transaction types
//   const [pendingDeposits, setPendingDeposits] = useState<Transaction[]>([]);
//   const [approvedDeposits, setApprovedDeposits] = useState<Transaction[]>([]);
//   const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>(
//     []
//   );
//   const [approvedWithdrawals, setApprovedWithdrawals] = useState<Transaction[]>(
//     []
//   );

//   const [loading, setLoading] = useState({
//     pendingDeposits: false,
//     approvedDeposits: false,
//     pendingWithdrawals: false,
//     approvedWithdrawals: false,
//   });

//   const [activeTab, setActiveTab] = useState<TabType>("pending-deposits");
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [selectedBankDetails, setSelectedBankDetails] = useState<BankDetails | null>(null);

//   // Fetch all transaction data
//   const fetchAllTransactions = async () => {
//     try {
//       setIsRefreshing(true);
//       // Fetch pending deposits
//       setLoading((prev) => ({ ...prev, pendingDeposits: true }));
//       const pendingDepositsRes = await adminService.getAllPendingDeposits(
//         token
//       );
//       if (pendingDepositsRes.success)
//         setPendingDeposits(pendingDepositsRes.data);

//       // Fetch approved deposits
//       setLoading((prev) => ({ ...prev, approvedDeposits: true }));
//       const approvedDepositsRes = await adminService.getAllApprovedDeposits(
//         token
//       );
//       if (approvedDepositsRes.success)
//         setApprovedDeposits(approvedDepositsRes.data);

//       // Fetch pending withdrawals
//       setLoading((prev) => ({ ...prev, pendingWithdrawals: true }));
//       const pendingWithdrawalsRes = await adminService.getAllPendingWithdraws(
//         token
//       );
//       if (pendingWithdrawalsRes.success)
//         setPendingWithdrawals(pendingWithdrawalsRes.data);

//       // Fetch approved withdrawals
//       setLoading((prev) => ({ ...prev, approvedWithdrawals: true }));
//       const approvedWithdrawalsRes = await adminService.getAllApprovedWithdraws(
//         token
//       );
//       if (approvedWithdrawalsRes.success)
//         setApprovedWithdrawals(approvedWithdrawalsRes.data);
//     } catch (error) {
//       toast.error("Failed to fetch transaction data");
//     } finally {
//       setLoading({
//         pendingDeposits: false,
//         approvedDeposits: false,
//         pendingWithdrawals: false,
//         approvedWithdrawals: false,
//       });
//       setIsRefreshing(false);
//     }
//   };

//   const handleApprove = async (
//     type: "deposit" | "withdrawal",
//     id: string,
//     userId: string
//   ) => {
//     try {
//       let response;
//       if (type === "deposit") {
//         const data = { userId, depositId: id };
//         response = await adminService.verifyDeposit(data, token);
//       } else {
//         const data = { userId, withdrawId: id };
//         response = await adminService.verfyWithdraw(data, token);
//       }

//       if (response.success) {
//         toast.success(`Transaction approved successfully`);
//         fetchAllTransactions();
//       }
//     } catch (error) {
//       toast.error("Failed to approve transaction");
//     }
//   };

//   const handleReject = async (
//     type: "deposit" | "withdrawal",
//     id: string,
//     userId: string
//   ) => {
//     try {
//       let response;
//       if (type === "deposit") {
//         const data = { userId, depositId: id };
//         response = await adminService.rejectDeposit(data, token);
//       } else {
//         const data = { userId, withdrawId: id };
//         response = await adminService.rejectWithdraw(data, token);
//       }

//       if (response?.success) {
//         toast.success(`Transaction rejected`);
//         fetchAllTransactions();
//       }
//     } catch (error) {
//       toast.error("Failed to reject transaction");
//     }
//   };

//   const openImageModal = (imageUrl: string) => {
//     setSelectedImage(imageUrl);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const openBankDetailsModal = (bankDetails: BankDetails) => {
//     setSelectedBankDetails(bankDetails);
//   };

//   const closeBankDetailsModal = () => {
//     setSelectedBankDetails(null);
//   };

//   useEffect(() => {
//     fetchAllTransactions();
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get current transactions based on active tab
//   const getCurrentTransactions = () => {
//     switch (activeTab) {
//       case "pending-deposits":
//         return pendingDeposits;
//       case "approved-deposits":
//         return approvedDeposits;
//       case "pending-withdrawals":
//         return pendingWithdrawals;
//       case "approved-withdrawals":
//         return approvedWithdrawals;
//       default:
//         return [];
//     }
//   };

//   const getLoadingState = () => {
//     switch (activeTab) {
//       case "pending-deposits":
//         return loading.pendingDeposits;
//       case "approved-deposits":
//         return loading.approvedDeposits;
//       case "pending-withdrawals":
//         return loading.pendingWithdrawals;
//       case "approved-withdrawals":
//         return loading.approvedWithdrawals;
//       default:
//         return false;
//     }
//   };

//   const getEmptyMessage = () => {
//     switch (activeTab) {
//       case "pending-deposits":
//         return "No pending deposits found";
//       case "approved-deposits":
//         return "No approved deposits found";
//       case "pending-withdrawals":
//         return "No pending withdrawals found";
//       case "approved-withdrawals":
//         return "No approved withdrawals found";
//       default:
//         return "No data found";
//     }
//   };

//   const isPendingTab = activeTab.includes("pending");
//   const isWithdrawalTab = activeTab.includes("withdrawals");

//   return (
//     <div className=" bg-gray-900 min-h-screen pt-20">
//       <Navbar/>
//       <div className="max-w-7xl mx-auto mt-[7vh] *:p-4 md:p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={fetchAllTransactions}
//               disabled={isRefreshing}
//               className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
//             >
//               {isRefreshing ? (
//                 <>
//                   <svg
//                     className="animate-spin h-4 w-4"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Refreshing...
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     />
//                   </svg>
//                   Refresh
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
//           <button
//             className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
//               activeTab === "pending-deposits"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//             onClick={() => setActiveTab("pending-deposits")}
//           >
//             Pending Deposits
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
//               activeTab === "approved-deposits"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//             onClick={() => setActiveTab("approved-deposits")}
//           >
//             Approved Deposits
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
//               activeTab === "pending-withdrawals"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//             onClick={() => setActiveTab("pending-withdrawals")}
//           >
//             Pending Withdrawals
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
//               activeTab === "approved-withdrawals"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//             onClick={() => setActiveTab("approved-withdrawals")}
//           >
//             Approved Withdrawals
//           </button>
//         </div>

//         {/* Content */}
//         <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//           {getLoadingState() ? (
//             <div className="text-center py-12">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//               <p className="mt-2 text-gray-400">Loading transactions...</p>
//             </div>
//           ) : getCurrentTransactions().length === 0 ? (
//             <div className="text-center py-12 text-gray-400">
//               {getEmptyMessage()}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-700">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Transaction ID
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Status
//                     </th>
//                     {isWithdrawalTab && (
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Bank Details
//                       </th>
//                     )}
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Payment Proof
//                     </th>
//                     {isPendingTab && (
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-800 divide-y divide-gray-700">
//                   {getCurrentTransactions().map((transaction) => (
//                     <tr
//                       key={transaction._id}
//                       className="hover:bg-gray-750 transition-colors"
//                     >
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-blue-900 rounded-full flex items-center justify-center">
//                             <span className="text-blue-300 font-medium">
//                               {transaction.user?.username
//                                 .charAt(0)
//                                 .toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-white">
//                               {transaction.user?.username}
//                             </div>
//                             <div className="text-sm text-gray-400">
//                               {transaction.user?.email}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <div className="text-sm font-semibold text-white">
//                           ₹{transaction.amount.toLocaleString()}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
//                         {transaction.transactionId || "N/A"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
//                         {formatDate(transaction.createdAt)}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             transaction.status === "APPROVED"
//                               ? "bg-green-900 text-green-100"
//                               : transaction.status === "PENDING"
//                               ? "bg-yellow-900 text-yellow-100"
//                               : "bg-red-900 text-red-100"
//                           }`}
//                         >
//                           {transaction.status}
//                         </span>
//                       </td>
//                       {isWithdrawalTab && (
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           {transaction.user.BankDetails ? (
//                             <button
//                               onClick={() => 
//                                 transaction.user.BankDetails && 
//                                 openBankDetailsModal(transaction.user.BankDetails)
//                               }
//                               className="text-blue-400 hover:text-blue-300 text-sm font-medium"
//                             >
//                               View Details
//                             </button>
//                           ) : (
//                             <span className="text-gray-400 text-sm">N/A</span>
//                           )}
//                         </td>
//                       )}
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <button
//                           onClick={() =>
//                             openImageModal(transaction.paymentScreenshot)
//                           }
//                           className="text-blue-400 hover:text-blue-300 text-sm font-medium"
//                         >
//                           View Proof
//                         </button>
//                       </td>
//                       {isPendingTab && (
//                         <td className="px-4 py-3 whitespace-nowrap space-x-2">
//                           <button
//                             onClick={() =>
//                               handleApprove(
//                                 activeTab.includes("deposit")
//                                   ? "deposit"
//                                   : "withdrawal",
//                                 transaction._id,
//                                 transaction.user._id
//                               )
//                             }
//                             className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600 text-sm transition-colors"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleReject(
//                                 activeTab.includes("deposit")
//                                   ? "deposit"
//                                   : "withdrawal",
//                                 transaction._id,
//                                 transaction.user._id
//                               )
//                             }
//                             className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 text-sm transition-colors"
//                           >
//                             Reject
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Image Modal */}
//         {selectedImage && (
//           <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//             <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl border border-gray-700">
//               <div className="flex justify-between items-center border-b border-gray-700 p-4">
//                 <h3 className="text-lg font-medium text-white">
//                   Payment Screenshot
//                 </h3>
//                 <button
//                   onClick={closeImageModal}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className="p-4">
//                 <img
//                   src={selectedImage}
//                   alt="Payment proof"
//                   className="max-w-full h-auto mx-auto rounded-md border border-gray-700"
//                 />
//               </div>
//               <div className="border-t border-gray-700 p-4 flex justify-end">
//                 <button
//                   onClick={closeImageModal}
//                   className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bank Details Modal */}
//         {selectedBankDetails && (
//           <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//             <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-xl border border-gray-700">
//               <div className="flex justify-between items-center border-b border-gray-700 p-4">
//                 <h3 className="text-lg font-medium text-white">
//                   Bank Details
//                 </h3>
//                 <button
//                   onClick={closeBankDetailsModal}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className="p-4 space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-400">Bank Name</p>
//                   <p className="text-white font-medium">{selectedBankDetails.bankName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-400">Account Holder Name</p>
//                   <p className="text-white font-medium">{selectedBankDetails.accountHolderName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-400">Account Number</p>
//                   <p className="text-white font-medium">{selectedBankDetails.accountNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-400">IFSC Code</p>
//                   <p className="text-white font-medium">{selectedBankDetails.ifscCode}</p>
//                 </div>
//               </div>
//               <div className="border-t border-gray-700 p-4 flex justify-end">
//                 <button
//                   onClick={closeBankDetailsModal}
//                   className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;






                              










// AdminDashboard.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { 
  User as UserIcon, Search, Clock, CreditCard, 
  BarChart2, Activity,  X, DollarSign,
} from "react-feather";
import { adminService } from "../Services/adminService";
import Navbar from "../components/Navbar";

type BankDetails = {
  _id: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

type Transaction = {
  _id: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  transactionId: string;
  paymentScreenshot: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    username: string;
    email: string;
    profilePic?: string;
    BankDetails?: BankDetails;
  };
};

type GameHistory = {
  _id: string;
  gameType: string;
  betAmount: number;
  winAmount: number;
  result: string;
  createdAt: string;
  updatedAt: string;
};

type UserDetails = {
  _id: string;
  username: string;
  email: string;
  balance: number;
  profilePic: string;
  Role: string;
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  phoneNumber: string;
  bonusAmount: number;
  bonusPlayedAmount: number;
  isFirstDeposit: boolean;
  isActive: boolean;
  lastLogin: string;
  loginCount: number;
};

type TabType =
  | "pending-deposits"
  | "approved-deposits"
  | "pending-withdrawals"
  | "approved-withdrawals"
  | "users"
  | "dashboard";

const AdminDashboard = () => {
  const user = useSelector((state: any) => state.user);
  const token = user?.token || null;

  // State for all transaction types
  const [pendingDeposits, setPendingDeposits] = useState<Transaction[]>([]);
  const [approvedDeposits, setApprovedDeposits] = useState<Transaction[]>([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>([]);
  const [approvedWithdrawals, setApprovedWithdrawals] = useState<Transaction[]>([]);
  const [allUsers, setAllUsers] = useState<UserDetails[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [userHistory, setUserHistory] = useState<{
    deposits: Transaction[];
    withdrawals: Transaction[];
    gameHistory: GameHistory[];
    bankDetails: BankDetails | null;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingDepositsCount: 0,
    pendingWithdrawalsCount: 0
  });

  const [loading, setLoading] = useState({
    pendingDeposits: false,
    approvedDeposits: false,
    pendingWithdrawals: false,
    approvedWithdrawals: false,
    users: false,
    dashboard: false,
    userHistory: false
  });

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState<BankDetails | null>(null);

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setIsRefreshing(true);
      
      // Fetch dashboard stats
      if (activeTab === "dashboard") {
        setLoading(prev => ({ ...prev, dashboard: true }));
        const statsRes = await adminService.getDashboardStats(token);
        if (statsRes.success) setStats(statsRes.data);
      }

      // Fetch pending deposits
      setLoading(prev => ({ ...prev, pendingDeposits: true }));
      const pendingDepositsRes = await adminService.getAllPendingDeposits(token);
      if (pendingDepositsRes.success) {
        setPendingDeposits(pendingDepositsRes.data);
        setStats(prev => ({ ...prev, pendingDepositsCount: pendingDepositsRes.data.length }));
      }

      // Fetch approved deposits
      setLoading(prev => ({ ...prev, approvedDeposits: true }));
      const approvedDepositsRes = await adminService.getAllApprovedDeposits(token);
      if (approvedDepositsRes.success) setApprovedDeposits(approvedDepositsRes.data);

      // Fetch pending withdrawals
      setLoading(prev => ({ ...prev, pendingWithdrawals: true }));
      const pendingWithdrawalsRes = await adminService.getAllPendingWithdraws(token);
      if (pendingWithdrawalsRes.success) {
        setPendingWithdrawals(pendingWithdrawalsRes.data);
        setStats(prev => ({ ...prev, pendingWithdrawalsCount: pendingWithdrawalsRes.data.length }));
      }

      // Fetch approved withdrawals
      setLoading(prev => ({ ...prev, approvedWithdrawals: true }));
      const approvedWithdrawalsRes = await adminService.getAllApprovedWithdraws(token);
      if (approvedWithdrawalsRes.success) setApprovedWithdrawals(approvedWithdrawalsRes.data);

      // Fetch all users
      setLoading(prev => ({ ...prev, users: true }));
      const usersRes = await adminService.getAllUsers(token);
      if (usersRes.success) {
        setAllUsers(usersRes.data);
        setStats(prev => ({ ...prev, totalUsers: usersRes.data.length }));
      }

    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading({
        pendingDeposits: false,
        approvedDeposits: false,
        pendingWithdrawals: false,
        approvedWithdrawals: false,
        users: false,
        dashboard: false,
        userHistory: false
      });
      setIsRefreshing(false);
    }
  };

  // Fetch user history
  const fetchUserHistory = async (userId: string) => {
    try {
      setLoading(prev => ({ ...prev, userHistory: true }));
      const res = await adminService.getUserDetails(userId, token);
      if (res.success) {
        setUserHistory({
          deposits: res.data.deposits,
          withdrawals: res.data.withdrawals,
          gameHistory: res.data.gameHistory,
          bankDetails: res.data.bankDetails
        });
      }
    } catch (error) {
      toast.error("Failed to fetch user history");
    } finally {
      setLoading(prev => ({ ...prev, userHistory: false }));
    }
  };

  const handleApprove = async (
    type: "deposit" | "withdrawal",
    id: string,
    userId: string
  ) => {
    try {
      let response;
      if (type === "deposit") {
        const data = { userId, depositId: id };
        response = await adminService.verifyDeposit(data, token);
      } else {
        const data = { userId, withdrawId: id };
        response = await adminService.verfyWithdraw(data, token);
      }

      if (response.success) {
        toast.success(`Transaction approved successfully`);
        fetchAllData();
      }
    } catch (error) {
      toast.error("Failed to approve transaction");
    }
  };

  const handleReject = async (
    type: "deposit" | "withdrawal",
    id: string,
    userId: string
  ) => {
    try {
      let response;
      if (type === "deposit") {
        const data = { userId, depositId: id };
        response = await adminService.rejectDeposit(data, token);
      } else {
        const data = { userId, withdrawId: id };
        response = await adminService.rejectWithdraw(data, token);
      }

      if (response?.success) {
        toast.success(`Transaction rejected`);
        fetchAllData();
      }
    } catch (error) {
      toast.error("Failed to reject transaction");
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const openBankDetailsModal = (bankDetails: BankDetails) => {
    setSelectedBankDetails(bankDetails);
  };

  const closeBankDetailsModal = () => {
    setSelectedBankDetails(null);
  };

  const openUserDetailsModal = async (user: UserDetails) => {
    setSelectedUser(user);
    await fetchUserHistory(user._id);
  };

  const closeUserDetailsModal = () => {
    setSelectedUser(null);
    setUserHistory(null);
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        fetchAllData();
        return;
      }
      
      setLoading(prev => ({ ...prev, users: true }));
      const res = await adminService.searchUsers(searchTerm, token);
      if (res.success) {
        setAllUsers(res.data);
      }
    } catch (error) {
      toast.error("Failed to search users");
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "pending-deposits":
        return pendingDeposits;
      case "approved-deposits":
        return approvedDeposits;
      case "pending-withdrawals":
        return pendingWithdrawals;
      case "approved-withdrawals":
        return approvedWithdrawals;
      case "users":
        return allUsers;
      default:
        return [];
    }
  };

  const getLoadingState = () => {
    switch (activeTab) {
      case "pending-deposits":
        return loading.pendingDeposits;
      case "approved-deposits":
        return loading.approvedDeposits;
      case "pending-withdrawals":
        return loading.pendingWithdrawals;
      case "approved-withdrawals":
        return loading.approvedWithdrawals;
      case "users":
        return loading.users;
      case "dashboard":
        return loading.dashboard;
      default:
        return false;
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "pending-deposits":
        return "No pending deposits found";
      case "approved-deposits":
        return "No approved deposits found";
      case "pending-withdrawals":
        return "No pending withdrawals found";
      case "approved-withdrawals":
        return "No approved withdrawals found";
      case "users":
        return "No users found";
      default:
        return "No data found";
    }
  };

  const isPendingTab = activeTab.includes("pending");
  const isWithdrawalTab = activeTab.includes("withdrawals");
  const isUsersTab = activeTab === "users";
  const isDashboardTab = activeTab === "dashboard";

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage users, deposits, and withdrawals</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={isRefreshing}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm shadow-lg hover:shadow-indigo-500/20"
            >
              {isRefreshing ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Data
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (visible only on users tab) */}
        {isUsersTab && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search users by name, email, or ID..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </div>
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1.5 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors flex items-center gap-2 ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart2 size={16} />
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors flex items-center gap-2 ${
              activeTab === "pending-deposits"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("pending-deposits")}
          >
            <Clock size={16} />
            Pending Deposits
            {stats.pendingDepositsCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {stats.pendingDepositsCount}
              </span>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors flex items-center gap-2 ${
              activeTab === "approved-deposits"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("approved-deposits")}
          >
            <CreditCard size={16} />
            Approved Deposits
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors flex items-center gap-2 ${
              activeTab === "pending-withdrawals"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("pending-withdrawals")}
          >
            <Clock size={16} />
            Pending Withdrawals
            {stats.pendingWithdrawalsCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {stats.pendingWithdrawalsCount}
              </span>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors flex items-center gap-2 ${
              activeTab === "approved-withdrawals"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("approved-withdrawals")}
          >
            <DollarSign size={16} />
            Approved Withdrawals
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors flex items-center gap-2 ${
              activeTab === "users"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <UserIcon size={16} />
            Users
          </button>
        </div>

        {/* Dashboard Stats */}
        {isDashboardTab && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-200 text-sm font-medium">Total Users</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.totalUsers}</h3>
                </div>
                <div className="bg-indigo-700 p-3 rounded-full">
                  <UserIcon className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Active Users</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.activeUsers}</h3>
                </div>
                <div className="bg-green-700 p-3 rounded-full">
                  <Activity className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Deposits</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(stats.totalDeposits)}</h3>
                </div>
                <div className="bg-blue-700 p-3 rounded-full">
                  <DollarSign className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Total Withdrawals</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(stats.totalWithdrawals)}</h3>
                </div>
                <div className="bg-purple-700 p-3 rounded-full">
                  <CreditCard className="text-white" size={20} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          {getLoadingState() ? (
            <div className="text-center py-12">
              <div className="inline-flex animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
              <p className="mt-4 text-gray-400">Loading data...</p>
            </div>
          ) : (isDashboardTab ? (
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Deposits */}
                <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <DollarSign size={18} /> Recent Deposits
                  </h3>
                  {approvedDeposits.slice(0, 5).length > 0 ? (
                    <div className="space-y-4">
                      {approvedDeposits.slice(0, 5).map((deposit) => (
                        <div key={deposit._id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-900 p-2 rounded-full">
                              <UserIcon size={16} className="text-indigo-300" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{deposit.user?.username}</p>
                              <p className="text-xs text-gray-400">{formatDate(deposit.createdAt)}</p>
                            </div>
                          </div>
                          <span className="text-green-400 font-semibold">
                            {formatCurrency(deposit.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No recent deposits</p>
                  )}
                </div>

                {/* Recent Withdrawals */}
                <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CreditCard size={18} /> Recent Withdrawals
                  </h3>
                  {approvedWithdrawals.slice(0, 5).length > 0 ? (
                    <div className="space-y-4">
                      {approvedWithdrawals.slice(0, 5).map((withdrawal) => (
                        <div key={withdrawal._id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-900 p-2 rounded-full">
                              <UserIcon size={16} className="text-purple-300" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{withdrawal.user?.username}</p>
                              <p className="text-xs text-gray-400">{formatDate(withdrawal.createdAt)}</p>
                            </div>
                          </div>
                          <span className="text-red-400 font-semibold">
                            -{formatCurrency(withdrawal.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No recent withdrawals</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    {isUsersTab ? (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Balance
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </>
                    ) : (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        {isPendingTab && !isWithdrawalTab && (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Screenshot
                          </th>
                        )}
                        {isPendingTab && isWithdrawalTab && (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Bank Details
                          </th>
                        )}
                        {isPendingTab && (
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        )}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {getCurrentData().length > 0 ? (
                    getCurrentData().map((item: any) => (
                      <tr key={item._id} className="hover:bg-gray-750 transition-colors">
                        {isUsersTab ? (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={item.profilePic || "https://via.placeholder.com/150"}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">
                                    {item.username}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {item.phoneNumber || "No phone"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {item.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {formatCurrency(item.balance)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(item.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => openUserDetailsModal(item)}
                                className="text-indigo-500 hover:text-indigo-400 mr-3"
                              >
                                View
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={item.user?.profilePic || "https://via.placeholder.com/150"}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">
                                    {item.user?.username}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {item.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {formatCurrency(item.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(item.createdAt)}
                            </td>
                            {isPendingTab && !isWithdrawalTab && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => openImageModal(item.paymentScreenshot)}
                                  className="text-indigo-500 hover:text-indigo-400 text-sm"
                                >
                                  View Screenshot
                                </button>
                              </td>
                            )}
                            {isPendingTab && isWithdrawalTab && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.user?.BankDetails ? (
                                  <button
                                    onClick={() => openBankDetailsModal(item.user.BankDetails)}
                                    className="text-indigo-500 hover:text-indigo-400 text-sm"
                                  >
                                    View Bank Details
                                  </button>
                                ) : (
                                  <span className="text-gray-400 text-sm">No details</span>
                                )}
                              </td>
                            )}
                            {isPendingTab && (
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button
                                  onClick={() =>
                                    handleApprove(
                                      isWithdrawalTab ? "withdrawal" : "deposit",
                                      item._id,
                                      item.user._id
                                    )
                                  }
                                  className="text-green-500 hover:text-green-400"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleReject(
                                      isWithdrawalTab ? "withdrawal" : "deposit",
                                      item._id,
                                      item.user._id
                                    )
                                  }
                                  className="text-red-500 hover:text-red-400"
                                >
                                  Reject
                                </button>
                              </td>
                            )}
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isUsersTab ? 6 : isPendingTab ? (isWithdrawalTab ? 5 : 5) : 4} className="px-6 py-4 text-center text-gray-400">
                        {getEmptyMessage()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Payment Screenshot</h3>
              <button
                onClick={closeImageModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Payment Screenshot"
              className="w-full max-h-[80vh] rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bank Details Modal */}
      {selectedBankDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Bank Details</h3>
              <button
                onClick={closeBankDetailsModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-400">Bank Name</p>
                <p className="text-white font-medium">{selectedBankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Holder</p>
                <p className="text-white font-medium">{selectedBankDetails.accountHolderName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Number</p>
                <p className="text-white font-medium">{selectedBankDetails.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">IFSC Code</p>
                <p className="text-white font-medium">{selectedBankDetails.ifscCode}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-auto">
          
                  <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[75vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
              <h3 className="text-lg font-medium text-white">User Details: {selectedUser.username}</h3>
              <button
                onClick={closeUserDetailsModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* User Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                    <UserIcon size={16} /> Basic Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Username</p>
                      <p className="text-white font-medium">{selectedUser.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone Number</p>
                      <p className="text-white font-medium">
                        {selectedUser.phoneNumber || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Referral Code</p>
                      <p className="text-white font-medium">{selectedUser.referralCode}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                    <DollarSign size={16} /> Financial Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Balance</p>
                      <p className="text-white font-medium">
                        {formatCurrency(selectedUser.balance)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bonus Amount</p>
                      <p className="text-white font-medium">
                        {formatCurrency(selectedUser.bonusAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bonus Played</p>
                      <p className="text-white font-medium">
                        {formatCurrency(selectedUser.bonusPlayedAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">First Deposit</p>
                      <p className="text-white font-medium">
                        {selectedUser.isFirstDeposit ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details Section */}
              {userHistory?.bankDetails && (
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700 ">
                  <h4 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                    <CreditCard size={16} /> Bank Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Bank Name</p>
                      <p className="text-white font-medium">
                        {userHistory.bankDetails.bankName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Holder</p>
                      <p className="text-white font-medium">
                        {userHistory.bankDetails.accountHolderName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Number</p>
                      <p className="text-white font-medium">
                        {userHistory.bankDetails.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">IFSC Code</p>
                      <p className="text-white font-medium">
                        {userHistory.bankDetails.ifscCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabs for History */}
              <div className="border-b border-gray-700">
                <div className="flex space-x-4">
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      !loading.userHistory
                        ? "border-indigo-500 text-indigo-400"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    Deposit History ({userHistory?.deposits.length || 0})
                  </button>
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      !loading.userHistory
                        ? "border-indigo-500 text-indigo-400"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    Withdrawal History ({userHistory?.withdrawals.length || 0})
                  </button>
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      !loading.userHistory
                        ? "border-indigo-500 text-indigo-400"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    Game History ({userHistory?.gameHistory.length || 0})
                  </button>
                </div>
              </div>

              {/* History Content */}
              {loading.userHistory ? (
                <div className="text-center py-12">
                  <div className="inline-flex animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                  <p className="mt-4 text-gray-400">Loading history...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Deposit History */}
                  {userHistory?.deposits.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-750">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {userHistory.deposits.map((deposit) => (
                            <tr key={deposit._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {formatCurrency(deposit.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    deposit.status === "APPROVED"
                                      ? "bg-green-100 text-green-800"
                                      : deposit.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {deposit.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {formatDate(deposit.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No deposit history found</p>
                  )}

                  {/* Withdrawal History */}
                  {userHistory?.withdrawals.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-750">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {userHistory.withdrawals.map((withdrawal) => (
                            <tr key={withdrawal._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {formatCurrency(withdrawal.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    withdrawal.status === "APPROVED"
                                      ? "bg-green-100 text-green-800"
                                      : withdrawal.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {withdrawal.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {formatDate(withdrawal.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No withdrawal history found</p>
                  )}

                  {/* Game History */}
                  {userHistory?.gameHistory.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-750">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Game Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Bet Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Win Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Result
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {userHistory.gameHistory.map((game) => (
                            <tr key={game._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {game.gameType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                                -{formatCurrency(game.betAmount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                                {game.winAmount > 0 ? `+${formatCurrency(game.winAmount)}` : "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    game.result === "win"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {game.result.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {formatDate(game.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No game history found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;