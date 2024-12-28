import { Router } from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// new user registration && Public api

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists or not
    if (user) {
      //   return res.send({
      //     success: false,
      //     message: 'User already exists',
      //   });
      throw new Error('User already exists');
    }

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
      return res.send({
        message: 'Confirm Password does not matches',
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt);
    req.body.password = hashedPassword;
    req.body.confirmPassword = hashedConfirmPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: 'User Created Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// User Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists or not
    if (!user) {
      throw new Error('Invalid User name or Password');
    }
    //check if user active or not
    if (user.status !== 'Active') {
      throw new Error('The account is banned! Please Contact Admin');
    }

    // check password
    const validPaswword = await bcrypt.compare(
      req.body.password, // Plain Password
      user.password // Encrypted Password or Hashed Password
    );

    if (!validPaswword) {
      throw new Error('Invalid User name or Password');
    }

    // create token and assign it
    // to encrypt use jwt.sign

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Response
    res.send({
      success: true,
      message: 'User Logged in Successfully',
      token: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user && Protected Api

//from here i am going to use middleware means logic which will execute before executing the endpoint logic
// whenever this get-current-user endpoint is called i am going to execute logic in middleware

router.get('/get-current-user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: 'User Fetched Successfully',
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all users

router.get('/get-users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: 'Users Fetched Successfully',
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update user Status

router.put('/update-user-status/:id', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: 'User Status Updated Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put('/update-user-profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedUser);

    res.send({
      success: true,
      message: 'User Profile Updated Successfully',
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


export default router;
