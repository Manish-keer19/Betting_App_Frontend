import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Profile } from "./components/Profile";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./Admin/AdminDashboard";
import HeadTailGame from "./components/Games/HeadTailGame";
import NotFound from "./components/NotFound";
import Allgames from "./components/Games/Allgames";
import ResetPassword from "./components/Profile/ResetPassword";
// import BettingUI from "./components/Games/BettingUI";
import WheelGame from "./components/Games/WheelGame/WheelGame";
import Navbar from "./components/Navbar";
  

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
  )

    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/wheel-game",
      element: <WheelGame  />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={route} />
      <Toaster />
    </Provider>
  );
}

export default App;
