import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  BookBorrowed: {
    type: Number,
    minLength: [0, "it should not in negative"],
  },
  BookReturn: {
    type: Number,
    minLength: [0, "it should not in negative"],
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Student", "Admin"],
  },
  profile_image: {
    type: String,
  },
});

export const Users = mongoose.model("Users", userSchema);
