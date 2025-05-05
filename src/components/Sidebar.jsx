import React, { useContext, useEffect } from "react";
import { House, Users } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNotifications, resetNotifications } from "@/features/userSlice";
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
  const dispatch = useDispatch();
  const { user, newMessages } = useSelector((state) => state.user);
  const getRoom = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room`);
    setRooms(res?.data);
  };
  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRoom();
      socket.emit("join-room", "general");
      socket.emit("newUser");
    }
  }, []);

  const joinRoom = (room, isPublic = true) => {
    if (!user) return;
    socket.emit("join-room", room);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    dispatch(resetNotifications(room));
  };

  useEffect(() => {
    if (!socket) return;
    socket.off("notifications").on("notifications", (room) => {
      dispatch(addNotifications(room));
    });
    return () => {
      socket.off("notifications");
    };
  }, [socket]);

  socket.off("newUser").on("newUser", (payload) => {
    setMembers(payload);
  });

  function orderIds(id1, id2) {
    if (id1 > id2) return id1 + "-" + id2;
    else return id2 + "-" + id1;
  }

  function handlePrivateMember(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user?.user?.id, member._id);
    joinRoom(roomId, false);
  }
  return (
    <aside className="w-96 bg-gray-100 p-4  flex-col gap-4 overflow-y-auto shadow-lg  hidden  md:flex">
      <div className="bg-white rounded-lg p-4 shadow bg-gradient-to-r from-red-300 to-yellow-400">
        <div className="flex items-center gap-3 ">
          <House className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold ">Available Rooms </h1>
        </div>
        <div className="flex flex-col gap-0.5 mt-2">
          {rooms.map((room, id) => (
            <div
              key={id}
              className={`${
                room === currentRoom
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-white"
              } cursor-pointer border-1 pl-4 tracking-wider font-serif flex justify-between capitalize h-10 items-center rounded-md`}
              onClick={() => joinRoom(room)}
            >
              {room}
              {currentRoom !== room && newMessages && newMessages[room] && (
                <span className="rounded-full bg-green-500 h-7 w-7  text-center text-white mr-4">
                  {newMessages[room]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg p-4 shadow bg-gradient-to-r from-emerald-300 to-lime-300">
        <div className="flex items-center gap-3 ">
          <Users className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold ">Members</h1>
        </div>
        <div className="flex flex-col gap-0.5 mt-2">
          {members.map((member, id) => {
            const roomId = orderIds(user?.user?.id, member._id);
            return (
              <div
                key={id}
                className={`${
                  privateMemberMsg && member._id === privateMemberMsg._id
                    ? "bg-gray-200 "
                    : "bg-gray-100"
                } ${
                  user?.user?.id === member._id
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } p-1.5 flex border-1 capitalize font-serif items-center gap-3 rounded-md justify-start`}
                onClick={() => {
                  if (user?.user?.id !== member._id)
                    handlePrivateMember(member);
                }}
              >
                <img
                  src={member.picture || "/avatar.png"}
                  className="rounded-full h-16 w-16"
                  alt=""
                />
                <div className="flex flex-col">
                  <div>
                    <span className="text-lg line-clamp-1 tracking-wide">
                      {member.name}
                      <span className="text-sm ml-1 text-gray-500">
                        {member._id === user?.user?.id ? "(You)" : ""}
                      </span>
                    </span>
                  </div>
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
                {currentRoom !== roomId &&
                  newMessages &&
                  newMessages[roomId] && (
                    <span className="rounded-full bg-green-500 h-7 w-7  text-center text-white ml-22">
                      {newMessages[roomId]}
                    </span>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
