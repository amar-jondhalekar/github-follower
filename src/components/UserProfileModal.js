import React, { useState } from 'react';
import axios from 'axios';

const UserProfileModal = ({ username, closeModal }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user profile information based on username
  const fetchUserProfile = async () => {
    setMessage(""); // Clear previous messages
    try {
      const url = `https://api.github.com/users/${username}`;
      const response = await axios.get(url);
      setUser(response.data);
    } catch (error) {
      setMessage("Failed to fetch user profile.");
    }
  };

  // Trigger profile fetch when component mounts
  React.useEffect(() => {
    fetchUserProfile();
  }, [username]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {message && <p>{message}</p>}
        {user ? (
          <div className="modal-body">
            <img className="modal-avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
            <div className="modal-info">
              <h2>{user.login}</h2>
              <ul>
                <li><strong>Name:</strong> {user.name || "N/A"}</li>
                <li><strong>Bio:</strong> {user.bio || "N/A"}</li>
                <li><strong>Followers:</strong> {user.followers}</li>
                <li><strong>Following:</strong> {user.following}</li>
                <li><strong>Public Repos:</strong> {user.public_repos}</li>
                <li><strong>Location:</strong> {user.location || "N/A"}</li>
              </ul>
              <a className="profile-link" href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Full Profile on GitHub
              </a>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
