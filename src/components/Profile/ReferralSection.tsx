

import { useState } from "react";
// import toast from "react-hot-toast";
import {toast} from "sonner";
import {
  FaCopy,
  FaShareAlt,
  FaUserPlus,
  FaWhatsapp,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";

type ReferralData = {
  referralCode: string;
  referredBy?: string;
  balance: number;
};

export const ReferralSection = ({
  referralData,
}: {
  referralData: ReferralData;
}) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const referralLink = `${window.location.origin}/signup?ref=${referralData.referralCode}`;

  // Add image URL to include in the share message
  const referralImageUrl =
    "https://res.cloudinary.com/degag862k/image/upload/v1745825171/referral_rtgyc6.jpg"; // Replace with your image URL

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast.success("Copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy");
        console.error("Failed to copy: ", err);
      }
      document.body.removeChild(textarea);
    }
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  //   const shareVia = (method: string) => {
  //     let url = "";
  //     const message = `🚀 Join my referral program! Use my code ${referralData.referralCode} to get a bonus! 💰

  // 🔗 ${referralLink}

  // 🤝 Let's both get rewards! Here's the details:
  // 1️⃣ Share your referral code
  // 2️⃣ They sign up using your code
  // 3️⃣ You get ₹50, they get ₹30! 🎉

  // 🏆 Don't miss out on the bonus!`;

  //     switch (method) {
  //       case "whatsapp":
  //         url = `https://wa.me/?text=${encodeURIComponent(
  //           message
  //         )}&image=${encodeURIComponent(referralImageUrl)}`;
  //         break;
  //       case "telegram":
  //         url = `https://t.me/share/url?url=${encodeURIComponent(
  //           referralLink
  //         )}&text=${encodeURIComponent(message)}&photo=${encodeURIComponent(
  //           referralImageUrl
  //         )}`;
  //         break;
  //       case "email":
  //         url = `mailto:?subject=Join me on this amazing referral program!&body=${encodeURIComponent(
  //           message
  //         )}%0A${encodeURIComponent(referralImageUrl)}`;
  //         break;
  //       default:
  //         break;
  //     }

  //     window.open(url, "_blank");
  //     setShowShareOptions(false);
  //   };

  const shareVia = (method: string) => {
    let url = "";
    const message = `🚀 Join my referral program! Use my code ${referralData.referralCode} to get a bonus! 💰 
  
  🔗 ${referralLink}
  
  🤝 Let's both get rewards! Here's the details: 
  1️⃣ Share your referral code 
  2️⃣ They sign up using your code 
  3️⃣ You get ₹50, they get ₹50! 🎉
  
  🏆 Don't miss out on the bonus!`;

    switch (method) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(
          referralLink
        )}&text=${encodeURIComponent(message)}&photo=${encodeURIComponent(
          referralImageUrl
        )}`;
        break;
      case "email":
        url = `mailto:?subject=Join me on this amazing referral program!&body=${encodeURIComponent(
          message
        )}%0A${encodeURIComponent(referralImageUrl)}`;
        break;
      default:
        break;
    }

    window.open(url, "_blank");
    setShowShareOptions(false);
  };

  return (
    <div
      className={`p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-green-600 mt-6`}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaUserPlus className="mr-2" />
        Referral Program
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Code Section */}
        <div>
          <h4 className="text-lg font-medium mb-2">Your Referral Code</h4>
          <div className="flex items-center  gap-3 ">
            <div className="relative flex-1  ">
              <input
                type="text"
                value={referralData.referralCode}
                readOnly
                className="w-full bg-gray-800 border border-green-500 rounded-l-lg py-2 px-3 text-white font-mono text-lg focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(referralData.referralCode)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
              >
                <FaCopy />
              </button>
            </div>
            <button
              onClick={handleShareClick}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-r-lg flex items-center"
            >
              <FaShareAlt className="mr-2" />
              Share
            </button>
          </div>

          {showShareOptions && (
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => shareVia("whatsapp")}
                className="p-2 bg-green-800 rounded-full hover:bg-green-700 transition-colors"
                title="Share via WhatsApp"
              >
                <FaWhatsapp className="text-xl text-white" />
              </button>
              <button
                onClick={() => shareVia("telegram")}
                className="p-2 bg-green-800 rounded-full hover:bg-green-700 transition-colors"
                title="Share via Telegram"
              >
                <FaTelegram className="text-xl text-white" />
              </button>
              <button
                onClick={() => shareVia("email")}
                className="p-2 bg-green-800 rounded-full hover:bg-green-700 transition-colors"
                title="Share via Email"
              >
                <FaEnvelope className="text-xl text-white" />
              </button>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => copyToClipboard(referralLink)}
              className="text-sm text-green-400 hover:text-green-300 underline flex items-center"
            >
              <FaCopy className="mr-1" /> Copy referral link
            </button>
          </div>
        </div>

        {/* Referral Benefits Section */}
        <div>
          <h4 className="text-lg font-medium mb-2">How It Works</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                1
              </span>
              Share your referral code with friends
            </li>
            <li className="flex items-start">
              <span className=" bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                2
              </span>
              They sign up using your code
            </li>
            <li className="flex items-start">
              <span className=" bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                3
              </span>
              You get <span className="font-bold">₹50 </span> and they get{" "}
              <span className="font-bold">₹50</span> bonus!
            </li>
          </ul>

          {referralData.referredBy && (
            <div className="mt-4 p-3 bg-green-900 bg-opacity-30 rounded-lg">
              <p className="text-sm">
                You were referred by:{" "}
                <span className="font-mono font-bold">
                  {referralData.referredBy}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

