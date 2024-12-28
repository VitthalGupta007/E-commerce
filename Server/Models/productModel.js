import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    billavailable: {
      type: String,
      required: true,
    },
    warrantyavailable: {
      type: String,
      required: true,
    },
    accessoriesavailable: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    boxavailable: {
      type: String,
      required: true,
    },
    showBidsOnProductPage: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('products', productSchema);

export default Product;
