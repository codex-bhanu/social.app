import React, { useContext } from 'react';
import './BottomNavigation.css';
import { AppContext } from '../../context/AppContext';

const BottomNavigation = () => {
  const { activeTab, setActiveTab, toggleLeftDrawer } = useContext(AppContext);

  const navItems = [
    { id: 'feed', icon: 'fa-rss', label: 'Feed' },
    { id: 'chats', icon: 'fa-comments', label: 'Chats' },
    { id: 'videos', icon: 'fa-video', label: 'Videos' },
    { id: 'groups', icon: 'fa-users', label: 'Groups' }
  ];

  return (
    <div className="bottomNavigation">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`bottomNavItem ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <i className={`fa ${item.icon} bottomNavIcon`}></i>
          <span className="bottomNavLabel">{item.label}</span>
        </div>
      ))}
      <div className="bottomNavItem" onClick={toggleLeftDrawer}>
        <i className="fa fa-bars bottomNavIcon"></i>
        <span className="bottomNavLabel">Menu</span>
      </div>
    </div>
  );
};

export default BottomNavigation;
