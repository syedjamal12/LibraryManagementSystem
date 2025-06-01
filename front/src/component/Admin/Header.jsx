import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import settingIcon from "../../assets/setting.png";
import userIcon from "../../assets/user.png";
// import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {
  //  const { user } = useSelector(state => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", date: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  });
  return (
    <div
      className="w-[100%]"
      style={{ position: "fixed", width: "100%", zIndex: "9999" }}
    >
      <header className="bg-white  py-4 px-6 shadow-md flex justify-between items-center md:w-[83%] w-[100%]">
        {/* left side */}
        <div className="flex items-center gap-2">
          <img src={userIcon} alt="userIcon" className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
              {/* {user && user.name} */} {user.firstName + " "}
              {user.lastName}
            </span>
            <span className="text-sm font-medium sm:text-lg sm:font-medium">
              {/* {user && user.role} */} Admin
            </span>
          </div>
        </div>
        {/* right side */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
            <span>{currentTime}</span>
            <span>{currentDate}</span>
          </div>
          <span className="bg-black h-14 w-[2px]" />
          <img src={settingIcon} alt="settingIcon" className="w-8 h-8" />
        </div>
      </header>
    </div>
  );
};

export default Header;
