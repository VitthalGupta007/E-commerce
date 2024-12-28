import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Notification from '../Models/notificationModel.js';

const router = Router();

// Add A Notification
router.post('/notify', authMiddleware, async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: 'Notification Added Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get All Notification By User Id
router.get('/get-all-notifications', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete a Notification
router.delete('/delete-notification/:id', authMiddleware, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Notification Deleted Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Read All Notifications By User
router.put('/read-all-notifications', authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
    res.send({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;
