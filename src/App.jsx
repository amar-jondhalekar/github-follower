import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [followingMode, setFollowingMode] = useState('usernames');
    const [users, setUsers] = useState([]); // Array to store fetched user data
    const [followedUsers, setFollowedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // To store selected user info for modal
    const followingRef = useRef(null); // Ref to track following process

    const handleFollowMultiple = async () => {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        setMessage('');
        setUsers([]); // Clear previous users data

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        followingRef.current = true; // Set following process to true

        if (followingMode === 'usernames') {
            const usernamesArray = input.split(',').map(user => user.trim()).filter(user => user);

            for (const username of usernamesArray) {
                if (!followingRef.current) break; // Stop if the stop button is clicked
                try {
                    if (!username.match(/^[a-zA-Z0-9-]+$/)) {
                        setMessage(prev => `${prev}\nInvalid username format: ${username}`);
                        continue;
                    }

                    const url = `https://api.github.com/user/following/${username}`;
                    const response = await axios.put(url, {}, {
                        headers: { Authorization: `token ${token}` },
                    });

                    if (response.status === 204) {
                        setFollowedUsers((prev) => [...prev, username]);
                        setMessage(prev => `${prev}\nSuccessfully followed ${username}`);
                    }
                } catch (error) {
                    setMessage(prev => `${prev}\nFailed to follow ${username}: ${error.response ? error.response.data.message : 'Network error'}`);
                }
                await delay(1000);
            }
        } else if (followingMode === 'keyword') {
            try {
                const searchUrl = `https://api.github.com/search/users?q=${input}&per_page=50`;
                const searchResponse = await axios.get(searchUrl);
                const usersArray = searchResponse.data.items;
                setUsers(usersArray); // Update state with fetched users

                for (const user of usersArray) {
                    if (!followingRef.current) break; // Stop if the stop button is clicked
                    try {
                        const url = `https://api.github.com/user/following/${user.login}`;
                        const response = await axios.put(url, {}, {
                            headers: { Authorization: `token ${token}` },
                        });

                        if (response.status === 204) {
                            setFollowedUsers((prev) => [...prev, user.login]);
                            setMessage(prev => `${prev}\nSuccessfully followed ${user.login}`);
                        }
                    } catch (error) {
                        setMessage(prev => `${prev}\nFailed to follow ${user.login}: ${error.response ? error.response.data.message : 'Network error'}`);
                    }
                    await delay(1000);
                }
            } catch (error) {
                setMessage(`Error fetching users: ${error.message}`);
            }
        }
    };

    // Function to stop the following process
    const stopFollowing = () => {
        followingRef.current = false; // Set following process to false
        setMessage(prev => `${prev}\nFollowing process stopped.`);
    };

    // Function to fetch and display user info in modal
    const handleViewProfile = async (username) => {
        try {
            const url = `https://api.github.com/users/${username}`;
            const response = await axios.get(url);
            setSelectedUser(response.data); // Set the selected user data for the modal
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setMessage("Failed to fetch user profile.");
        }
    };

    // Function to close modal
    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Follow GitHub Users</h1>
                <p>Project Author: Amar Jondhalekar</p>
            </header>
            <div className="controls">
                <label>
                    <input
                        type="radio"
                        value="usernames"
                        checked={followingMode === 'usernames'}
                        onChange={() => setFollowingMode('usernames')}
                    />
                    Follow by Usernames
                </label>
                <label>
                    <input
                        type="radio"
                        value="keyword"
                        checked={followingMode === 'keyword'}
                        onChange={() => setFollowingMode('keyword')}
                    />
                    Follow by Keyword
                </label>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={followingMode === 'usernames' ? "Enter GitHub usernames (comma-separated)" : "Enter keyword (e.g., Web developer)"}
                />
                <button onClick={handleFollowMultiple}>Follow Users</button>
                <button className="stop-button" onClick={stopFollowing}>Stop</button>
            </div>
            <div className="content">
                <div className="sidebar">
                    <h2>Followed Users</h2>
                    <pre>{message}</pre>
                </div>
                <div className="user-cards">
                    {users.filter(user => !followedUsers.includes(user.login)).map(user => (
                        <div key={user.id} className="user-card">
                            <img src={user.avatar_url} alt={`${user.login} avatar`} />
                            <div>
                                <h3>{user.login}</h3>
                                <button onClick={() => handleViewProfile(user.login)}>View Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for displaying user profile information */}
            {/* Modal for displaying user profile information */}
{/* Modal for displaying user profile information */}
{selectedUser && (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-body">
                <img className="modal-avatar" src={selectedUser.avatar_url} alt={`${selectedUser.login} avatar`} />
                <div className="modal-info">
                    <h2>{selectedUser.login}</h2>
                    <ul>
                        <li><strong>Name:</strong> {selectedUser.name || 'N/A'}</li>
                        <li><strong>Bio:</strong> {selectedUser.bio || 'N/A'}</li>
                        <li><strong>Followers:</strong> {selectedUser.followers}</li>
                        <li><strong>Following:</strong> {selectedUser.following}</li>
                        <li><strong>Public Repos:</strong> {selectedUser.public_repos}</li>
                        <li><strong>Location:</strong> {selectedUser.location || 'N/A'}</li>
                    </ul>
                    <a className="profile-link" href={selectedUser.html_url} target="_blank" rel="noopener noreferrer">View Full Profile on GitHub</a>
                </div>
            </div>
        </div>
    </div>
)}


        </div>
    );
};

export default App;