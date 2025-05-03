import { Link } from "react-router-dom";
import {
  MessageSquareText,
  UserCircle2,
  LogOut,
  HomeIcon,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-gray-800  w-full">
      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="text-lg text-gray-600">
          Ready to jump back into your conversations?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        <Link
          to="/chat"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition inline-flex items-center gap-2 font-bold"
        >
          <MessageSquareText className="w-5 h-5" />
          Go to Chat
        </Link>
      </div>

      {/* Optional: Stats or Overview */}
      <div className="mt-12 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow flex gap-2 hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white">
          <HomeIcon />
          <h2 className="text-lg font-semibold">Personal Rooms Available</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex gap-2 hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white">
          <Users />
          <h2 className="text-lg font-semibold">Connect With friends</h2>
        </div>
      </div>
    </div>
  );
}
