import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchBorrowedBooks,
  returnBook,
} from "../../../features/auth/authThunks";

const ReturnBookPopup = ({ bookId, setReturnBookPopup }) => {
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.auth.ReturnBook.loading);
  const data = useSelector((state) => state.auth.ReturnBook.ReturnData);
  console.log("data on returnbook", data);

  const handleReturnBook = async (e) => {
    e.preventDefault();
    await dispatch(returnBook(bookId));
    if (data.success) {
      toast.success(data.message);
    }
    await dispatch(fetchBorrowedBooks());
    setReturnBookPopup(false);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">
              Do you want to confirm return this book?
            </h3>
            <form onSubmit={handleReturnBook}>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  type="button"
                  onClick={() => setReturnBookPopup(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  {Loading ? "Returning" : "Return"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnBookPopup;
