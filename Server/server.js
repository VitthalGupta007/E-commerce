import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Import routes
import usersRoute from './Routes/usersRoute.js';
import productsRoute from './Routes/productsRoute.js';
import bidsRoute from './Routes/bidsRoute.js';
import notificationsRoute from './Routes/notificationsRoute.js';

// Initialize express app
const app = express();
app.use(express.json());

// Load environment variables
dotenv.config();
console.log("Mongo URL:", process.env.MONGO_URL);  // Log the MongoDB URI
console.log("Port:", process.env.PORT);  // Log the port number

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);  // Exit the process if DB connection fails
  }
};

// Call MongoDB connection
connectDB();

// Define API routes
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationsRoute);

// Check if the app is in production mode and configure static file serving
let __dirname = path.resolve();
if (process.env.NODE_MODE === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  // For development, display a simple message
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Define the port to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
