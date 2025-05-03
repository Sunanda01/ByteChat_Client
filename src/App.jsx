import React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
