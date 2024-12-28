import { axiosInstance } from './axiosInstance';

// Add a Notification

export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      '/api/notifications/notify',
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get All Notifications by User Id

export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/notifications/get-all-notifications'
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Delete a Notification

export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notifications/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Read All Notifications by User

export const ReadAllNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      '/api/notifications/read-all-notifications'
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
