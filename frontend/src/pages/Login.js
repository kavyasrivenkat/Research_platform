// client/src/pages/Login.js
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://research-backend-485763709061.us-central1.run.app/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <style>{`
        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f0f4ff;
          font-family: Arial, sans-serif;
        }
        .login-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          width: 300px;
          text-align: center;
        }
        .login-card h2 {
          margin-bottom: 15px;
          color: #333;
        }
        .login-input {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .login-button {
          width: 100%;
          padding: 10px;
          margin-top: 12px;
          background: #4a90e2;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        .login-button:hover {
          background: #357abd;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <input
            className="login-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
