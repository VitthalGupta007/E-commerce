import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../Redux/lodersSlice';

const validation = [
  {
    required: true,
    message: 'Fill out this field',
    validateTrigger: 'onSubmit',
  },
];

const passwordValidation = [
  {
    required: true,
    message: 'Please enter a password',
    validateTrigger: 'onSubmit',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    message: 'Passwords must be at least 8 characters, 1 capital letter, and 1 number.',
    validateTrigger: 'onSubmit',
  },
];

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        navigate('/login');
        message.success(response.message);
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

  const handlePasswordChange = () => {
    if (showPasswordError) {
      setShowPasswordError(false);
      form.validateFields(['password']);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleFinish(values);
    } catch (error) {
      setShowPasswordError(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[550px]">
        <h1 className="text-slate-700 text-xl">
          ClassicReborn - <span className="text-gray-700 text-xl">SignUp</span>
        </h1>
        <Divider />
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={validation}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={passwordValidation}
            validateStatus={showPasswordError ? 'error' : ''}
            help={showPasswordError ? passwordValidation[1].message : null}
          >
            <div style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <i
                className={`ri-eye-${showPassword ? 'line' : 'off-line'}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '8px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
              >
                
              </i>
            </div>
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword" rules={validation}>
            <div style={{ position: 'relative' }}>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
              <i
                className={`ri-eye-${showConfirmPassword ? 'line' : 'off-line'}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '8px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={toggleConfirmPasswordVisibility}
              >
              </i>
            </div>
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
