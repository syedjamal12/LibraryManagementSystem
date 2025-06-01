import express from "express";
import multer from "multer";
import bookController from "../controller/Admin/bookController.js";
import borrowBookController from "../controller/Admin/borrowBookController.js";
import userController from "../controller/userController.js";
import { isAdminAuthenticated } from "../middleware/userAuth.js";

const router = express.Router();
const upload = multer();
router.post(
  "/create-book",
  isAdminAuthenticated,
  upload.none(),
  bookController.createBook
);
router.get("/get-books", isAdminAuthenticated, bookController.getAllBook);
router.put(
  "/update-book/:id",
  isAdminAuthenticated,
  upload.none(),
  bookController.updateBook
);
router.delete(
  "/delete-book/:id",
  isAdminAuthenticated,
  bookController.deleteBook
);

router.post(
  "/borrow-book",
  isAdminAuthenticated,
  upload.none(),
  borrowBookController.borrowBook
);
router.put(
  "/update-borrow-status",
  isAdminAuthenticated,
  borrowBookController.updateBorrowBook
);
router.get(
  "/get-borrow-book",
  isAdminAuthenticated,
  borrowBookController.getAllBorrowBook
);
router.get(
  "/fetch-all-users",
  isAdminAuthenticated,
  userController.AllUsersFetch
);

export default router;
