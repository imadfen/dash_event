import { useNavigate } from "react-router-dom";
import dashSad from "../assets/dash_sad.png";

export default function NoPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={dashSad} alt="" width={300} />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}
