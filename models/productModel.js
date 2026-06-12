import mongoose from "mongoose";

const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
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
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    qunatity: { type: Number },
    role: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    Shipping: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Product", productScheme);
