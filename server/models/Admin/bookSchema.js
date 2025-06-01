import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Admin Id Is Required!"],
  },
  title: {
    type: String,
    required: [true, "Title Is Required!"],
    minLength: [5, "Title Must Contain At Least 5 Characters!"],
  },
  author: {
    type: String,
    required: [true, "Author Is Required!"],
    minLength: [5, "Author Must Contain At Least 5 Characters!"],
  },
  price: {
    type: Number,
    required: [true, "Price Is Required!"],
    min: [0, "Quantity cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
    min: [0, "Quantity cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "Description Is Required!"],
    minLength: [10, "Description Must Contain At Least 10 Characters!"],
  },
  Availability: {
    type: String,
    enum: ["Available", "Out of Stock"],
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Books = mongoose.model("Books", bookSchema);
