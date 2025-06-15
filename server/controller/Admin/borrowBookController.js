import { Books } from "../../models/Admin/bookSchema.js";
import { BorrowBook } from "../../models/Admin/borrowBookSchema.js";
import { Users } from "../../models/userSchema.js";

class borrowBookController {
  static async borrowBook(req, res) {
    const { bookId, studentEmail, price, dueDate } = req.body;
    console.log("borrow reuest", req.body);
    const user = req.user;
    if (!bookId || !studentEmail || !price || !dueDate) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    try {
      const SingleBook = await Books.findById(bookId);
      if (SingleBook.Availability == "Out of Stock") {
        return res.status(401).json({
          success: false,
          message: "this book is out of stock",
        });
      }

      const student = await Users.findOneAndUpdate(
        { email: studentEmail },
        { $inc: { BookBorrowed: 1 } },
        { new: true } // return the updated document
      );
      console.log("student check", student.firstName);
      if (!student) {
        return res.status(401).json({
          success: false,
          message: "Student email is not registered",
        });
      }

      // Update book quantity
      const updatedBook = await Books.findByIdAndUpdate(
        bookId,
        { $inc: { quantity: -1 } }, // Decrease quantity by 1
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      // Create a borrow record
      const book = await BorrowBook.create({
        bookId,
        adminId: user._id,
        studentEmail,
        studentFirstName: student.firstName,
        studentLastName: student.lastName,
        price,
        dueDate: new Date(dueDate), // Ensure dueDate is a Date object
      });

      await Users.findByIdAndUpdate(
        user._id,
        { $inc: { BookBorrowed: 1 } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Book borrowed to student!",
        book,
      });
      console.log("single book quantity", SingleBook.quantity);
      if (SingleBook.quantity - 1 <= 0) {
        SingleBook.Availability = "Out of Stock";
        await SingleBook.save();
        return res.status(401).json({
          success: false,
          message: "this book is out of stock",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  }
  static async updateBorrowBook(req, res) {
    const { bookId } = req.params;
    // renamed 'return' to 'returnStatus'
    let returnStatus = "Return";
    const user = req.user;
    if (!bookId || !returnStatus) {
      return res.status(404).json({
        success: false,
        message: "Required all fields!",
      });
    }
    try {
      const findBook = await BorrowBook.findById(bookId);
      if (!findBook) {
        return res.status(404).json({
          success: false,
          message: "Borrow record not found!",
        });
      }

      console.log("find book", findBook);

      const todayDate = new Date();
      const dueDate = new Date(findBook.dueDate);

      let dueCharge = 0;
      let daysLate = 0;

      if (todayDate > dueDate) {
        const timeDiff = todayDate - dueDate;
        daysLate = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        dueCharge = daysLate * 3;
        console.log(`Late by ${daysLate} days. Fine: ₹${dueCharge}`);
      }

      // Save the updated dueCharge
      findBook.dueCharge = dueCharge;
      await findBook.save();

      // Update return status
      const book = await BorrowBook.updateOne(
        { _id: bookId },
        { type: returnStatus },
        {
          runValidators: true,
        }
      );

      const student = await Users.findOneAndUpdate(
        { email: findBook.studentEmail },
        { $inc: { BookReturn: 1 } },
        { new: true } // return the updated document
      );

      const Admin = await Users.findByIdAndUpdate(
        user._id,
        { $inc: { BookReturn: 1 } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Book return status updated!",
        lateByDays: daysLate,
        dueCharge: `₹${dueCharge}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error while updating return status.",
      });
    }
  }

  static async getAllBorrowBook(req, res) {
    const allBorrowBook = await BorrowBook.find();
    res.status(200).json({
      success: true,
      message: "Fetched Whole data",
      allBorrowBook,
    });
  }
}

export default borrowBookController;
