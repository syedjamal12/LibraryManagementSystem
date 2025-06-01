import { RiAdminFill } from "react-icons/ri";
import bookIcon from "../../assets/book.png";
import catalogIcon from "../../assets/catalog.png";
import dashboardIcon from "../../assets/element.png";
import logo_with_title from "../../assets/logo-with-title.png";
import logoutIcon from "../../assets/logout.png";
import usersIcon from "../../assets/people.png";
import settingIcon from "../../assets/setting-white.png";
import closeIcon from "../../assets/white-close-icon.png";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-20 transition-all duration-700 md:relative md:left-0 flex w-64 md:w-full bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            onClick={() => setSelectedComponent("Dashboard")}
          >
            <img src={dashboardIcon} alt="icon" />
            <span>Dashboard</span>
          </button>

          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            onClick={() => setSelectedComponent("Books")}
          >
            <img src={bookIcon} alt="icon" />
            <span>Books</span>
          </button>

          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            onClick={() => setSelectedComponent("Catalog")}
          >
            <img src={catalogIcon} alt="icon" />
            <span>Catalog</span>
          </button>

          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            onClick={() => setSelectedComponent("Users")}
          >
            <img src={usersIcon} alt="icon" />
            <span>Users</span>
          </button>

          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            // onClick={() => dispatch(toggleAddNewAdminPopup())}
          >
            <RiAdminFill className="w-6 h-6" /> <span>Add New Admin</span>
          </button>

          {/* {
            isAuthenticated && user?.role === "User" && (
              <>
                <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
          onClick={()=>setSelectedComponent("My Borrowed Books")}>
            <img src={catalogIcon} alt="icon" />
            <span>My Borrowed Books</span>
                </button>
              </>
            )
          } */}
          <button
            className="md:hidden w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            // onClick={() => dispatch(toggleSettingPopup())}
          >
            <img src={settingIcon} alt="icon" />
            <span>Update Credentials</span>
          </button>
        </nav>

        <div className="px-6 py-4">
          <button
            className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mx-auto w-fit"
            // onClick={handleLogout}
          >
            <img src={logoutIcon} alt="icon" />
            <span>LogOut</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt="icon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"
        />
      </aside>
      {/* {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup&&<SettingPopup/>} */}
    </>
  );
};

export default SideBar;
