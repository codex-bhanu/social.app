
import React, { useContext, useEffect } from 'react';
import './Home.css';

import Topbar from '../../components/topbar/Topbar';
import TabContent from '../../components/tabs/TabContent';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BottomNavigation from '../../components/bottomNavigation/BottomNavigation';
import { AppContext } from '../../context/AppContext';

const Home = () => {
  const { leftDrawerOpen, rightDrawerOpen, closeDrawers } = useContext(AppContext);

  // Close drawers on unmount
  useEffect(() => {
    closeDrawers();
    return () => closeDrawers();
  }, [closeDrawers]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (leftDrawerOpen || rightDrawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
  }, [leftDrawerOpen, rightDrawerOpen]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <TabContent />
        <Rightbar />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Mobile Drawer Overlay Backdrop */}
      <div 
        className={`drawer-overlay ${(leftDrawerOpen || rightDrawerOpen) ? 'active' : ''}`} 
        onClick={closeDrawers}
      />

      {/* Mobile Left Drawer (Sidebar) */}
      <div className={`drawer-content drawer-left ${leftDrawerOpen ? 'active' : ''}`}>
        <Sidebar />
      </div>

      {/* Mobile Right Drawer (Rightbar) */}
      <div className={`drawer-content drawer-right ${rightDrawerOpen ? 'active' : ''}`}>
        <Rightbar />
      </div>
    </>
  );
};

export default Home;






