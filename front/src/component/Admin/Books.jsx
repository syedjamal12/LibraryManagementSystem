import { BookA } from "lucide-react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { useSelector } from "react-redux";
import AddBookPopup from "./Popup/AddBookPopup";
import BorrowBookPopup from "./Popup/BorrowBookPopup";
import DeleteBookPopup from "./Popup/DeleteBookPopup";
import EditBookPopup from "./Popup/EditBookPopup";
import ReadBookPopup from "./Popup/ReadBookPopup";

const Books = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageID, setPageID] = useState(0);
  const [addBookPopup, setAddBookPopup] = useState(false);
  const [updateBookPopup, setUpdateBookPopup] = useState(null);
  const [deleteBookPopup, setDeleteBookPopup] = useState(null);
  const [viewBook, setViewBook] = useState(null);
  const [borrow, setBorrow] = useState(null);

  const CreatedBook = useSelector((state) => state.auth.CreatedBooks.Books);
  const paginatted = 10;

  const filttered = CreatedBook.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.quantity.toString().includes(search) ||
      item.price.toString().includes(search) ||
      item.Availability.toLowerCase().includes(search.toLowerCase())
  );

  const pagination = filttered.slice(
    (page - 1) * paginatted,
    page * paginatted
  );
  console.log("created books", pagination);
  return (
    <div>
      <main
        className="relative flex-1 p-4 sm:p-6  z-10 bg-gradient-to-br from-slate-50 to-slate-100"
        style={{ paddingTop: "90px" }}
      >
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Book Management
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              className="relative pl-14 w-full sm:w-52 flex gap-4 justify-center items-center py-2 px-4
              bg-black text-white rounded-md hover:bg-gray-800"
              onClick={() => setAddBookPopup(true)}
            >
              <span
                className="bg-white flex justify-center items-center overflow-hidden rounded-full
                text-black w-[25px] h-[25px] text-[27px] absolute left-5"
              >
                +
              </span>
              Add Book
            </button>

            <input
              type="text"
              placeholder="Seacrh Books..."
              className="w-full sm:w-52 border p-2 border-gray-300 rounded-md"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </header>

        <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Availability</th>
                <th className="px-4 py-2 text-left">Record Book</th>
              </tr>
            </thead>
            <tbody>
              {pagination.map((item, i) => (
                <tr key={i} className={(i + 1) % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-2">
                    {(page - 1) * paginatted + i + 1}
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.author}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item?.price}</td>

                  <td className="px-4 py-2">{item?.Availability}</td>
                  <td className="pl-[30px] py-2 flex space-x-2 my-3  items-center">
                    <BookA onClick={() => setViewBook(item)} />
                    <PiStudent
                      onClick={() => setBorrow(item)}
                      style={{ fontSize: "30px" }}
                    />
                    <FaRegEdit
                      style={{ fontSize: "25px", marginLeft: "20px" }}
                      onClick={() => setUpdateBookPopup(item)}
                    />
                    <MdDeleteOutline
                      style={{ fontSize: "25px" }}
                      onClick={() => setDeleteBookPopup(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
          >
            Prev
          </button>

          {pagination.length >= paginatted && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-200"
            >
              Next
            </button>
          )}
        </div>
      </main>
      {addBookPopup && <AddBookPopup setAddBookPopup={setAddBookPopup} />}
      {viewBook && <ReadBookPopup book={viewBook} setViewBook={setViewBook} />}
      {borrow && <BorrowBookPopup book={borrow} setBorrow={setBorrow} />}
      {updateBookPopup && (
        <EditBookPopup
          book={updateBookPopup}
          setUpdateBookPopup={setUpdateBookPopup}
        />
      )}
      {deleteBookPopup && (
        <DeleteBookPopup
          book={deleteBookPopup}
          setDeleteBookPopup={setDeleteBookPopup}
        />
      )}
    </div>
  );
};

export default Books;
