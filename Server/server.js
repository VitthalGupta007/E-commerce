import express from 'express';
const app = express();
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

import dbConfig from './Config/dbConfig.js';
import usersRoute from './Routes/usersRoute.js';
import productsRoute from './Routes/productsRoute.js';
import bidsRoute from './Routes/bidsRoute.js';
import notificationsRoute from './Routes/notificationsRoute.js';

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationsRoute);

const port = process.env.PORT || 5000;

// deployment config
import path from "path"
let __dirname = path.resolve();

if (process.env.NODE_MODE === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
