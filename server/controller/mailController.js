import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { Otp } from "../models/otpSchema.js";
import { Users } from "../models/userSchema.js";

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail", // or your mail provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtp = async (req, res) => {
  const { email, forgetPassword } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  if (forgetPassword) {
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User is not registered" });
    }
  }

  const otp = generateOtp();

  // Save OTP to DB
  await Otp.create({ email, otp });

  // Send OTP via email
  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    html: `<h3>Your OTP is: ${otp}</h3>`,
  });

  res.status(200).json({ success: true, message: "OTP sent to email" });
};

export const verifyOtp = async (req, res) => {
  const { firstName, lastName, email, phone, password, role, otp } = req.body;

  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });

  const record = await Otp.findOne({ email, otp });

  if (!record) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  // Optionally delete OTP after verification
  await Otp.deleteMany({ email });

  if (firstName) {
    // ✅ Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  } else {
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  }
};
