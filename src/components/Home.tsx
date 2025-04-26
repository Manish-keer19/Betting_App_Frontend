import React from "react";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      className="
    "
    >
      <Navbar />
      <div className="flex flex-col items-center mt-[10vh]">
        <h1 className="text-4xl font-bold">Welcome to BeatABack</h1>
        <p className="text-lg">
          Discover the latest and greatest games, reviews, and news in the
          gaming world.
        </p>

        <Link
          to={"/head-tail"}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Head Tail Game
        </Link>
      </div>
    </div>
  );
};

export default Home;
