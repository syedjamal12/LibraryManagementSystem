import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrowBook, fetchBooks } from "../../../features/auth/authThunks";

const BorrowBookPopup = ({ book, setBorrow }) => {
  const [email, setEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const Loading = useSelector((state) => state.auth.BorrowBook.loading);

  const dispatch = useDispatch();

  const handleReturnBook = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const data = new FormData();
    data.append("bookId", book._id);
    data.append("studentEmail", email);
    data.append("price", book.price);
    data.append("dueDate", dueDate);
    await dispatch(borrowBook(data));
    await dispatch(fetchBooks());
    setBorrow(null);
    // dispatch(returnBook(email, bookId))
    // dispatch(toggleReturnBookPopup())
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Borrow Book</h3>
            <form onSubmit={handleReturnBook}>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  User Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Borrower's Email"
                  className="w-full px-4 py-2 border-2 border-black rounded-md mb-2"
                  required
                />
                <input
                  value={book.price}
                  placeholder="Borrower's Email"
                  className="w-full px-4 py-2 border-2 border-black rounded-md mb-2"
                  required
                />
                <input
                  type="date"
                  value={dueDate ? dueDate.slice(0, 10) : ""}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    setDueDate(selectedDate.toISOString()); // e.g. "2025-06-15T00:00:00.000Z"
                  }}
                  className="w-full px-4 py-2 border-2 border-black rounded-md mb-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  type="button"
                  // onClick={() => dispatch(toggleReturnBookPopup())}
                  onClick={() => setBorrow(null)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  {Loading ? "Borrowing" : "Borrow"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowBookPopup;
