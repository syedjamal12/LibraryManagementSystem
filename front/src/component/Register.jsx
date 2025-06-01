import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [userRegister, setUserRegister] = useState({});
  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return;
    }
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            password,
            confirmPassword,
            role: "Student",
          }),
        }
      );

      const result = await response.json();
      setUserRegister(result);
      toast.success(result.message);

      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Invalid credentials!");
    }
  };
  console.log("registration process", userRegister);

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/user/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            password,
            otp,
            role: "Admin",
          }),
        }
      );

      const result = await response.json();
      setData(result);
      toast.success(result.message);
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:4000/api/v1/user/fetch-user", {
  //       credentials: 'include', // 🔥 include cookies (JWT) with the request
  //     });
  //     const result = await response.json();
  //     setData(result);
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (data.success == true) {
      console.log("yoooooo");
      navigate("/");
    }
  }, [data]);

  console.log("dataaa", data);
  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* left side */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[376px]">
          <div className="flex justify-center mb-12">
            <img
              src={logo_with_title}
              alt="logo"
              className="mb-12 h-44 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-12">
            Already have an account? Sign in now.
          </p>
          <Link
            to={"/"}
            className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition"
          >
            SIGN IN
          </Link>
        </div>
      </div>
      {/* right side */}
      {userRegister.success ? (
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to={"/"}
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
          >
            Back
          </Link>
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Check your mail box
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the otp to proceed.
            </p>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                VERIFY OTP
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4">
                <h3 className="font-medium text-4xl overflow-hidden">
                  Sign Up
                </h3>
                <img
                  src={logo}
                  alt="logo"
                  className="h-auto w-24 object-cover"
                />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-12">
              Please provide your details to sign up.
            </p>
            <form onSubmit={handleRegister}>
              <div className="mb-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <div className="block md:hidden font-semibold mt-5">
                <p>
                  Already have an Account?
                  <Link
                    to={"/"}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    {" "}
                    Sign In
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
