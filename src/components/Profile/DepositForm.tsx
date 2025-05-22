import { useState, useRef, ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";
import { useSelector } from "react-redux";
import { userService } from "../../Services/userService";

type DepositFormProps = {
  theme: "green" | "black";
};

type Deposit = {
  _id: string;
  amount: number;
  transactionId: string;
  screenshotUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export const DepositForm = ({ theme }: DepositFormProps) => {
  const [amount, setAmount] = useState<number>(300);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"deposit" | "history">("deposit");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: any) => state.user);
  const isGreenTheme = theme === "green";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      setPaymentScreenshot(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPaymentScreenshot(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitDeposit = async () => {
    if (!paymentScreenshot) {
      toast.error("Please upload payment screenshot");
      return;
    }

    if (!transactionId) {
      toast.error("Please enter transaction ID");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("amount", amount.toString());
      formData.append("transactionId", transactionId);
      formData.append("image", paymentScreenshot);

      const response = await userService.depositMoney(formData, user.token);

      if (response.success) {
        toast.success("Deposit submitted successfully!");
        setAmount(100);
        setTransactionId("");
        setPaymentScreenshot(null);
        setPreviewImage(null);
        setShowPaymentDetails(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchDeposits(); // Refresh history after successful deposit
        setActiveTab("history");
      } else {
        toast.error(response.message || "Deposit submission failed");
      }
    } catch (error) {
      toast.error("An error occurred while submitting deposit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchDeposits = async () => {
    setLoading(true);
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

  useEffect(() => {
    if (user?._id && user?.token && activeTab === "history") {
      fetchDeposits();
    }
  }, [activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
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

  return (
    <div className="max-w-md mx-auto bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-lg">
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "deposit"
              ? isGreenTheme
                ? "text-green-400 border-b-2 border-green-400"
                : "text-white border-b-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit Money
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

      {activeTab === "deposit" ? (
        <div className="space-y-6">
          {!showPaymentDetails ? (
            <>
              <div
                className={`p-4 mb-4 rounded-lg ${
                  isGreenTheme ? "bg-green-900 bg-opacity-30" : "bg-gray-800"
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 p-1 rounded-full ${
                      isGreenTheme ? "bg-green-500" : "bg-gray-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/3000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        isGreenTheme ? "text-green-300" : "text-gray-300"
                      }`}
                    >
                      Deposit Bonus & Processing Time
                    </h3>
                    <div className="mt-1 text-sm text-gray-300">
                      <p>• Get 5% bonus on all deposits</p>
                      <p>
                        • Deposits take 15-30 minutes to reflect in your wallet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (Minimum 300)
                  </label>
                  <input
                    type="tel"
                    onChange={(e) =>
                      setAmount(e.target.value ? Number(e.target.value) : 0)
                    }
                    value={amount}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  onClick={() => {
                    if (amount < 300) {
                      toast.error("Minimum deposit amount is 300");
                      return;
                    }
                    setShowPaymentDetails(true);
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${
                    isGreenTheme
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  Proceed to Pay ₹{amount}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6 p-4 bg-gray-800 rounded-lg">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Payment Instructions
                </h3>
                <div className="p-4 bg-white rounded-lg">
                  <QRCodeSVG
                    // value={`upi://pay?pa=your-upi-id@oksbi&pn=YourAppName&am=${amount}&cu=INR`}
                    value={`upi://pay?pa=ameyalaadd@ibl&pn=YourAppName&am=${amount}&cu=INR`}
                    size={180}
                  />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-lg font-medium text-white">₹{amount}</p>
                  {/* <p className="text-gray-300">UPI ID: your-upi-id@oksbi</p> */}
                  <p className="text-sm text-gray-400 mt-2">
                    Please complete the payment and submit the screenshot below
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter transaction ID from payment app"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payment Screenshot (Max 2MB)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                      <div className="flex flex-col items-center justify-center py-6">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/3000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-400 mt-2">
                          {previewImage ? "Change image" : "Click to upload"}
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>

                  {previewImage && (
                    <div className="mt-4 relative group">
                      <img
                        src={previewImage}
                        alt="Payment preview"
                        className="w-full h-auto max-h-64 rounded-lg border border-gray-600 object-contain"
                      />
                      <button
                        onClick={removeImage}
                        className={`absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                          isGreenTheme
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/3000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPaymentDetails(false)}
                    className={`flex-1 py-2 rounded-lg font-medium ${
                      isGreenTheme
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitDeposit}
                    disabled={isSubmitting}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      isGreenTheme
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/3000/svg"
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
                        Processing...
                      </span>
                    ) : (
                      "Submit Payment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : deposits.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No deposit history found
            </div>
          ) : (
            <div className="space-y-3">
              {deposits.map((deposit) => (
                <div
                  key={deposit._id}
                  className={`p-4 rounded-lg ${
                    isGreenTheme
                      ? "bg-green-900 bg-opacity-30"
                      : "bg-gray-800 bg-opacity-50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-semibold">
                          ₹{deposit.amount.toLocaleString()}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            deposit.status
                          )}`}
                        >
                          {deposit.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">
                        <span className="font-medium">Transaction ID:</span>{" "}
                        {deposit.transactionId}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(deposit.createdAt)}
                      </p>
                    </div>

                    {deposit.screenshotUrl && (
                      <a
                        href={deposit.screenshotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <img
                          src={deposit.screenshotUrl}
                          alt="Payment Screenshot"
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-600"
                        />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
