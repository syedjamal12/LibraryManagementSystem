import jwt from "jsonwebtoken";
import { Users } from "../models/userSchema.js";

export const isAdminAuthenticated = async (req, res, next) => {
  const token = req.cookies.Admin;
  console.log("admin token", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Admin User is not authenticated!",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await Users.findById(decoded.id);

  //Authorization 20 se 24 tak
  if (req.user.role !== "Admin") {
    return res.status(401).json({
      success: false,
      message: "Admin is not Authorized for this resource",
    });
  }
  next();
};

export const isStudentAuthenticated = async (req, res, next) => {
  const token = req.cookies.Student;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Student is not authenticated!",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await Users.findById(decoded.id);

  //Authorization 20 se 24 tak
  if (req.user.role !== "Student") {
    return res.status(401).json({
      success: false,
      message: "Student is not Authorized for this resource",
    });
  }
  next();
};

export const isUserAuthenticated = async (req, res, next) => {
  let token = "";
  if (req.cookies.Student) {
    token = req.cookies.Student;
  }
  if (req.cookies.Admin) {
    token = req.cookies.Admin;
  }

  console.log("token for student", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated!",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await Users.findById(decoded.id);

  //Authorization 20 se 24 tak
  next();
};
