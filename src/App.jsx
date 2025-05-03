import React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
