import React from "react";
import Sidebar from "./Sidebar";

export default function Chat() {
  return (
    <div className="mt-16 h-[calc(100vh-4rem)] flex ">
      {/* — Sidebar (left) */}
      <Sidebar />

      {/* — Main area (right) */}
      <main className="flex-1 bg-white p-6 overflow-y-auto ">
        {/* Your single component here */}
        Main Chat Window
      </main>
    </div>
  );
}
