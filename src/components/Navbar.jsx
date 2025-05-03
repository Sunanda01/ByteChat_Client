import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/services/appAPI";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const [logout, { isLoading, error }] = useLogoutMutation();
  const handleLogout = async () => {
    const res = await logout();
    if (res?.data?.success) {
      console.log(res?.data)
      toast.success(res?.data?.msg);
      window.location.href = "/login";
    } else {
      toast.error(error?.data?.msg);
    }
  };
  return (
    <>
      <div className="w-full flex items-center justify-around  gap-5 h-16 z-20 fixed top:0 shadow">
        <div className="flex items-center gap-2">
          <img src="/ByteChat.svg" alt="" className="rounded-full h-16 w-16" />
          <span className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
            ByteChat
          </span>
        </div>
        {user ? (
          <div>
            <Button
              className="bg-gradient-to-r from-red-500 to-pink-600 cursor-pointer"
              onClick={handleLogout}
              disable={isLoading}
            >
              {isLoading ? <PulseLoader color="#ffffff" size={5} /> : "Logout"}
              <LogOut />
            </Button>
          </div>
        ) : ''}
      </div>
    </>
  );
}
