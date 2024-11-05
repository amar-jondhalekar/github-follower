import React from "react";
const InputGroup = ({ input, setInput, handleFollowMultiple, stopFollowing }) => (
    <div className="input-group">
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter usernames or keywords"
        />
        <button onClick={handleFollowMultiple}>Follow Users</button>
        <button className="stop-button" onClick={stopFollowing}>Stop</button>
    </div>
);

export default InputGroup;
