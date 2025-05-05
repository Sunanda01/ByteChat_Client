import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Menu, MessageCircle, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/services/appAPI";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [logout, { isLoading, error }] = useLogoutMutation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = async () => {
    const res = await logout(user?.user);
    if (res?.data?.success) {
      toast.success(res?.data?.msg);
      window.location.href = "/login";
    } else {
      toast.error(error?.data?.msg);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full flex items-center justify-between h-16 z-20 fixed top-0 shadow bg-white px-4">
        {/* Left: Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src="/ByteChat.svg"
              alt="Logo"
              className="rounded-full h-12 w-12"
            />
            <span className="font-extrabold text-transparent bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text hidden md:block lg:text-3xl md:text-2xl">
              Connect With ByteChat
            </span>
            <span className="font-bold text-transparent bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-2xl md:hidden">
              ByteChat
            </span>
          </div>
        </Link>

        {/* Right: Menu */}
        {user && (
          <>
            {/* Desktop */}
            <div className="hidden md:flex gap-4">
              <Link to="/chat">
                <Button className="bg-gradient-to-r from-blue-500 to-green-600">
                  <MessageCircle className="mr-1" />
                  Chat
                </Button>
              </Link>
              <Button
                className="bg-gradient-to-r from-red-500 to-pink-600"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <LogOut className="mr-1" />
                {isLoading ? (
                  <PulseLoader color="#ffffff" size={5} />
                ) : (
                  "Logout"
                )}
              </Button>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              <Menu
                className="h-7 w-7 cursor-pointer"
                onClick={() => setOpenDrawer(true)}
              />
            </div>
          </>
        )}
      </div>

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          openDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-xl font-bold text-gray-800">Menu</span>
          <X
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => setOpenDrawer(false)}
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <Link to="/chat" onClick={() => setOpenDrawer(false)}>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-green-600">
              <MessageCircle className="mr-1" />
              Chat
            </Button>
          </Link>
          <Button
            className="w-full bg-gradient-to-r from-red-500 to-pink-600"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogOut className="mr-1" />
            {isLoading ? <PulseLoader color="#ffffff" size={5} /> : "Logout"}
          </Button>
        </div>
      </div>
    </>
  );
}
