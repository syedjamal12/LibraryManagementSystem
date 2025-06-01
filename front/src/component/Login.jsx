import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FORGETPASSWORD_API, SEND_OTP_API, VERIFY_OTP_API } from "../api/api";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { loginThunk } from "../features/auth/authThunks";

const Login = ({ setUser }) => {
  // const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const [loadingS, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [Data, setData] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmnewPassword, setConfirmNewPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [otp, setOtp] = useState("");
  const [optVarified, setOtpVarified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(loginThunk({ email, password, role }))
      .unwrap()
      .then(() => toast.success("Logged in!"))
      .catch((err) => toast.error(err.message || "Login failed"));

    if (user) {
      console.log("user role check", role);
      const role = user?.role;
      if (role === "Admin") navigate("/admin");
      else if (role === "Student") navigate("/student");
    }
  };

  //  useEffect(() => {
  //   if (user) {
  //     const role = user?.role;
  //     if (role === "Admin") navigate("/admin");
  //     else if (role === "Student") navigate("/student");
  //   }
  // }, [user]);

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SEND_OTP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important if using cookies
        body: JSON.stringify({ email: forgetEmail, forgetPassword: true }),
      });

      const result = await response.json();
      toast.success(result.message);
      if (result.success == true) {
        setPasswordChange(true);
      }
      setLoading(false);

      console.log("Login response:", result);
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(VERIFY_OTP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important if using cookies
        body: JSON.stringify({ email: forgetEmail, otp }),
      });

      const result = await response.json();
      toast.success(result.message);
      if (result.success == true) {
        setOtpVarified(true);
      }
      setLoading(false);

      console.log("Login response:", result);
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  const FinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(FORGETPASSWORD_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important if using cookies
        body: JSON.stringify({
          email: forgetEmail,
          password: newPassword,
          confirmPassword: confirmnewPassword,
        }),
      });

      const result = await response.json();
      toast.success(result.message);
      if (result.success == true) {
        setForgotPassword(false);
      }
      setLoading(false);

      console.log("Login response:", result);
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Welcome Back!!
            </h1>

            {forgotPassword ? (
              passwordChange ? (
                optVarified ? (
                  <div>
                    <p className="text-gray-800 text-center mb-12">
                      Reset Password
                    </p>
                    <form onSubmit={FinalSubmit}>
                      <div className="mb-4">
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="mb-4">
                        <input
                          type="password"
                          value={confirmnewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          placeholder="Confirm Password"
                          className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="block md:hidden font-semibold mt-5">
                        <p>
                          New to our platform?{" "}
                          <Link
                            to={"/register"}
                            className="text-sm text-gray-500 hover:underline"
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
                      >
                        {loadingS ? "Submiting..." : "Submit"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800 text-center mb-12">
                      Please check your mail box to get your OTP.
                    </p>
                    <form onSubmit={verifyOTP}>
                      <div className="mb-4">
                        <input
                          type="number"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="OTP"
                          className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="block md:hidden font-semibold mt-5">
                        <p>
                          New to our platform?{" "}
                          <Link
                            to={"/register"}
                            className="text-sm text-gray-500 hover:underline"
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
                      >
                        {loadingS ? "Verifing..." : "Verify Otp"}
                      </button>
                    </form>
                  </div>
                )
              ) : (
                <div>
                  <p className="text-gray-800 text-center mb-12">
                    Please enter your registered email to get OTP.
                  </p>
                  <form onSubmit={sendOTP}>
                    <div className="mb-4">
                      <input
                        type="email"
                        value={forgetEmail}
                        onChange={(e) => setForgetEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                      />
                    </div>

                    <div className="block md:hidden font-semibold mt-5">
                      <p>
                        New to our platform?{" "}
                        <Link
                          to={"/register"}
                          className="text-sm text-gray-500 hover:underline"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
                    >
                      {loadingS ? "Sending..." : "Send Otp"}
                    </button>
                  </form>
                </div>
              )
            ) : (
              <>
                <p className="text-gray-800 text-center mb-12">
                  Please enter your credentials to login.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Student">Student</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                    />
                  </div>
                  <div
                    onClick={() => setForgotPassword(true)}
                    className="font-semibold text-black mb-12 hover:underline"
                  >
                    Forgot Password?
                  </div>
                  <div className="block md:hidden font-semibold mt-5">
                    <p>
                      New to our platform?{" "}
                      <Link
                        to={"/register"}
                        className="text-sm text-gray-500 hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
                  >
                    {loading ? "Signing..." : "Sign In"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
        {/* right side */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12">
              New to our platform? Sign up now.
            </p>
            <Link
              to={"/register"}
              className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
