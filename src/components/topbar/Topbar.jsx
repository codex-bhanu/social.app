
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import { AppContext } from "../../context/AppContext";
import TopbarDropdown from "./TopbarDropdown";

const Topbar = () => {
  const { 
    users, 
    posts, 
    notificationsCount, 
    chatsCount, 
    requestsCount, 
    notificationsList, 
    chatsList, 
    requestsList,
    clearBadge,
    theme,
    toggleTheme
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null); // 'requests', 'chats', 'notifications'

  const toggleDropdown = (type) => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
      clearBadge(type);
    }
  };

  // Filter matching users
  const matchedUsers = searchQuery 
    ? users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Filter matching posts
  const matchedPosts = searchQuery
    ? posts.filter(p => p.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="topbarContainer" style={{ position: 'sticky', top: 0, zIndex: 999 }}>

      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}>
          <i className="fa fa-home homec"></i>
          <span className="logo">Bhanu Pratap Yadav</span>
        </Link>
      </div>

      <div className="topbarCenter" style={{ position: 'relative' }}>
        <div className="searchbar">
          <i className="fa fa-search searchIcon" ></i>
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Floating Search Results */}
        {searchQuery && (
          <div 
            className="searchResultsDropdown" 
            style={{
              position: 'absolute',
              top: '48px',
              left: '0',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px) saturate(180%)',
              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              borderRadius: '14px',
              boxShadow: '0px 10px 30px rgba(15, 23, 42, 0.12)',
              zIndex: 1100,
              textAlign: 'left',
              padding: '12px 0',
              maxHeight: '320px',
              overflowY: 'auto',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              color: '#1e293b',
            }}
          >
            <div style={{ padding: '4px 16px', fontSize: '11px', fontWeight: '800', color: '#3b82f6', letterSpacing: '0.8px', fontFamily: 'Outfit, sans-serif' }}>PEOPLE</div>
            {matchedUsers.length === 0 ? (
              <div style={{ padding: '8px 16px', fontSize: '13px', color: '#64748b' }}>No users found</div>
            ) : (
              matchedUsers.map(u => {
                const cleanPic = u.profilePicture.startsWith('/') ? u.profilePicture : '/' + u.profilePicture;
                return (
                  <Link 
                    key={u.id} 
                    to={`/profile/${u.username}`} 
                    onClick={() => setSearchQuery("")}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div 
                      style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', cursor: 'pointer', transition: 'background 0.2s', borderRadius: '8px', margin: '0 8px' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img src={cleanPic} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{u.username}</span>
                    </div>
                  </Link>
                );
              })
            )}

            <div style={{ padding: '12px 16px 4px 16px', fontSize: '11px', fontWeight: '800', color: '#3b82f6', letterSpacing: '0.8px', fontFamily: 'Outfit, sans-serif', borderTop: '1px solid #f1f5f9', marginTop: '8px' }}>POSTS</div>
            {matchedPosts.length === 0 ? (
              <div style={{ padding: '8px 16px', fontSize: '13px', color: '#64748b' }}>No posts found</div>
            ) : (
              matchedPosts.map(p => {
                const postAuthor = users.find(u => u.id === p.userId) || { username: "Bhanu Pratap Yadav", profilePicture: "/assets/person/bhanu.jpg" };
                const cleanAuthorPic = postAuthor.profilePicture.startsWith('/') ? postAuthor.profilePicture : '/' + postAuthor.profilePicture;
                return (
                  <div 
                    key={p.id} 
                    style={{ padding: '10px 16px', cursor: 'pointer', transition: 'background 0.2s', borderRadius: '8px', margin: '0 8px' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                      <img src={cleanAuthorPic} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>{postAuthor.username}</span>
                    </div>
                    <span style={{ fontSize: '13px', color: '#475569', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {p.desc}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={() => toggleDropdown('requests')}>
            <i className="fa fa-user ic"></i>
            {requestsCount > 0 && <span className="topbarIconBadge">{requestsCount}</span>}
          </div>

          <div className="topbarIconItem" onClick={() => toggleDropdown('chats')}>
            <i className='far fa-comment ic' ></i>
            {chatsCount > 0 && <span className="topbarIconBadge">{chatsCount}</span>}
          </div>

          <div className="topbarIconItem" onClick={() => toggleDropdown('notifications')}>
            <i className="fas fa-bell ic"></i>
            {notificationsCount > 0 && <span className="topbarIconBadge">{notificationsCount}</span>}
          </div>

          <div className="topbarIconItem" onClick={toggleTheme} title="Toggle Theme" style={{ cursor: 'pointer' }}>
            <i className={`fa ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} ic`}></i>
          </div>
        </div>

        <Link to="/profile" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/person/bhanu.jpg" alt="" className="topbarImg" />
        </Link>
      </div>

      {/* Floating Menus Overlay */}
      {activeDropdown === 'requests' && (
        <TopbarDropdown 
          type="requests" 
          items={requestsList} 
          onClose={() => setActiveDropdown(null)} 
        />
      )}
      {activeDropdown === 'chats' && (
        <TopbarDropdown 
          type="chats" 
          items={chatsList} 
          onClose={() => setActiveDropdown(null)} 
        />
      )}
      {activeDropdown === 'notifications' && (
        <TopbarDropdown 
          type="notifications" 
          items={notificationsList} 
          onClose={() => setActiveDropdown(null)} 
        />
      )}
    </div>
  );
}

export default Topbar;