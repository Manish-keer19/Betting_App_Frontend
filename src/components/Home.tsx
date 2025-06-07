

// // import React, { useEffect } from "react";
// // import Navbar from "./Navbar";
// // import { Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import Allgames from "./Games/Allgames";

// // import { motion } from "framer-motion";
// // import { FiArrowRight, FiAward, FiShield, FiDollarSign } from "react-icons/fi";
// // import axiosInstance from "../Services/axiosInstance";

// // const Home: React.FC = () => {
// //   const user = useSelector((state: any) => state.user);

// //   // In App.tsx or useEffect of your landing page
// //   useEffect(() => {
// //     axiosInstance
// //       .get("/ping")
// //       .then((res) => {
// //         console.log(res.data);
// //       })
// //       .catch((er) => {
// //         console.log(
// //           "Backend not reachable",
// //           er.response ? er.response.data : er.message
// //         );
// //       });
// //   }, []);

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         delayChildren: 0.3,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { y: 20, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.5,
// //       },
// //     },
// //   };

// //   const featureCards = [
// //     {
// //       icon: <FiAward className="w-8 h-8" />,
// //       title: "Exciting Games",
// //       description:
// //         "Discover our collection of thrilling games with amazing rewards.",
// //       color: "from-blue-500 to-blue-600",
// //     },
// //     {
// //       icon: <FiShield className="w-8 h-8" />,
// //       title: "Fair Play",
// //       description:
// //         "Provably fair system ensures transparent and honest gameplay.",
// //       color: "from-purple-500 to-purple-600",
// //     },
// //     {
// //       icon: <FiDollarSign className="w-8 h-8" />,
// //       title: "Secure Payments",
// //       description: "Fast and secure deposit and withdrawal options available.",
// //       color: "from-green-500 to-green-600",
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
// //       <Navbar />

// //       <div className="container mx-auto px-4 py-12 mt-[8vh]">
// //         {/* Hero Section */}
// //         <motion.section
// //           className="text-center mb-20"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <motion.h1
// //             className="text-5xl md:text-7xl font-bold mb-6"
// //             initial={{ y: -50, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             Welcome to{" "}
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
// //               Manish's Bet App
// //             </span>
// //           </motion.h1>

// //           <motion.p
// //             className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.3, duration: 0.8 }}
// //           >
// //             Experience the ultimate gaming platform with cutting-edge games,
// //             fair play, and instant rewards.
// //           </motion.p>

// //           {!user && (
// //             <motion.div
// //               className="flex flex-col sm:flex-row justify-center gap-4"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.5, duration: 0.5 }}
// //             >
// //               <Link
// //                 to="/login"
// //                 className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-bold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
// //               >
// //                 Get Started
// //                 <FiArrowRight />
// //               </Link>
// //               <Link
// //                 to="/signup"
// //                 className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-bold hover:bg-blue-400/10 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
// //               >
// //                 Create Account
// //               </Link>
// //             </motion.div>
// //           )}
// //         </motion.section>

// //         {/* Featured Games Section */}
// //         {user && (
// //           <motion.section
// //             className="mb-24"
// //             initial={{ opacity: 0 }}
// //             whileInView={{ opacity: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             <div className="flex flex-col md:flex-row justify-between items-center mb-12">
// //               <h2 className="text-4xl font-bold mb-4 md:mb-0">
// //                 Featured{" "}
// //                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
// //                   Games
// //                 </span>
// //               </h2>
// //               <Link
// //                 to="/games"
// //                 className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
// //               >
// //                 <span className="mr-2 group-hover:mr-3 transition-all">
// //                   Explore All Games
// //                 </span>
// //                 <FiArrowRight className="transition-transform group-hover:translate-x-1" />
// //               </Link>
// //             </div>

// //             <Allgames />


// //           </motion.section>
// //         )}

// //         {/* Features Section */}
// //         <motion.section
// //           className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           {featureCards.map((feature, index) => (
// //             <motion.div
// //               key={index}
// //               variants={itemVariants}
// //               className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-transparent relative overflow-hidden group"
// //             >
// //               <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-blue-500 to-purple-600"></div>
// //               <div
// //                 className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r ${feature.color} text-white`}
// //               >
// //                 {feature.icon}
// //               </div>
// //               <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
// //               <p className="text-gray-400">{feature.description}</p>
// //               <div
// //                 className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${feature.color}`}
// //               ></div>
// //             </motion.div>
// //           ))}
// //         </motion.section>

// //         {/* Call to Action */}
// //         {!user && (
// //           <motion.section
// //             className="text-center py-16 px-6 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 rounded-3xl mb-16 backdrop-blur-sm border border-gray-700/50"
// //             initial={{ opacity: 0, y: 50 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             <h2 className="text-4xl font-bold mb-6">Ready to Play?</h2>
// //             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
// //               Join our community of gamers and start winning today. No
// //               experience needed!
// //             </p>
// //             <div className="flex flex-col sm:flex-row justify-center gap-4">
// //               <Link
// //                 to="/signup"
// //                 className=" px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-bold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/30  items-center justify-center gap-2 flex"
// //               >
// //                 Sign Up Free
// //                 <FiArrowRight />
// //               </Link>
// //               {/* <Link 
// //                 to="/signup" 
// //                 className="inline-block px-8 py-4 border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-white/10"
// //               >
// //                 Explore Games
// //               </Link> */}
// //             </div>
// //           </motion.section>
// //         )}

// //         {/* Stats Section */}
// //         <motion.section
// //           className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           {[
// //             { number: "10K+", label: "Active Players" },
// //             { number: "99.9%", label: "Uptime" },
// //             { number: "Instant", label: "Withdrawals" },
// //             { number: "24/7", label: "Support" },
// //           ].map((stat, index) => (
// //             <motion.div
// //               key={index}
// //               variants={itemVariants}
// //               className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all text-center"
// //             >
// //               <div className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
// //                 {stat.number}
// //               </div>
// //               <div className="text-gray-400">{stat.label}</div>
// //             </motion.div>
// //           ))}
// //         </motion.section>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;




// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Allgames from "./Games/Allgames";
// import { motion } from "framer-motion";
// import { FiArrowRight, FiAward, FiShield, FiDollarSign, FiClock, FiUsers, FiZap, FiGithub, FiLink, FiMail } from "react-icons/fi";
// import axiosInstance from "../Services/axiosInstance";

// interface GitHubUser {
//   login: string;
//   name: string;
//   avatar_url: string;
//   bio: string;
//   html_url: string;
//   blog?: string;
//   public_repos: number;
//   followers: number;
//   following: number;
// }

// const Home: React.FC = () => {
//   const user = useSelector((state: any) => state.user);
//   const [developer, setDeveloper] = useState<GitHubUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Ping backend
//     axiosInstance
//       .get("/ping")
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((er) => {
//         console.log(
//           "Backend not reachable",
//           er.response ? er.response.data : er.message
//         );
//       });

//     // Fetch GitHub profile
//     fetch('https://api.github.com/users/manish-keer19')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch GitHub profile');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setDeveloper(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   const featureCards = [
//     {
//       icon: <FiAward className="w-6 h-6" />,
//       title: "Premium Games",
//       description: "Exclusive high-stakes games with massive rewards",
//       color: "bg-gradient-to-br from-indigo-500 to-purple-600",
//     },
//     {
//       icon: <FiShield className="w-6 h-6" />,
//       title: "Provably Fair",
//       description: "Blockchain-verified fairness in every game",
//       color: "bg-gradient-to-br from-blue-500 to-indigo-600",
//     },
//     {
//       icon: <FiDollarSign className="w-6 h-6" />,
//       title: "Instant Cashouts",
//       description: "Get your winnings in seconds, not days",
//       color: "bg-gradient-to-br from-purple-500 to-pink-600",
//     },
//   ];

//   const stats = [
//     { icon: <FiUsers className="w-5 h-5" />, value: "10K+", label: "Active Players" },
//     { icon: <FiZap className="w-5 h-5" />, value: "99.9%", label: "Uptime" },
//     { icon: <FiClock className="w-5 h-5" />, value: "Instant", label: "Withdrawals" },
//     { icon: <FiShield className="w-5 h-5" />, value: "Secure", label: "Transactions" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Animated background gradient */}
//       <div className="fixed inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
//         <div className="absolute top-0 left-0 w-full h-full opacity-20">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full bg-purple-500/30"
//               style={{
//                 width: `${Math.random() * 300 + 100}px`,
//                 height: `${Math.random() * 300 + 100}px`,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 filter: 'blur(40px)'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10">
//         <Navbar />

//         <div className="container mx-auto px-4 py-12 mt-[8vh]">
//           {/* Hero Section */}
//           <motion.section
//             className="text-center mb-24 max-w-4xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.div
//               className="inline-block px-4 py-2 mb-6 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 text-sm"
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//             >
//               Welcome to ManishBetApp
//             </motion.div>

//             <motion.h1
//               className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8 }}
//             >
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
//                 Play. Win. Repeat.
//               </span>
//             </motion.h1>

//             <motion.p
//               className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//             >
//               Experience the thrill of high-stakes gaming with instant payouts and provably fair algorithms.
//             </motion.p>

//             {!user && (
//               <motion.div
//                 className="flex flex-col sm:flex-row justify-center gap-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//               >
//                 <Link
//                   to="/signup"
//                   className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-bold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
//                 >
//                   Get Started - It's Free
//                 </Link>
//                 <Link
//                   to={`${user ? "/games" : "/login"}`}
//                   className="px-8 py-4 border border-gray-600 rounded-xl font-bold hover:bg-gray-800/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
//                 >
//                   Explore Games <FiArrowRight />
//                 </Link>
//               </motion.div>
//             )}
//           </motion.section>

//           {/* Featured Games Section */}
//           {user && (
//             <motion.section
//               className="mb-24"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//                 <h2 className="text-3xl font-bold mb-4 md:mb-0">
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//                     Featured Games
//                   </span>
//                 </h2>
//                 <Link
//                   to="/games"
//                   className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
//                 >
//                   <span className="mr-2 group-hover:mr-3 transition-all">
//                     View All Games
//                   </span>
//                   <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </div>

//               <Allgames />
//             </motion.section>
//           )}

//           {/* Features Section */}
//           <motion.section
//             className="mb-32"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold mb-4">
//                 Why Players Choose Us
//               </h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 We're building the most trusted gaming platform in the world
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {featureCards.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
//                 >
//                   <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${feature.color} text-white`}>
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//                   <p className="text-gray-400">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>

//           {/* Stats Section */}
//           <motion.section
//             className="mb-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   className="text-center p-6"
//                 >
//                   <div className="flex justify-center mb-3 text-purple-400">
//                     {stat.icon}
//                   </div>
//                   <div className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//                     {stat.value}
//                   </div>
//                   <div className="text-gray-400 text-sm">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>

//           {/* Developer Section */}
//           <motion.section
//             className="mb-24"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//                   About The Developer
//                 </span>
//               </h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 Created with passion by Manish Keer
//               </p>
//             </div>

//             {loading ? (
//               <div className="flex justify-center">
//                 <div className="animate-pulse bg-gray-800/50 rounded-xl w-full max-w-md h-64"></div>
//               </div>
//             ) : error ? (
//               <div className="text-center text-red-400">
//                 Error loading developer profile: {error}
//               </div>
//             ) : developer && (
//               <motion.div
//                 className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden max-w-md mx-auto"
//                 variants={itemVariants}
//               >
//                 <div className="p-8">
//                   <div className="flex items-center mb-6">
//                     <img
//                       src={developer.avatar_url}
//                       alt={developer.name || developer.login}
//                       className="w-20 h-20 rounded-full border-2 border-purple-500/50 mr-4"
//                     />
//                     <div>
//                       <h3 className="text-xl font-bold">
//                         {developer.name || developer.login}
//                       </h3>
//                       <p className="text-gray-400">@{developer.login}</p>
//                     </div>
//                   </div>

//                   {developer.bio && (
//                     <p className="text-gray-300 mb-6">{developer.bio}</p>
//                   )}

//                   <div className="grid grid-cols-3 gap-4 mb-6">
//                     <div className="text-center">
//                       <div className="text-xl font-bold text-purple-400">{developer.public_repos}</div>
//                       <div className="text-gray-400 text-sm">Repos</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-xl font-bold text-purple-400">{developer.followers}</div>
//                       <div className="text-gray-400 text-sm">Followers</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-xl font-bold text-purple-400">{developer.following}</div>
//                       <div className="text-gray-400 text-sm">Following</div>
//                     </div>
//                   </div>

//                   <div className="flex space-x-4">
//                     <a
//                       href={developer.html_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
//                     >
//                       <FiGithub className="mr-2" /> GitHub
//                     </a>
//                     {developer.blog && (
//                       <a
//                         href={developer.blog.startsWith('http') ? developer.blog : `https://${developer.blog}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
//                       >
//                         <FiLink className="mr-2" /> Website
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </motion.section>

//           {/* Call to Action */}
//           {!user && (
//             <motion.section
//               className="text-center py-16 px-6 bg-gradient-to-r from-purple-900/40 via-blue-900/40 rounded-2xl mb-16 backdrop-blur-sm border border-gray-700/50"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-3xl font-bold mb-6">Ready to Play?</h2>
//               <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Join thousands of players winning big every day. Sign up takes less than a minute.
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <Link
//                   to="/signup"
//                   className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-bold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
//                 >
//                   Create Free Account
//                 </Link>
//               </div>
//             </motion.section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;






import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Allgames from "./Games/Allgames";
import { motion } from "framer-motion";
import { FiArrowRight, FiAward, FiShield, FiDollarSign, FiClock, FiUsers, FiZap, FiGithub,  FiGlobe } from "react-icons/fi";
import axiosInstance from "../Services/axiosInstance";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  blog?: string;
  public_repos: number;
  followers: number;
  following: number;
}

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [developer, setDeveloper] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ping backend
    axiosInstance.get("/ping").catch(console.error);

    // Fetch GitHub profile
    fetch('https://api.github.com/users/manish-keer19')
      .then(response => response.json())
      .then(data => {
        setDeveloper(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const featureCards = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Premium Games",
      description: "Exclusive high-stakes games with massive rewards",
      color: "text-purple-400",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Provably Fair",
      description: "Blockchain-verified fairness in every game",
      color: "text-blue-400",
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Instant Cashouts",
      description: "Get your winnings in seconds, not days",
      color: "text-pink-400",
    },
  ];

  const stats = [
    { icon: <FiUsers className="w-5 h-5" />, value: "10K+", label: "Active Players" },
    { icon: <FiZap className="w-5 h-5" />, value: "99.9%", label: "Uptime" },
    { icon: <FiClock className="w-5 h-5" />, value: "Instant", label: "Withdrawals" },
    { icon: <FiShield className="w-5 h-5" />, value: "Secure", label: "Transactions" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500/30"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(40px)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-12 mt-[8vh]">
          {/* Hero Section */}
          <motion.section
            className="text-center mb-24 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-2 mb-6 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 text-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to ManishBetApp
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Play. Win. Repeat.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Experience the thrill of high-stakes gaming with instant payouts and provably fair algorithms.
            </motion.p>

            {!user && (
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-bold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                  Get Started - It's Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 border border-gray-600 rounded-xl font-bold hover:bg-gray-800/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Explore Games <FiArrowRight />
                </Link>
              </motion.div>
            )}
          </motion.section>

          {/* Featured Games Section */}
          {user && (
            <motion.section
              className="mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <h2 className="text-3xl font-bold mb-4 md:mb-0">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Featured Games
                  </span>
                </h2>
                <Link
                  to="/games"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <span className="mr-2 group-hover:mr-3 transition-all">
                    View All Games
                  </span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <Allgames />
            </motion.section>
          )}

          {/* Features Section */}
          <motion.section
            className="mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Why Players Choose Us
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're building the most trusted gaming platform in the world
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            className="mb-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6"
                >
                  <div className="flex justify-center mb-3 text-purple-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Developer Section */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  About The Developer
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Created with passion by Manish Keer
              </p>
            </div>

            <div className="flex justify-center">
              {loading ? (
                <div className="animate-pulse bg-gray-800/50 rounded-xl w-full max-w-md h-64"></div>
              ) : developer ? (
                <motion.div
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden max-w-md w-full"
                  variants={itemVariants}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <img
                        src={developer.avatar_url}
                        alt={developer.name || developer.login}
                        className="w-24 h-24 rounded-full border-2 border-purple-500/50 mb-4"
                      />
                      <div>
                        <h3 className="text-xl font-bold">
                          {developer.name || developer.login}
                        </h3>
                        <p className="text-gray-400">@{developer.login}</p>
                      </div>
                    </div>

                    {developer.bio && (
                      <p className="text-gray-300 mb-6 text-center">{developer.bio}</p>
                    )}

                    <div className="flex justify-center space-x-6 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{developer.public_repos}</div>
                        <div className="text-gray-400 text-sm">Repos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{developer.followers}</div>
                        <div className="text-gray-400 text-sm">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{developer.following}</div>
                        <div className="text-gray-400 text-sm">Following</div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <a
                        href={developer.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                        aria-label="GitHub profile"
                      >
                        <FiGithub className="mr-2" /> GitHub
                      </a>
                      {developer.blog && (
                        <a
                          href={developer.blog.startsWith('http') ? developer.blog : `https://${developer.blog}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                          aria-label="Personal website"
                        >
                          <FiGlobe className="mr-2" /> Website
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-400">
                  Developer information not available
                </div>
              )}
            </div>
          </motion.section>

          {/* Call to Action */}
          {!user && (
            <motion.section
              className="text-center py-16 px-6 bg-gradient-to-r from-purple-900/40 via-blue-900/40 rounded-2xl mb-16 backdrop-blur-sm border border-gray-700/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Play?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of players winning big every day. Sign up takes less than a minute.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-bold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30"
                >
                  Create Free Account
                </Link>
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;