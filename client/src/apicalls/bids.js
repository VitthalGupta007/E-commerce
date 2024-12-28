import { axiosInstance } from './axiosInstance';

// Place a New Bid

export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/bids/place-new-bid',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get All Bids

export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      '/api/bids/get-all-bids',
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
