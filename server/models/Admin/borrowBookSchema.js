import mongoose from "mongoose";

const borrowBook = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: "Books",
    required: [true, "Book Id Is Required!"],
  },
  adminId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Admin Id Is Required!"],
  },
  studentEmail: {
    type: String,
    required: [true, "Title Is Required!"],
  },
  studentFirstName: {
    type: String,
    required: [true, "Name Is Required!"],
  },
  studentLastName: {
    type: String,
    required: [true, "Name Is Required!"],
  },
  price: {
    type: Number,
    required: [true, "Price Is Required!"],
    min: [0, "Quantity cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  type: {
    type: String,
    enum: ["Return", "Non-Return"],
    default: "Non-Return",
  },
  dueCharge: {
    type: Number,
  },
});

export const BorrowBook = mongoose.model("BorrowBook", borrowBook);
