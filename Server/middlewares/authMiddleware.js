import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  try {
    const token = req.header('authorization').split(' ')[1]; // splitting a string it becomes an array
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET); // to decrypt use jwt.verify..
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};