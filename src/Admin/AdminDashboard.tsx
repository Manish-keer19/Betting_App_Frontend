import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { adminService } from "../Services/adminService";
import { useSelector } from "react-redux";
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
    BankDetails?: BankDetails;
  };
};

type TabType =
  | "pending-deposits"
  | "approved-deposits"
  | "pending-withdrawals"
  | "approved-withdrawals";

const AdminDashboard = () => {
  const user = useSelector((state: any) => state.user);
  const token = user?.token || null;

  // State for all transaction types
  const [pendingDeposits, setPendingDeposits] = useState<Transaction[]>([]);
  const [approvedDeposits, setApprovedDeposits] = useState<Transaction[]>([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>(
    []
  );
  const [approvedWithdrawals, setApprovedWithdrawals] = useState<Transaction[]>(
    []
  );

  const [loading, setLoading] = useState({
    pendingDeposits: false,
    approvedDeposits: false,
    pendingWithdrawals: false,
    approvedWithdrawals: false,
  });

  const [activeTab, setActiveTab] = useState<TabType>("pending-deposits");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState<BankDetails | null>(null);

  // Fetch all transaction data
  const fetchAllTransactions = async () => {
    try {
      setIsRefreshing(true);
      // Fetch pending deposits
      setLoading((prev) => ({ ...prev, pendingDeposits: true }));
      const pendingDepositsRes = await adminService.getAllPendingDeposits(
        token
      );
      if (pendingDepositsRes.success)
        setPendingDeposits(pendingDepositsRes.data);

      // Fetch approved deposits
      setLoading((prev) => ({ ...prev, approvedDeposits: true }));
      const approvedDepositsRes = await adminService.getAllApprovedDeposits(
        token
      );
      if (approvedDepositsRes.success)
        setApprovedDeposits(approvedDepositsRes.data);

      // Fetch pending withdrawals
      setLoading((prev) => ({ ...prev, pendingWithdrawals: true }));
      const pendingWithdrawalsRes = await adminService.getAllPendingWithdraws(
        token
      );
      if (pendingWithdrawalsRes.success)
        setPendingWithdrawals(pendingWithdrawalsRes.data);

      // Fetch approved withdrawals
      setLoading((prev) => ({ ...prev, approvedWithdrawals: true }));
      const approvedWithdrawalsRes = await adminService.getAllApprovedWithdraws(
        token
      );
      if (approvedWithdrawalsRes.success)
        setApprovedWithdrawals(approvedWithdrawalsRes.data);
    } catch (error) {
      toast.error("Failed to fetch transaction data");
    } finally {
      setLoading({
        pendingDeposits: false,
        approvedDeposits: false,
        pendingWithdrawals: false,
        approvedWithdrawals: false,
      });
      setIsRefreshing(false);
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
        fetchAllTransactions();
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
        fetchAllTransactions();
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

  useEffect(() => {
    fetchAllTransactions();
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

  // Get current transactions based on active tab
  const getCurrentTransactions = () => {
    switch (activeTab) {
      case "pending-deposits":
        return pendingDeposits;
      case "approved-deposits":
        return approvedDeposits;
      case "pending-withdrawals":
        return pendingWithdrawals;
      case "approved-withdrawals":
        return approvedWithdrawals;
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
      default:
        return "No data found";
    }
  };

  const isPendingTab = activeTab.includes("pending");
  const isWithdrawalTab = activeTab.includes("withdrawals");

  return (
    <div className=" bg-gray-900 min-h-screen">
      <Navbar/>
      <div className="max-w-7xl mx-auto mt-[7vh] *:p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllTransactions}
              disabled={isRefreshing}
              className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
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
                  Refresh
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
              activeTab === "pending-deposits"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("pending-deposits")}
          >
            Pending Deposits
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
              activeTab === "approved-deposits"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("approved-deposits")}
          >
            Approved Deposits
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
              activeTab === "pending-withdrawals"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("pending-withdrawals")}
          >
            Pending Withdrawals
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
              activeTab === "approved-withdrawals"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("approved-withdrawals")}
          >
            Approved Withdrawals
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {getLoadingState() ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-400">Loading transactions...</p>
            </div>
          ) : getCurrentTransactions().length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {getEmptyMessage()}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    {isWithdrawalTab && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Bank Details
                      </th>
                    )}
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Payment Proof
                    </th>
                    {isPendingTab && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {getCurrentTransactions().map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-300 font-medium">
                              {transaction.user?.username
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {transaction.user?.username}
                            </div>
                            <div className="text-sm text-gray-400">
                              {transaction.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          ₹{transaction.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                        {transaction.transactionId || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === "APPROVED"
                              ? "bg-green-900 text-green-100"
                              : transaction.status === "PENDING"
                              ? "bg-yellow-900 text-yellow-100"
                              : "bg-red-900 text-red-100"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      {isWithdrawalTab && (
                        <td className="px-4 py-3 whitespace-nowrap">
                          {transaction.user.BankDetails ? (
                            <button
                              onClick={() => 
                                transaction.user.BankDetails && 
                                openBankDetailsModal(transaction.user.BankDetails)
                              }
                              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                            >
                              View Details
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() =>
                            openImageModal(transaction.paymentScreenshot)
                          }
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          View Proof
                        </button>
                      </td>
                      {isPendingTab && (
                        <td className="px-4 py-3 whitespace-nowrap space-x-2">
                          <button
                            onClick={() =>
                              handleApprove(
                                activeTab.includes("deposit")
                                  ? "deposit"
                                  : "withdrawal",
                                transaction._id,
                                transaction.user._id
                              )
                            }
                            className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600 text-sm transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleReject(
                                activeTab.includes("deposit")
                                  ? "deposit"
                                  : "withdrawal",
                                transaction._id,
                                transaction.user._id
                              )
                            }
                            className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 text-sm transition-colors"
                          >
                            Reject
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl border border-gray-700">
              <div className="flex justify-between items-center border-b border-gray-700 p-4">
                <h3 className="text-lg font-medium text-white">
                  Payment Screenshot
                </h3>
                <button
                  onClick={closeImageModal}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedImage}
                  alt="Payment proof"
                  className="max-w-full h-auto mx-auto rounded-md border border-gray-700"
                />
              </div>
              <div className="border-t border-gray-700 p-4 flex justify-end">
                <button
                  onClick={closeImageModal}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bank Details Modal */}
        {selectedBankDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-xl border border-gray-700">
              <div className="flex justify-between items-center border-b border-gray-700 p-4">
                <h3 className="text-lg font-medium text-white">
                  Bank Details
                </h3>
                <button
                  onClick={closeBankDetailsModal}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Bank Name</p>
                  <p className="text-white font-medium">{selectedBankDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Holder Name</p>
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
              <div className="border-t border-gray-700 p-4 flex justify-end">
                <button
                  onClick={closeBankDetailsModal}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;