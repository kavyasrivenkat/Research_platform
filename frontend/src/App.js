// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Groups from "./pages/Groups";
import Upload from "./pages/Upload";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px", minHeight: "100vh", background: "#f4f6f9" }}>
        <Routes>
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
