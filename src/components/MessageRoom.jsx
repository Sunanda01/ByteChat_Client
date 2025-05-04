import { AppContext } from "@/context/AppContext";
import { Send } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MessageRoom() {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  // console.log(user?.user?.id);
  const {
    socket,
    messages,
    setMessages,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  useEffect(() => {
    if (!socket) return;
    const handleRoomMessages = (roomMessages) => {
      console.log("Received room messages:", roomMessages);
      setMessages(roomMessages);
    };
    socket.on("room-messages", handleRoomMessages);
    // Clean up the listener on unmount or re-run
    return () => {
      socket.off("room-messages", handleRoomMessages);
    };
  }, [socket]);

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

  return (
    <div className="flex flex-col h-full bg-gray-50 ">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-lg shadow">
        Chat Room Header
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
                        >
                          <p>{content}</p>
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
    </div>
  );
}

export default MessageRoom;
