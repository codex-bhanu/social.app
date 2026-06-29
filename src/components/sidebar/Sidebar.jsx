import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Closefriend from '../closeFriend/Closefriend';
import "./Sidebar.css";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { users, activeTab, setActiveTab } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate("/");
  };

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">

          <li 
            className={`sidebarListItem ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => handleTabClick('feed')}
          >
            <i className=" fa fa-rss sidebarIcon"></i>
            <span className="sidebarListItemText">Feed</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'chats' ? 'active' : ''}`}
            onClick={() => handleTabClick('chats')}
          >
            <i className="fa fa-comments sidebarIcon"></i>
            <span className="sidebarListItemText">Chats</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => handleTabClick('videos')}
          >
            <i className="fa fa-video sidebarIcon"></i>
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => handleTabClick('groups')}
          >
            <i className="fa fa-users sidebarIcon"></i>
            <span className="sidebarListItemText">Groups</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => handleTabClick('bookmarks')}
          >
            <i className="fa fa-bookmark sidebarIcon"></i>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => handleTabClick('questions')}
          >
            <i className="fa fa-question-circle sidebarIcon"></i>
            <span className="sidebarListItemText">Questions</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => handleTabClick('jobs')}
          >
            <i className="fa fa-briefcase sidebarIcon"></i>
            <span className="sidebarListItemText">Jobs</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => handleTabClick('events')}
          >
            <i className="fa fa-calendar-alt sidebarIcon"></i>
            <span className="sidebarListItemText">Events</span>
          </li>

          <li 
            className={`sidebarListItem ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => handleTabClick('courses')}
          >
            <i className="fa fa-graduation-cap sidebarIcon"></i>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>

        <button className="sidebarButton">Show More</button>

        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {users.map((u) => (
            <Closefriend key={u.id} user={u} />
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Sidebar;





