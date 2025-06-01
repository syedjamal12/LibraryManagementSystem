import express from "express";
import userController from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../middleware/userAuth.js";
import upload from "../multer.js";

const router = express.Router();

router.post("/register", userController.register);
router.post(
  "/add-admin",
  isAdminAuthenticated,
  upload.single("profile_image"),
  userController.addAdmin
);
router.post("/login", userController.login);
router.post("/logoutAdmin", userController.logoutAdmin);
router.post("/forgetPassword", userController.forgetPassword);
router.get("/fetch-user", isUserAuthenticated, userController.userFetch);

export default router;
