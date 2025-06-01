import { useEffect, useState } from "react";
import { FaSquareCheck } from "react-icons/fa6";
import { PiKeyReturnBold } from "react-icons/pi";
import { useSelector } from "react-redux";

const Catalog = () => {
  const [filter, setFilter] = useState("borrowed");

  const formatDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const BorrowedBooks = useSelector((state) => state.auth.BorrowedBooks.Books);
  const todayOnly = new Date(new Date().toDateString());

  let BorrowBooks = BorrowedBooks.filter((book) => {
    const responseDateOnly = new Date(new Date(book.dueDate).toDateString());
    return responseDateOnly > todayOnly;
  });

  let OverDueBooks = BorrowedBooks.filter((book) => {
    const responseDateOnly = new Date(new Date(book.dueDate).toDateString());
    return responseDateOnly < todayOnly;
  });
  const [BooksData, setBooksData] = useState([]);

  useEffect(() => {
    if (filter === "borrowed") {
      setBooksData(BorrowBooks);
    } else {
      setBooksData(OverDueBooks);
    }
  }, [filter]);
  console.log("booooooo", BooksData);

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <header className="flex flex-col justify-between gap-3 sm:flex-row md:items-center">
          <div className="flex flex-col sm:flex-row md:items-center gap-3">
            <button
              className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg
          sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
            filter === "borrowed"
              ? "bg-black text-white border-black"
              : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"
          }`}
              onClick={() => setFilter("borrowed")}
            >
              Borrowed Books
            </button>
            <button
              className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg
          sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
            filter === "overdue"
              ? "bg-black text-white border-black"
              : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"
          }`}
              onClick={() => setFilter("overdue")}
            >
              Overdue Borrowers
            </button>
          </div>

          <input
            type="text"
            placeholder="Seacrh Books..."
            className="w-full sm:w-52 border p-2 border-gray-300 rounded-md"
            //   value={search}
            //   onChange={(e) => {
            //     setSearch(e.target.value);
            //   }}
          />
        </header>

        {true ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Date & Time</th>
                  <th className="px-4 py-2 text-left">Return</th>
                </tr>
              </thead>

              <tbody>
                {BooksData.map((book, index) => (
                  <tr
                    key={index}
                    className={(index + 1) % 2 == 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book?.studentFirstName}</td>
                    <td className="px-4 py-2">{book?.studentEmail}</td>
                    <td className="px-4 py-2">{book?.price}</td>
                    <td className="px-4 py-2">{formatDate(book?.dueDate)}</td>
                    <td className="px-4 py-2">
                      {formatDateAndTime(book?.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      {book.type == "Non-Return" ? (
                        <PiKeyReturnBold className="w-6 h-6" />
                      ) : (
                        <FaSquareCheck className="w-6 h-6" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">
            No {filter === "borrowed" ? "borrowed" : "overdue"} books found.
          </h3>
        )}
      </main>
      {/* {
      returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email} />
    } */}
    </>
  );
};

export default Catalog;
