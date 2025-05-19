// import { useTheme } from "../../utils/ThemeContext"; // Adjust the import path as needed
// import { Link } from "react-router-dom";

// function Allgames() {
//   const { theme } = useTheme();

//   // Style classes based on theme
//   const cardClass =
//     theme === "black"
//       ? "bg-green-100 border-green-300 text-green-900"
//       : "bg-gray-800 border-gray-700 text-white";

//   const buttonClass =
//     theme === "black"
//       ? "bg-green-600 hover:bg-green-700 text-white"
//       : "bg-blue-600 hover:bg-blue-700 text-white";

//   const titleClass = theme === "black" ? "text-green-800" : "text-white";

//   return (
//     <div className="container mx-auto px-4 py-8 mt-14">
//       <h1 className={`text-4xl font-bold mb-8 text-center ${titleClass}`}>
//         Our Games Collection
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Head-Tail Game Card */}
//         <div
//           className={`rounded-lg shadow-xl overflow-hidden border-2 ${cardClass} transition-transform hover:scale-95`}
//         >
//           <div className="p-6">
//             <h2
//               className={`text-2xl font-semibold mb-4 ${
//                 theme === "black" ? "text-green-900" : "text-white"
//               }`}
//             >
//               Head or Tail
//             </h2>
//             <p
//               className={`mb-6 ${
//                 theme === "black" ? "text-green-800" : "text-gray-300"
//               }`}
//             >
//               Test your luck with this classic coin flip game. Choose heads or
//               tails and see if you win!
//             </p>
//             <div className="flex justify-center">
//               <Link
//                 to="/head-tail"
//                 className={`px-6 py-3 rounded-full font-bold ${buttonClass} transition-colors duration-300`}
//               >
//                 Play Now
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Wheel Game Card */}
//         <div
//           className={`rounded-lg shadow-xl overflow-hidden border-2 ${cardClass} transition-transform hover:scale-95`}
//         >
//           <div className="p-6">
//             <h2
//               className={`text-2xl font-semibold mb-4 ${
//                 theme === "black" ? "text-green-900" : "text-white"
//               }`}
//             >
//               Wheel of Fortune
//             </h2>
//             <p
//               className={`mb-6 ${
//                 theme === "black" ? "text-green-800" : "text-gray-300"
//               }`}
//             >
//               Spin the wheel and win amazing prizes! A game of chance that's
//               exciting every time.
//             </p>
//             <div className="flex justify-center">
//               <Link
//                 to="/wheel-game"
//                 className={`px-6 py-3 rounded-full font-bold ${buttonClass} transition-colors duration-300`}
//               >
//                 Play Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Additional decorative elements */}
//       <div
//         className={`mt-16 text-center ${
//           theme === "black" ? "text-green-800" : "text-gray-400"
//         }`}
//       >
//         <p className="text-lg">More exciting games coming soon!</p>
//         <div className="flex justify-center space-x-4 mt-4">
//           <div className="w-8 h-8 rounded-full bg-current opacity-60"></div>
//           <div className="w-8 h-8 rounded-full bg-current opacity-40"></div>
//           <div className="w-8 h-8 rounded-full bg-current opacity-20"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Allgames;



import { useTheme } from "../../utils/ThemeContext"; // Adjust the import path as needed
import { Link } from "react-router-dom";

function Allgames() {
  const { theme } = useTheme();

  // Style classes based on theme
  const cardClass =
    theme === "black"
      ? "bg-green-100 border-green-300 text-green-900"
      : "bg-gray-800 border-gray-700 text-white";

  const buttonClass =
    theme === "black"
      ? "bg-green-600 hover:bg-green-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  const titleClass = theme === "black" ? "text-green-800" : "text-white";

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <h1 className={`text-4xl font-bold mb-8 text-center ${titleClass}`}>
        Our Games Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Head-Tail Game Card */}
        <div
          className={`rounded-lg shadow-xl overflow-hidden border-2 ${cardClass} transition-transform hover:scale-95`}
        >
          <div className="p-6">
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "black" ? "text-green-900" : "text-white"
              }`}
            >
              Head or Tail
            </h2>
            <p
              className={`mb-6 ${
                theme === "black" ? "text-green-800" : "text-gray-300"
              }`}
            >
              Test your luck with this classic coin flip game. Choose heads or
              tails and see if you win!
            </p>
            <div className="flex justify-center">
              <Link
                to="/head-tail"
                className={`px-6 py-3 rounded-full font-bold ${buttonClass} transition-colors duration-300`}
              >
                Play Now
              </Link>
            </div>
          </div>
        </div>

        {/* Wheel Game Card */}
        <div
          className={`rounded-lg shadow-xl overflow-hidden border-2 ${cardClass} transition-transform hover:scale-95`}
        >
          <div className="p-6">
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "black" ? "text-green-900" : "text-white"
              }`}
            >
              Wheel of Fortune
            </h2>
            <p
              className={`mb-6 ${
                theme === "black" ? "text-green-800" : "text-gray-300"
              }`}
            >
              Spin the wheel and win amazing prizes! A game of chance that's
              exciting every time.
            </p>
            <div className="flex justify-center">
              <Link
                to="/wheel-game"
                className={`px-6 py-3 rounded-full font-bold ${buttonClass} transition-colors duration-300`}
              >
                Play Now
              </Link>
            </div>
          </div>
        </div>

        {/* Trade Game Card */}
        <div
          className={`rounded-lg shadow-xl overflow-hidden border-2 ${cardClass} transition-transform hover:scale-95`}
        >
          <div className="p-6">
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "black" ? "text-green-900" : "text-white"
              }`}
            >
              Risefall Game
            </h2>
            <p
              className={`mb-6 ${
                theme === "black" ? "text-green-800" : "text-gray-300"
              }`}
            >
              Predict whether the candle will go up 📈 or down 📉 in the next
              30-second market round. A thrilling, fast-paced trading experience
              based on real-time strategy and timing.
            </p>
            <div className="flex justify-center">
              <Link
                to="/forex-game"
                className={`px-6 py-3 rounded-full font-bold ${buttonClass} transition-colors duration-300`}
              >
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div
        className={`mt-16 text-center ${
          theme === "black" ? "text-green-800" : "text-gray-400"
        }`}
      >
        <p className="text-lg">More exciting games coming soon!</p>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="w-8 h-8 rounded-full bg-current opacity-60"></div>
          <div className="w-8 h-8 rounded-full bg-current opacity-40"></div>
          <div className="w-8 h-8 rounded-full bg-current opacity-20"></div>
        </div>
      </div>
    </div>
  );
}

export default Allgames;
