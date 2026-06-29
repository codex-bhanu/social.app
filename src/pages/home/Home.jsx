
import React from 'react';
import './Home.css';

import Topbar from '../../components/topbar/Topbar';
import TabContent from '../../components/tabs/TabContent';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <TabContent />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;






