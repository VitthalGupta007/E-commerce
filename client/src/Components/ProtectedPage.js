import { useEffect, useState } from 'react';
import { Avatar, Badge, message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../Redux/lodersSlice';
import { SetUser } from '../Redux/usersSlice';
import Notifications from './Notifications';
import {
  GetAllNotifications,
  ReadAllNotifications,
} from '../apicalls/notifications';
import ConfirmationModal from './ConfirmationPage';
import Footer from './Footer';
import img  from './logo.svg';

function ProtectedPage({ children }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate('/login');
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(SetLoader(false));
    navigate('/login');
    window.location.reload();
  };

  const showLogoutConfirmationModal = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirmation = () => {
    handleLogout();
    setShowLogoutConfirmation(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };
  

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
      getNotifications();
    } else {
      navigate('/login');
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    user && (
      <div>
        {/* Header part start here */}
        <div className="flex justify-between items-center bg-slate-600 p-5 max-h-20">
          <h1
            className="text-2xl text-white"
          >
            <img src={img} alt="ClassicReborn" style={{ width: '175px' }} />

          </h1>
          <div className="flex items-center justify-end ">
            <ul className="flex gap-6 list-none mr-8">
              <li>
                <a
                  href={location.pathname === '/' ? '#' : '/'}
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#shop"
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                  onClick={(e) => {
                    navigate('/about');
                    window.location.reload();
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contactUs"
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                >
                  Contact Us
                </a>
              </li>
            </ul>

            <div className="bg-white px-2 py-3 rounded flex gap-1 items-center">
              <i className="ri-user-2-fill"></i>
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  if (user.role === 'user') {
                    navigate('/profile');
                  } else {
                    navigate('/admin');
                  }
                }}
              >
                {user.name}
              </span>
              <Badge
                count={
                  notifications?.filter((notification) => !notification.read)
                    .length
                }
                onClick={() => {
                  // readNotifications();
                  setShowNotifications(true);
                }}
                className="cursor-pointer ml-2"
              >
                <Avatar
                  shape="circle"
                  icon={<i className="ri-notification-3-line"></i>}
                />
              </Badge>
              <i
                className="ri-logout-circle-r-line ml-2 cursor-pointer"
                onClick={showLogoutConfirmationModal}
              ></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ minHeight: '80vh' }} className="p-5">
          {children}
        </div>

        <Footer />

        {showScrollToTop && (
          <div
            className="fixed bottom-52 right-10 bg-gray-200 p-2 rounded cursor-pointer"
            onClick={handleScrollToTop}
          >
            <i className="ri-arrow-up-double-fill"></i>
          </div>
        )}

        <Notifications
          notifications={notifications}
          reloadNotifications={readNotifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        <ConfirmationModal
          visible={showLogoutConfirmation}
          onConfirm={handleLogoutConfirmation}
          onCancel={handleLogoutCancel}
        />
      </div>
    )
  );
}

export default ProtectedPage;
