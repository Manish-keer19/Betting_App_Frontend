


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

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

//         {/* Trade Game Card */}
//         <div
//           className={`rounded-lg shadow-xl overflow-hidden border-2 ${cardClass} transition-transform hover:scale-95`}
//         >
//           <div className="p-6">
//             <h2
//               className={`text-2xl font-semibold mb-4 ${
//                 theme === "black" ? "text-green-900" : "text-white"
//               }`}
//             >
//               Risefall Game
//             </h2>
//             <p
//               className={`mb-6 ${
//                 theme === "black" ? "text-green-800" : "text-gray-300"
//               }`}
//             >
//               Predict whether the candle will go up 📈 or down 📉 in the next
//               30-second market round. A thrilling, fast-paced trading experience
//               based on real-time strategy and timing.
//             </p>
//             <div className="flex justify-center">
//               <Link
//                 to="/forex-game"
//                 className={`px-6 py-3 rounded-full font-bold ${buttonClass} transition-colors duration-300`}
//               >
//                 Start Trading
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



import { useTheme } from "../../utils/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Allgames() {
  const { theme } = useTheme();

  // Theme-based styles
  const themeStyles = {
    black: {
      card: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
      title: "text-green-800",
      text: "text-green-700",
      button: "bg-green-600 hover:bg-green-700 text-white",
      accent: "from-green-400 to-green-500",
    },
    white: {
      card: "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700",
      title: "text-white",
      text: "text-gray-300",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      accent: "from-blue-400 to-blue-500",
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.white;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-5xl font-bold mb-12 text-center ${currentTheme.title} font-montserrat`}
      >
        Our <span className={`bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.accent}`}>Games</span> Collection
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Head-Tail Game Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl shadow-2xl overflow-hidden border ${currentTheme.card} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md">
                <span className="text-2xl">🪙</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold mb-3 text-center ${currentTheme.title}`}>
              Head or Tail
            </h2>
            <p className={`mb-6 flex-grow ${currentTheme.text}`}>
              Classic coin flip game with a twist. Choose wisely and double your rewards in this simple yet exciting game of chance.
            </p>
            <div className="flex justify-center">
              <Link
                to="/head-tail"
                className={`px-6 py-3 rounded-full font-bold ${currentTheme.button} transition-all duration-300 hover:shadow-md`}
              >
                Flip Now →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Wheel Game Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl shadow-2xl overflow-hidden border ${currentTheme.card} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-2xl">🎡</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold mb-3 text-center ${currentTheme.title}`}>
              Wheel of Fortune
            </h2>
            <p className={`mb-6 flex-grow ${currentTheme.text}`}>
              Spin to win amazing prizes! Our multi-segment wheel offers thrilling rewards with every spin.
            </p>
            <div className="flex justify-center">
              <Link
                to="/wheel-game"
                className={`px-6 py-3 rounded-full font-bold ${currentTheme.button} transition-all duration-300 hover:shadow-md`}
              >
                Spin Now →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trade Game Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`rounded-2xl shadow-2xl overflow-hidden border ${currentTheme.card} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center shadow-md">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold mb-3 text-center ${currentTheme.title}`}>
              Rise & Fall
            </h2>
            <p className={`mb-6 flex-grow ${currentTheme.text}`}>
              Predict market movements in real-time. Will it rise or fall? Test your trading instincts in this fast-paced game.
            </p>
            <div className="flex justify-center">
              <Link
                to="/forex-game"
                className={`px-6 py-3 rounded-full font-bold ${currentTheme.button} transition-all duration-300 hover:shadow-md`}
              >
                Trade Now →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Color Prediction Game Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`rounded-2xl shadow-2xl overflow-hidden border ${currentTheme.card} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
                <span className="text-2xl">🎨</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold mb-3 text-center ${currentTheme.title}`}>
              Color Trading
            </h2>
            <p className={`mb-6 flex-grow ${currentTheme.text}`}>
              Predict the next color in sequence. A vibrant game of chance where colors determine your rewards.
            </p>
            <div className="flex justify-center">
              <Link
                to="/color-trading"
                className={`px-6 py-3 rounded-full font-bold ${currentTheme.button} transition-all duration-300 hover:shadow-md`}
              >
                Play Now →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Coming Soon Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-20 text-center ${currentTheme.text}`}
      >
        <p className="text-xl mb-4">More thrilling games coming soon!</p>
        <div className="flex justify-center space-x-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-3 h-3 rounded-full bg-current"
            ></motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Allgames;