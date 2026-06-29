import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import './Stories.css';

const Stories = () => {
  const { users, storiesList, addStory, viewStory } = useContext(AppContext);
  const [activeStory, setActiveStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Auto-play story progress
  useEffect(() => {
    if (!activeStory) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveStory(null);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Enforce 50MB capacity guard
    if (file.size > 50 * 1024 * 1024) {
      alert("Validation Error: File size exceeds the 50MB limit!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      addStory(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleStoryClick = (story) => {
    setActiveStory(story);
    // Mark as viewed by default user 999
    viewStory(story.id, 999);
  };

  // Helper to get user info by id
  const getStoryUser = (userId) => {
    return users.find((u) => u.id === userId) || {
      username: "Bhanu Pratap Yadav",
      profilePicture: "/assets/person/bhanu.jpg"
    };
  };

  return (
    <div className="storiesContainer">
      {/* Upload Story Card */}
      <div className="storyCard uploadCard" onClick={() => fileInputRef.current.click()}>
        <img 
          src="/assets/person/bhanu.jpg" 
          alt="Bhanu Pratap Yadav" 
          className="storyUserAvatar mainAvatar" 
        />
        <div className="storyUploadBtn">
          <i className="fa fa-plus"></i>
        </div>
        <span className="storyUsernameText">Create Story</span>
        <input 
          type="file" 
          accept="image/*,video/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
      </div>

      {/* Render Stories List */}
      {storiesList
        .filter((story) => story.expiresAt > Date.now()) // Only non-expired stories
        .map((story) => {
          const storyUser = getStoryUser(story.userId);
          const cleanAvatar = storyUser.profilePicture.startsWith('/') 
            ? storyUser.profilePicture 
            : '/' + storyUser.profilePicture;
          return (
            <div 
              key={story.id} 
              className="storyCard" 
              onClick={() => handleStoryClick(story)}
            >
              <img src={story.mediaUrl} alt="" className="storyCoverImg" />
              <img src={cleanAvatar} alt="" className="storyRingAvatar" />
              <span className="storyUsernameText">{storyUser.username.split(" ")[0]}</span>
            </div>
          );
        })}

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="storyViewerOverlay" onClick={() => setActiveStory(null)}>
          <div className="storyViewerContent" onClick={(e) => e.stopPropagation()}>
            {/* Progress Bar */}
            <div className="storyProgressBarBg">
              <div className="storyProgressBarFill" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Header info */}
            <div className="storyViewerHeader">
              <div className="storyViewerUser">
                <img 
                  src={getStoryUser(activeStory.userId).profilePicture.startsWith('/') 
                    ? getStoryUser(activeStory.userId).profilePicture 
                    : '/' + getStoryUser(activeStory.userId).profilePicture} 
                  alt="" 
                  className="storyViewerAvatar" 
                />
                <span>{getStoryUser(activeStory.userId).username}</span>
              </div>
              <button className="storyCloseBtn" onClick={() => setActiveStory(null)}>&times;</button>
            </div>

            {/* Main story media */}
            <div className="storyViewerBody">
              <img src={activeStory.mediaUrl} alt="Story" className="storyViewerImg" />
            </div>

            {/* Viewer list panel (only visible to story owner Bhanu 999) */}
            {activeStory.userId === 999 && (
              <div className="storyViewersList">
                <h5><i className="fa fa-eye"></i> {activeStory.viewers.length} Viewers</h5>
                {activeStory.viewers.length > 0 ? (
                  <div className="viewersAvatars">
                    {activeStory.viewers.map((vId) => {
                      const vUser = getStoryUser(vId);
                      return (
                        <div key={vId} className="viewerRow">
                          <img 
                            src={vUser.profilePicture.startsWith('/') ? vUser.profilePicture : '/' + vUser.profilePicture} 
                            alt="" 
                            className="viewerAvatarMini" 
                            title={vUser.username}
                          />
                          <span>{vUser.username}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span>No views yet</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
