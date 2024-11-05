import React from "react";
const UserCard = ({ user, handleViewProfile }) => (
    <div className="user-card">
        <img src={user.avatar_url} alt={`${user.login} avatar`} />
        <div>
            <h3>{user.login}</h3>
            <button onClick={() => handleViewProfile(user.login)}>View Profile</button>
        </div>
    </div>
);

export default UserCard;
