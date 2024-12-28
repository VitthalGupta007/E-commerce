import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Products from './Products';
import Bids from './UserBids';
import General from './General/General';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
    navigate(`?tab=${key}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <Bids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <General />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
