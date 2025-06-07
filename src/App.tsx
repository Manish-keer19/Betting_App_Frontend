import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Profile } from "./components/Profile";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import { Toaster } from "react-hot-toast";
import AdminDashboard from "./Admin/AdminDashboard";
import HeadTailGame from "./components/Games/HeadTailGame";
import NotFound from "./components/NotFound";
import Allgames from "./components/Games/Allgames";
import ResetPassword from "./components/Profile/ResetPassword";
// import BettingUI from "./components/Games/BettingUI";
import WheelGame from "./components/Games/WheelGame/WheelGame";
import Navbar from "./components/Navbar";
import ForexTradingApp from "./components/Games/ForexTrading/ForexTradingApp";

import { Toaster } from "sonner";
import ColorGame from "./components/Games/ColorTrading/ColorGame";
// import {ForexTradingApp} from "./components/Games/ForexTrading/ForexTradingApp";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
    {
      path: "/head-tail",
      element: <HeadTailGame />,
    },
    

    {
      path: "/games",
      // element: <Allgames  />,
      element: (
        <>
          <Navbar />
          <Allgames />
        </>
      ),
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/forex-game",
      element: <ForexTradingApp />,
    },
    {
      path: "/wheel-game",
      element: <WheelGame />,
    },
    {
      path: "/color-trading",
      element: <ColorGame    />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Provider store={store} >
      <RouterProvider router={route} />

      {/* <Toaster richColors position="top-right" duration={2900}  /> */}
      {/* <Toaster richColors position="bottom-center" duration={2900} /> */}
      <Toaster
    
        richColors
        position="top-center" // or "bottom-center" for better mobile UX
        duration={2900}
        
        toastOptions={{
          style: {
            maxWidth: "90vw", // Responsive width
            wordWrap: "break-word", // Prevent overflow
            fontSize: "0.9rem", // Slightly smaller text
          },
        }}
      />
    </Provider>
  );
}

export default App;
