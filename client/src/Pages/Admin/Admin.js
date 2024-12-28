import { Tabs } from 'antd';
import Products from './AdminProducts';
import Users from './Users';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const activeTab = new URLSearchParams(location.search).get('tab') || '1';

  const handleTabChange = (key) => {
    navigate(`?tab=${key}`);
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
