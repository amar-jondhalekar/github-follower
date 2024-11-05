import React from "react";
const Sidebar = ({ message, followedUsers }) => (
    <div className="sidebar">
        <h2>Followed Users</h2>
        <pre>{message}</pre>
    </div>
);

export default Sidebar;
