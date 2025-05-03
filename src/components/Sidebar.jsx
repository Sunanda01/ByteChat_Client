import React, { useContext, useEffect } from "react";
import { House, Users } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useSelector } from "react-redux";
function Sidebar() {
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const getRoom = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room`);
    setRooms(res?.data);
  };
  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRoom();
      socket.emit("newUser");
    }
  }, []);
  socket.off("newUser").on("newUser", (payload) => {
    setMembers(payload);
    console.log(payload);
  });
  return (
    <aside className="w-96 bg-gray-100 p-4 flex flex-col gap-4 overflow-y-auto shadow-lg">
      {/* You said two components stacked vertically */}
      <div className="bg-white rounded-lg p-4 shadow">
        {/* Component One */}
        <div className="flex items-center gap-2 ">
          <h1 className="text-2xl font-bold ">Available Rooms </h1>
          <House className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex flex-col gap-0.5 mt-2">
          {rooms.map((room, id) => (
            <span
              key={id}
              className="cursor-pointer border-2 p-1 capitalize tracking-wider font-serif"
            >
              {room}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg p-4 shadow ">
        {/* Component Two */}
        <div className="flex items-center gap-2 ">
          <h1 className="text-2xl font-bold ">Members</h1>
          <Users className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex flex-col gap-0.5 mt-2">
          {members.map((member, id) => (
            <>
              <div
                key={id}
                className="flex cursor-pointer border-1 capitalize font-serif items-center gap-3"
              >
                <img
                  src={member.image || "/ByteChat.svg"}
                  className="rounded-full h-16 w-16"
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="text-lg line-clamp-1">{member.name}</span>
                  <span
                    className={`${
                      member && member.status === "online"
                        ? "text-green-600"
                        : "text-red-600"
                    } text-sm`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
