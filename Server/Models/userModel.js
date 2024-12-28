import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'Active',
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
      enum: ['Male', 'Female'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);

export default User;
