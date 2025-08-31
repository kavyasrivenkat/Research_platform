import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#4A90E2", padding: "15px" }}>
      <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{ marginRight: "20px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/home">Home</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">Login</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/register">Register</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/groups">Groups</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/upload">Upload</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
