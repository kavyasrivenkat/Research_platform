// client/src/pages/Groups.js
import { useState } from "react";
import axios from "axios";

export default function Groups() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/groups",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Group created: " + res.data.name);
    } catch (err) {
      alert("Failed to create group");
    }
  };

  return (
    <div>
      <style>{`
        .groups-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f9f9ff;
          font-family: Arial, sans-serif;
        }
        .groups-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          width: 320px;
          text-align: center;
        }
        .groups-card h2 {
          margin-bottom: 15px;
          color: #444;
        }
        .groups-input {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .groups-button {
          width: 100%;
          padding: 10px;
          margin-top: 12px;
          background: #28a745;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        .groups-button:hover {
          background: #218838;
        }
      `}</style>

      <div className="groups-container">
        <div className="groups-card">
          <h2>Create Group</h2>
          <input
            className="groups-input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="groups-input"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="groups-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
