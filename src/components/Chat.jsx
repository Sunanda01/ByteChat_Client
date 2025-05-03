import React from "react";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { House, Users } from "lucide-react";

export default function Chat() {
  const rooms = ["Room1", "Room2", "Room3"];
  return (
    <div className="mt-16 h-[calc(100vh-4rem)] flex ">
      {/* — Sidebar (left) */}
      <aside className="w-96 bg-gray-100 p-4 flex flex-col gap-4 overflow-y-auto shadow-lg">
        {/* You said two components stacked vertically */}
        <div className="bg-white rounded-lg p-4 shadow">
          {/* Component One */}
          <div className="flex items-center gap-2 ">
            <h1 className="text-2xl font-bold ">Available Rooms </h1>
            <House className="h-6 w-6 text-gray-600" />
          </div>
          <div className=" text-xl flex flex-col gap-0.5 mt-2">
            {rooms.map((room, id) => (
              <span key={id} className="cursor-pointer border-2 p-1">
                {room}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-4 shadow">
          {/* Component Two */}
          <div className="flex items-center gap-2 ">
            <h1 className="text-2xl font-bold ">Members</h1>
            <Users className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </aside>

      {/* — Main area (right) */}
      <main className="flex-1 bg-white p-6 overflow-y-auto ">
        {/* Your single component here */}
        Main Chat Window
      </main>
    </div>
  );
}
