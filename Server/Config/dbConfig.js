import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo DB Connection Successful');
  } catch (error) {
    console.error('Mongo DB Connection Failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
