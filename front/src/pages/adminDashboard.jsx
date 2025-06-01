import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Books from "../component/Admin/Books";
import Catalog from "../component/Admin/Catalog";
import Header from "../component/Admin/Header";
import SideBar from "../component/Admin/SideBar";
import Dashboard from "../component/Dashboard";

const AdminDashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white z-[9999999]">
        <GiHamburgerMenu
          className="text-2xl"
          style={{ zIndex: "9999999" }}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>

      {/* Main layout */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed z-20 transition-transform duration-300 md:w-[18%] w-64 bg-white h-full ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <SideBar
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            setSelectedComponent={setSelectedComponent}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 md:ml-[18%] space-y-4 relative">
          <Header />
          {(() => {
            switch (selectedComponent) {
              case "Books":
                return <Books />;
              // case "Users":
              //   return <Users />;
              case "Catalog":
                return <Catalog />;
              default:
                return <Dashboard />;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
