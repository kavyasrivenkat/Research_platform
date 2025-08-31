// client/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <style>{`
        .home-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          font-family: Arial, sans-serif;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .home-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
          max-width: 500px;
        }
        .home-title {
          font-size: 28px;
          margin-bottom: 15px;
        }
        .home-subtitle {
          font-size: 16px;
          margin-bottom: 25px;
        }
        .home-links a {
          display: inline-block;
          margin: 8px;
          padding: 10px 20px;
          background: white;
          color: #2575fc;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          transition: 0.3s;
        }
        .home-links a:hover {
          background: #f0f0f0;
        }
      `}</style>

      <div className="home-container">
        <div className="home-card">
          <h1 className="home-title">Welcome to Research Platform</h1>
          <p className="home-subtitle">
            A place to collaborate, share resources, and build knowledge together.
          </p>
          <div className="home-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/upload">Upload</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
