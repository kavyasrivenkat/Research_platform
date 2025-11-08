// client/src/pages/Upload.js
import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");  // ✅ New state for group name

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("groupId", groupId);
    formData.append("groupName", groupName);  // ✅ Append group name also

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://research-backend-485763709061.us-central1.run.app/api/resources/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded: " + res.data.title);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <style>{`
        .upload-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fef9f4;
          font-family: Arial, sans-serif;
        }
        .upload-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          width: 340px;
          text-align: center;
        }
        .upload-card h2 {
          margin-bottom: 15px;
          color: #555;
        }
        .upload-input {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .upload-file {
          margin: 10px 0;
        }
        .upload-button {
          width: 100%;
          padding: 10px;
          margin-top: 12px;
          background: #ff9800;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        .upload-button:hover {
          background: #e68900;
        }
      `}</style>

      <div className="upload-container">
        <div className="upload-card">
          <h2>Upload Resource</h2>

          {/* ✅ Group ID field */}
          <input
            className="upload-input"
            placeholder="Group ID"
            onChange={(e) => setGroupId(e.target.value)}
          />

          {/* ✅ Group Name field */}
          <input
            className="upload-input"
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />

          {/* File input */}
          <input
            type="file"
            className="upload-file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
