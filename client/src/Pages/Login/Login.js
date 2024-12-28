import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../Redux/lodersSlice';

const validation = [
  {
    required: true,
    message: 'Fill out this field',
  },
];

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center ">
      <div className=" bg-white p-5 rounded w-[550px]">
        {/* border border-solid border-gray-800 */}
        <h1 className=" text-slate-800 text-xl">
          ClassicReborn - <span className=" text-gray-700 text-xl">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={validation}
          >
            <div style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                style={{ paddingRight: '32px' }}
              />
              <i
                className={`ri-eye-${showPassword ? 'line' : 'off-line'}`}
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '8px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              ></i>
            </div>
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className=" text-primary">
                Register
              </Link>
            </span>
          </div>
          <p className="mt-2 text-center">
            <span className="text-xl text-gray-500">
              Contact us :{' '}
              <a href="mailto:praveen01.ugec20@iiitranchi.ac.in">
                <i className="ri-mail-line text-xl mr-1"></i>
              </a>
              <a href="https://www.instagram.com/_.witch3r/" target="_blank">
                <i className="ri-instagram-line text-xl mr-1"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/praveen-shankar-ba289a212/"
                target="_blank"
              >
                <i className="ri-linkedin-fill text-xl mr-1"></i>
              </a>
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
}
export default Login;
