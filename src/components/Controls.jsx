import React from "react";
const Controls = ({ followingMode, setFollowingMode }) => (
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
);

export default Controls;
