import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloud.js";
import { mailSender } from "../helper/mailSender.js";
import { Users } from "../models/userSchema.js";

class userController {
  static async register(req, res) {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
    } = req.body;
    console.log(
      "check>>",
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role
    );
    try {
      const isRegister = await Users.findOne({ email });
      if (isRegister) {
        return res.json({
          success: false,
          message: "User Already Register!",
        });
      }
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword ||
        !role
      ) {
        return res.json({
          success: false,
          message: "all fields are required",
        });
      }
      if (password !== confirmPassword) {
        return res.json({
          success: false,
          message: "Password and Confirm Password are not matching",
        });
      }

      const isMailsend = mailSender(email);
      if (!isMailsend) {
        res.status(500).json({ success: false, message: "Server Error" });
      }
      res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  static async login(req, res) {
    console.log("login call");
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.json({
        message: "Email and password are required",
      });
    }

    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email is not registered",
      });
    }
    if (role !== user.role) {
      return res.json({
        success: false,
        message: "Role is not matching",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res
      .status(200)
      .cookie(role, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
  }

  static async logoutAdmin(req, res) {
    res
      .status(201)
      .cookie("Admin", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "Admin Logged Out Successfully.",
      });
  }

  static async forgetPassword(req, res) {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.json({
        success: false,
        message: "all fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm Password are not matching",
      });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await Users.findOne({ email });
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error("Forget Password Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  static async allUsers(req, res) {
    const users = await Users.find();
    res.status(200).json({
      success: true,
      message: "Fetched Whole data",
      users,
    });
  }

  static async addAdmin(req, res) {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
    } = req.body;
    const profileImage = req.file;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.json({
        success: false,
        message: "all fields are required",
      });
    }

    try {
      const isRegister = await Users.findOne({ email });
      if (isRegister) {
        return res.json({
          success: false,
          message: "Admin Already Register!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log("imageee", profileImage);

      // Upload file buffer to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "chat_groups",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(profileImage.buffer); // Send file buffer
      });

      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role,
        profile_image: uploadResult.secure_url,
      });
      return res.status(201).json({
        success: true,
        message: "user registered successfully",
        newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "server error",
      });
    }
  }

  static async userFetch(req, res) {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user,
    });
  }

  static async AllUsersFetch(req, res) {
    const users = await Users.find();
    return res.status(201).json({
      success: true,
      message: "All Users Fetched",
      users,
    });
  }
}

export default userController;
