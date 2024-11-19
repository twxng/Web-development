import React from "react";
import "../Authorization/userDropdown.css";

function UserDropdown({ user, onLogout }) {
  return (
    <div className="user-dropdown">
      <div className="user-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserDropdown;
