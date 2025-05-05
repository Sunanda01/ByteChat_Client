import { AppContext } from "@/context/AppContext";
import { addNotifications, resetNotifications } from "@/features/userSlice";
import axios from "axios";
import { ContactRound, Home, Send, User, UserRound, X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function MessageRoom() {
  const [message, setMessage] = useState("");
  const { user, newMessages } = useSelector((state) => state.user);
  const [contactDrawer, setContactDrawer] = useState(false);
  const [roomDrawer, setRoomDrawer] = useState(false);
  const {
    socket,
    messages,
    setMessages,
    privateMemberMsg,
    members,
    rooms,
    setRooms,
    setPrivateMemberMsg,
    currentRoom,
    setMembers,
    setCurrentRoom,
  } = useContext(AppContext);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    const handleRoomMessages = (roomMessages) => {
      // console.log("Received room messages:", roomMessages);
      setMessages(roomMessages);
    };
    socket.on("room-messages", handleRoomMessages);
    // Clean up the listener on unmount or re-run
    return () => {
      socket.off("room-messages", handleRoomMessages);
    };
  }, [socket]);

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

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

  const todayDate = getFormattedDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes().toString().padStart(2, "0");
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
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

  const joinRoom = (room, isPublic = true) => {
    if (!user) return;
    socket.emit("join-room", room);
    setCurrentRoom(room);
    setRoomDrawer(false);
    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    dispatch(resetNotifications(room));
  };

  function orderIds(id1, id2) {
    if (id1 > id2) return id1 + "-" + id2;
    else return id2 + "-" + id1;
  }

  function handlePrivateMember(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user?.user?.id, member._id);
    joinRoom(roomId, false);
    setContactDrawer(false);
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50  text-xl shadow capitalize bg-gradient-to-r from-pink-100 to-purple-100 h-20 flex items-center justify-between">
        {user && !privateMemberMsg?._id && (
          <div className="flex items-center gap-4 font-serif tracking-normal ">
            <div className="bg-gray-50 rounded-full w-14 h-14 flex justify-center items-center shadow">
              <img src="/h.png" className="h-8 w-8 text-gray-600 " />
            </div>
            {currentRoom} Room{" "}
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="flex items-center gap-4 font-serif tracking-normal">
              <img
                src={privateMemberMsg.picture || "/avatar.png"}
                className="rounded-full w-14 h-14"
              />
              <div className="flex flex-col">
                <span>{privateMemberMsg.name}</span>
                <span
                  className={`${
                    privateMemberMsg && privateMemberMsg.status === "online"
                      ? "text-green-600"
                      : "text-red-600"
                  } text-sm`}
                >
                  {privateMemberMsg.status}
                </span>
              </div>
            </div>
          </>
        )}
        <div className=" gap-5 mr-5 flex md:hidden">
          <User
            className="w-8 h-8 cursor-pointer"
            onClick={() => setContactDrawer(true)}
          />
          <Home
            className="w-8 h-8 cursor-pointer"
            onClick={() => setRoomDrawer(true)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0 flex flex-col">
        {user &&
          messages.map(({ _id: date, messageByDate }, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {/* Date header */}
              <p className="flex justify-center items-center h-10 font-bold text-cyan-600 bg-cyan-100 rounded">
                {date}
              </p>

              {/* Messages for that date */}
              <div className="flex flex-col gap-1">
                {messageByDate?.map(
                  ({ content, time, from: sender }, msgIdx) => {
                    const isOwnMessage = user?.user?.id === sender?.user?.id;
                    return (
                      <div
                        key={msgIdx}
                        className={`flex ${
                          isOwnMessage ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-2 rounded-lg text-white text-sm shadow
                    ${isOwnMessage ? "bg-indigo-500" : "bg-violet-500"}
                  `}
                          ref={messageEndRef}
                        >
                          <div className="flex gap-1">
                            <p className="font-semibold">
                              {isOwnMessage ? "" : `${sender?.user?.name}:`}
                            </p>

                            <p> {content}</p>
                          </div>
                          <span className="text-xs block text-right text-gray-200 mt-1">
                            {time}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 border-t bg-pink-100 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border-purple-400 border-1 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            type="submit"
          >
            <Send />
          </button>
        </div>
      </form>
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          contactDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-xl font-bold text-gray-800">Members</span>
          <X
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => setContactDrawer(false)}
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
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
                  } p-1.5 flex border-1 capitalize font-serif items-center gap-3 rounded-md`}
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
                      <span className="rounded-full bg-green-500 h-7 w-7  text-center text-white ml-6">
                        {newMessages[roomId]}
                      </span>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          roomDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-xl font-bold text-gray-800">
            Available Rooms
          </span>
          <X
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => setRoomDrawer(false)}
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
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
                  <span className="rounded-full bg-green-500 h-7 w-7  text-center text-white ">
                    {newMessages[room]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageRoom;
