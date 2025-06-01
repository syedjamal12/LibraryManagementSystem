import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import Register from "./component/Register";
import {
  fetchBooks,
  fetchBorrowedBooks,
  fetchMe,
  fetchUsers,
} from "./features/auth/authThunks";
import ProtectedRoute from "./generic/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard";
import StudentDashboard from "./pages/studentDashboard";

function App() {
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.auth.user);
  // const users = useSelector((state) => state.auth.users.users);
  // const CreatedBook = useSelector((state) => state.auth.CreatedBooks.Books);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const data = await fetch(FETCH_ME, {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       const result = await data.json();
  //       setUser(result);
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error);
  //     }
  //   };

  //   fetchdata();
  // }, []);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (!user || !user.role) return; // Wait until user data is available

    async function redirect() {
      console.log("user dekhe", user);
      await dispatch(fetchUsers());
      await dispatch(fetchBooks());
      await dispatch(fetchBorrowedBooks());

      if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "Student") {
        navigate("/student");
      }
    }

    redirect();
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
