// import React from "react";

// import Navbar from "./Navbar";
// import { Link } from "react-router-dom";


// import { useSelector } from "react-redux";
// import Allgames from "./Games/Allgames";

// const Home: React.FC = () => {

//   const user =useSelector((state: any) => state.user);
//   return (
//     <div
//       className="
//     "
//     >
//       <Navbar />
//       <div className="flex flex-col items-center mt-[10vh]">
//         <h1 className="text-4xl font-bold">Welcome to BeatABack</h1>
//         <p className="text-lg">
//           Discover the latest and greatest games, reviews, and news in the
//           gaming world.
//         </p>


//         {
//           user&&(
//             <Allgames
//             />
//           )
//         }

       
//       </div>
//     </div>
//   );
// };

// export default Home;



import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Allgames from "./Games/Allgames";

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar   />
      
      <div className="container mx-auto px-4 py-12 mt-[8vh]">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">BeatABack</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the latest and greatest games, reviews, and news in the gaming world.
          </p>
          
          {!user && (
            <div className="flex justify-center gap-4">
              <Link 
                to="/login" 
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-bold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full font-bold hover:bg-blue-400 hover:text-white transition-all transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </section>

        {/* Featured Games Section */}
        {user && (
          <section className="mb-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                All <span className="text-blue-400">Games</span>
              </h2>
              <Link 
                to="/games" 
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* <Allgames/> */}

            <Allgames />
          </section>
        )}

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all transform hover:-translate-y-2 border-l-4 border-blue-500">
            <div className="text-blue-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Exciting Games</h3>
            <p className="text-gray-400">Discover our collection of thrilling games with amazing rewards.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all transform hover:-translate-y-2 border-l-4 border-purple-500">
            <div className="text-purple-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m8-8v13m-8-8h8m-8 0H4m0-8h8m-8 0H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Fair Play</h3>
            <p className="text-gray-400">Provably fair system ensures transparent and honest gameplay.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all transform hover:-translate-y-2 border-l-4 border-green-500">
            <div className="text-green-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-400">Fast and secure deposit and withdrawal options available.</p>
          </div>
        </section>

        {/* Call to Action */}
        {!user && (
          <section className="text-center py-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players enjoying our games every day. Register now and get started!
            </p>
            <Link 
              to="/register" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-bold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started - It's Free
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;