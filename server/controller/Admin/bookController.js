import { Books } from "../../models/Admin/bookSchema.js";

class bookController {
  static async createBook(req, res) {
    console.log("in backend of book", req.body);
    const { title, author, price, quantity, description } = req.body;
    const user = req.user;
    if (!title || !author || !price || !quantity || !description) {
      return res.status(401).json({
        success: true,
        message: "All fields are required",
      });
    }
    try {
      const book = await Books.create({
        adminId: user._id,
        title,
        author,
        price,
        quantity,
        description,
      });

      return res.status(201).json({
        success: true,
        message: "book registered successfully",
        book,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  static async updateBook(req, res) {
    console.log("from body", req.body);
    const { id } = req.params;
    try {
      let Available = "Out of Stock";
      const quantity = req.body.quantity;
      if (quantity > 0) {
        Available = "Available";
      }
      req.body.Availability = Available;
      const bookUpdate = await Books.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      return res.status(200).json({
        success: true,
        message: "Book Updated!",
        bookUpdate,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Server error",
        bookUpdate,
      });
    }
  }

  static async deleteBook(req, res) {
    console.log("from body", req.body);
    const { id } = req.params;
    const bookUpdate = await Books.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Book Deleted!",
      bookUpdate,
    });
  }

  static async getAllBook(req, res) {
    const allBorrowBook = await Books.find();
    res.status(200).json({
      success: true,
      message: "Fetched All Books",
      allBorrowBook,
    });
  }
}

export default bookController;
