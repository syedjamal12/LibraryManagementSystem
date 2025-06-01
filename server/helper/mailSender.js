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

export const mailSender = async (email, forgetPassword) => {
  if (!email) return false;

  if (forgetPassword == true) {
    const user = await Users.findOne({ email });
    if (!user) {
      return false;
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

  return true;
};
