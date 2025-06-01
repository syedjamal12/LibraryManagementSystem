import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks } from "../../../features/auth/authThunks";

const DeleteBookPopup = ({ book, setDeleteBookPopup }) => {
  const Loading = useSelector((state) => state.auth.DeleteBook.loading);

  const dispatch = useDispatch();
  const handleDeleteBook = async () => {
    await dispatch(deleteBook(book._id));
    await dispatch(fetchBooks());
    setDeleteBookPopup(null);
    // dispatch(returnBook(email, bookId))
    // dispatch(toggleReturnBookPopup())
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">
            Do you confirm delete this book?
          </h2>
          <button
            className="text-white text-lg font-bold"
            onClick={() => setDeleteBookPopup(null)}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="bloc text-gray-700 font-semibold">
              Book Title
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.title}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            type="button"
            //   onClick={() => dispatch(toggleAddBookPopup())}
            onClick={() => setDeleteBookPopup(null)}
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            onClick={() => handleDeleteBook()}
          >
            {Loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookPopup;
