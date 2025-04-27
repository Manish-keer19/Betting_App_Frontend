import { useState } from 'react';
import { motion } from 'framer-motion';
import { GiCardRandom, GiCoins } from 'react-icons/gi';
import { FaChess, FaDice } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import HeadTailGame from './HeadTailGame';
import { IoPrism } from "react-icons/io5";

 export const Allgames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'head-tail',
      name: 'Head & Tail',
      icon: <GiCoins className="text-yellow-500 text-3xl" />,
      description: 'Classic coin flip game with instant results',
      color: 'bg-gradient-to-r from-yellow-500 to-amber-600'
    },
    {
      id: 'dice-roll',
      name: 'Dice Roll',
      icon: <FaDice className="text-blue-500 text-3xl" />,
      description: 'Roll virtual dice for exciting outcomes',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600'
    },
    {
      id: 'slot-machine',
      name: 'Slot Machine',
      icon: <IoPrism className="text-red-500 text-3xl" />,
      description: 'Spin to win with our virtual slots',
      color: 'bg-gradient-to-r from-red-500 to-pink-600'
    },
    {
      id: 'card-game',
      name: 'Card Game',
      icon: <GiCardRandom className="text-green-500 text-3xl" />,
      description: 'Try your luck with random card draws',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600'
    },
    {
      id: 'mini-chess',
      name: 'Mini Chess',
      icon: <FaChess className="text-purple-500 text-3xl" />,
      description: 'Quick chess challenges',
      color: 'bg-gradient-to-r from-purple-500 to-violet-600'
    }
  ];

  const renderGame = (gameId: string) => {
    switch (gameId) {
      case 'head-tail':
        return <HeadTailGame />;
      case 'dice-roll':
        return <HeadTailGame />;
      case 'slot-machine':
        return <HeadTailGame />;
      case 'card-game':
        return <HeadTailGame />;
      case 'mini-chess':
        return <HeadTailGame />;
      default:
        return <GameSelection setActiveGame={setActiveGame} games={games} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {activeGame ? (
          <div>
            <button 
              onClick={() => setActiveGame(null)}
              className="flex items-center mb-6 text-gray-300 hover:text-white transition-colors"
            >
              <IoIosArrowForward className="transform rotate-180 mr-1" />
              Back to all games
            </button>
            {renderGame(activeGame)}
          </div>
        ) : (
          <GameSelection setActiveGame={setActiveGame} games={games} />
        )}
      </div>
    </div>
  );
};

const GameSelection = ({ setActiveGame, games }: { setActiveGame: (game: string) => void, games: any[] }) => (
  <div>
    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
      Choose Your Game
    </h1>
    <p className="text-gray-400 mb-8">Select from our exciting collection of games</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <motion.div
          key={game.id}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveGame(game.id)}
          className={`p-6 rounded-xl cursor-pointer transition-all ${game.color} bg-opacity-10 hover:bg-opacity-20 border border-gray-800 hover:border-gray-700`}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${game.color} bg-opacity-20`}>
              {game.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{game.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{game.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
