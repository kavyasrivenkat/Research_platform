// client/src/pages/Register.js
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("https://research-backend-485763709061.us-central1.run.app/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registered successfully! Please login.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <style>{`
        .register-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4fff7;
          font-family: Arial, sans-serif;
        }
        .register-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          width: 320px;
          text-align: center;
        }
        .register-card h2 {
          margin-bottom: 15px;
          color: #333;
        }
        .register-input {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .register-button {
          width: 100%;
          padding: 10px;
          margin-top: 12px;
          background: #007bff;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        .register-button:hover {
          background: #0056b3;
        }
      `}</style>

      <div className="register-container">
        <div className="register-card">
          <h2>Register</h2>
          <input
            className="register-input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="register-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="register-input"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
