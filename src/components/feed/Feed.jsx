
import React, { useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import { AppContext } from "../../context/AppContext";
import "./Feed.css";

const Feed = ({ username }) => {
  const { posts, users } = useContext(AppContext);

  const displayPosts = username
    ? posts.filter(p => {
        // Find user by username to get their ID
        const matchedUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        const userId = matchedUser ? matchedUser.id : (username === "Bhanu Pratap Yadav" ? 999 : null);
        return p.userId === userId;
      })
    : posts;

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* Only show stories on the main homepage feed */}
        {!username && <Stories />}
        
        {/* Only show the share component on the homepage or if it's the logged-in user's profile */}
        {(!username || username === "Bhanu Pratap Yadav") && <Share />}
        
        {displayPosts.length > 0 ? (
          displayPosts.map(p => (
            <Post key={p.id} post={p} />
          ))
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#555' }}>
            <p>No posts available from this user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
