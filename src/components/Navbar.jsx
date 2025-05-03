import React from "react";
import { Button } from "./ui/button";
import { LogOut, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/services/appAPI";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const [logout, { isLoading, error }] = useLogoutMutation();
  const handleLogout = async () => {
    const res = await logout();
    if (res?.data?.success) {
      console.log(res?.data);
      toast.success(res?.data?.msg);
      window.location.href = "/login";
    } else {
      toast.error(error?.data?.msg);
    }
  };
  return (
    <>
      <div className="w-full flex items-center justify-around  gap-5 h-16 z-20 fixed top:0 shadow">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src="/ByteChat.svg"
              alt=""
              className="rounded-full h-16 w-16"
            />
            <span className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
              ByteChat
            </span>
          </div>
        </Link>
        {user ? (
          <div className="flex gap-4">
            <div>
              <Link to="/chat">
                <Button className="bg-gradient-to-r from-blue-500 to-green-600 cursor-pointer">
                  <MessageCircle />
                  Chat
                </Button>
              </Link>
            </div>
            <div>
              <Button
                className="bg-gradient-to-r from-red-500 to-pink-600 cursor-pointer"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <LogOut />
                {isLoading ? (
                  <PulseLoader color="#ffffff" size={5} />
                ) : (
                  "Logout"
                )}
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
