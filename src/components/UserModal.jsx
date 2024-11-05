import React from "react";

const UserModal = ({ selectedUser, closeModal }) => (
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
);

export default UserModal;
