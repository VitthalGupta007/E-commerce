import mongoose from 'mongoose';

const { Schema } = mongoose;

const bidSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model('bids', bidSchema);

export default Bid;
