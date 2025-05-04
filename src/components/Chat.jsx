import React from "react";
import Sidebar from "./Sidebar";
import MessageRoom from "./MessageRoom";

export default function Chat() {
  return (
    <div className="mt-16 h-[calc(100vh-4rem)] flex ">
      {/* — Sidebar (left) */}
      <Sidebar />

      {/* — Main area (right) */}
      <main className="flex-1 bg-white overflow-hidden h-full mr-5">
        {/* Your single component here */}
        <MessageRoom/>
      </main>
    </div>
  );
}
