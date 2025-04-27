import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundColor: "#161d29" }}
    >
      <h1 className="text-white text-4xl font-bold animate-bounce mb-8">
        404 - Page Not Found
      </h1>
      <Link
        to="/"
        className="text-blue-500 text-lg font-medium hover:underline"
      >
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFound;