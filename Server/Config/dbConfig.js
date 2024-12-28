import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Mongo DB Connection Successful');
});

connection.on('error', () => {
  console.log('Mongo DB Connection Failed');
});

export default connection;
