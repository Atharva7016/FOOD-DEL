import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
import Login from "./Pages/Login/Login";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "https://food-del-backendd-sw5b.onrender.com";
  const [token, setToken] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("adminToken", tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
      return tokenFromUrl;
    }
    return localStorage.getItem("adminToken") || "";
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [token]);

  return (
    <div>
      <ToastContainer />
      {!token ? (
        <Login url={url} setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Navigate to="/add" replace />} />
              <Route path="/add" element={<Add url={url} token={token} />} />
              <Route path="/list" element={<List url={url} token={token} />} />
              <Route path="/orders" element={<Orders url={url} token={token} />} />
              <Route path="/past-orders" element={<Orders url={url} token={token} pastOnly={true} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};
export default App;
