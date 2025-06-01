import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import logo from "../assets/black-logo.png";
import bookIcon from "../assets/book-square.png";
import usersIcon from "../assets/people-black.png";
import adminIcon from "../assets/pointing.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(5);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(8);
  const users = useSelector((state) => state.auth.users.users);
  console.log("all userssss", users);
  console.log("only one user", user);

  const Admin = users.filter((item) => {
    return item.role == "Admin";
  });

  const CreatedBook = useSelector((state) => state.auth.CreatedBooks.Books);
  console.log("created books", CreatedBook);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [user.BookBorrowed, user.BookReturn],
        backgroundColor: ["#6366f1", "#a855f7"],
        hoverBackgroundColor: ["#4f46e5", "#9333ea"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main
        className="relative flex-1 p-4 sm:p-6  z-10 bg-gradient-to-br from-slate-50 to-slate-100"
        style={{ paddingTop: "90px" }}
      >
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Right side (moved to top on mobile) */}
          <div className="flex flex-1 flex-col gap-6 xl:order-2">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-1 items-center justify-center">
                <div className="bg-white p-5 rounded-lg shadow-sm w-full h-full flex flex-col justify-center items-center gap-4">
                  <img
                    src={user && user.profile_image}
                    alt="avatar"
                    className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover border-4 border-indigo-100"
                  />
                  <h2 className="text-xl 2xl:text-2xl font-semibold text-center text-slate-800">
                    {user && user.name}
                  </h2>
                  <p className="text-gray-600 text-sm 2xl:text-base text-center">
                    Welcome to admin dashboard. Here you can manage all the
                    settings and monitor the statistics.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
                {/* Stats Cards */}
                <div
                  className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-indigo-100 p-5 rounded-lg
                transition hover:shadow-md duration-300 w-full sm:flex-1 min-w-[250px]"
                >
                  <span className="bg-indigo-200 h-16 min-w-16 flex justify-center items-center rounded-lg">
                    <img
                      src={usersIcon || "/placeholder.svg"}
                      alt="user-icon"
                      className="w-8 h-8"
                    />
                  </span>
                  <span className="w-[2px] bg-indigo-300 h-16"></span>
                  <div className="flex flex-col items-center gap-1">
                    <h4 className="font-bold text-2xl text-slate-800">
                      {/* {totalUsers} */} {users.length}
                    </h4>
                    <p className="font-light text-slate-600 text-sm">
                      Total Users
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-lg
                transition hover:shadow-md duration-300 w-full sm:flex-1 min-w-[250px]"
                >
                  <span className="bg-green-200 h-16 min-w-16 flex justify-center items-center rounded-lg">
                    <img
                      src={bookIcon || "/placeholder.svg"}
                      alt="book-icon"
                      className="w-8 h-8"
                    />
                  </span>
                  <span className="w-[2px] bg-green-300 h-16"></span>
                  <div className="flex flex-col items-center gap-1">
                    <h4 className="font-bold text-2xl text-slate-800">
                      {/* {totalBooks} */} {CreatedBook.length}
                    </h4>
                    <p className="font-light text-slate-600 text-sm">
                      Total Books
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-pink-100 p-5 rounded-lg
                transition hover:shadow-md duration-300 w-full sm:flex-1 min-w-[250px]"
                >
                  <span className="bg-pink-200 h-16 min-w-16 flex justify-center items-center rounded-lg">
                    <img
                      src={adminIcon || "/placeholder.svg"}
                      alt="admin-icon"
                      className="w-8 h-8"
                    />
                  </span>
                  <span className="w-[2px] bg-pink-300 h-16"></span>
                  <div className="flex flex-col items-center gap-1">
                    <h4 className="font-bold text-2xl text-slate-800">
                      {/* {totalAdmin} */} {Admin.length}
                    </h4>
                    <p className="font-light text-slate-600 text-sm">
                      Total Admins
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-36
    font-semibold flex flex-col justify-center items-center rounded-lg text-white shadow-sm space-y-4"
              >
                <h4 className="text-base sm:text-lg xl:text-xl 2xl:text-2xl text-center overflow-y-hidden">
                  "A library is a hospital for the mind."
                </h4>
                <p className="text-slate-300 text-sm sm:text-lg">
                  ~BookBase Team
                </p>
              </div>
            </div>
          </div>

          {/* Left side (moved to bottom on mobile) */}
          <div className="flex flex-col gap-6 xl:order-1 xl:w-[400px]">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex-1 flex items-center justify-center w-full">
                <Pie
                  data={data}
                  options={{
                    cutout: "50%",
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          usePointStyle: true,
                          padding: 20,
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                  className="mx-auto w-full h-auto max-w-[300px]"
                />
              </div>
            </div>

            <div className="flex items-center p-6 w-full gap-5 bg-white rounded-lg shadow-sm">
              <img
                src={logo || "/placeholder.svg"}
                alt="logo"
                className="w-auto h-16"
              />
              <span className="w-[2px] bg-slate-300 h-16"></span>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                  <span className="text-slate-700">Total Borrowed Books</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span className="text-slate-700">Total Returned Books</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
