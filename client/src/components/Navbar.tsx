import { Link } from "react-router-dom";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { IconType } from "react-icons";
import { FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart, LuBookmark, LuLogOut } from "react-icons/lu";
import { GoHistory } from "react-icons/go";
import useToggle from "../hooks/useToggle";

const Navbar = () => {
  const dropdownMenu = useToggle();

  return (
    <header className="w-full h-[68px] bg-[#0A0A0A] text-white md:px-10 p-4 flex items-center justify-between sticky top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link to="/">
        <p className="text-[27px] font-semibold">Koinpr</p>
        <p className="font-normal ml-2 -mt-1">
          A <span className="font-semibold">Todayq</span> Product
        </p>
      </Link>

      {/* User Menu */}
      <div
        ref={dropdownMenu.toggleRef as React.RefObject<HTMLDivElement>}
        onClick={dropdownMenu.onToggle}
        className="relative flex items-center gap-8 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#3053A6] flex items-center justify-center text-white font-medium text-lg">
            J
          </div>
          <div className="md:block hidden">
            <p className="font-medium">Joseph Altmen Dos</p>
            <span className="text-[#787878] text-sm">Advertiser</span>
          </div>
        </div>
        <button className="md:block hidden">
          {dropdownMenu.open ? (
            <IoChevronUp className="text-white" size={20} />
          ) : (
            <IoChevronDown className="text-white" size={20} />
          )}
        </button>

        {/* Dropdown User Menu */}
        {dropdownMenu.open && <UserMenuDropdown />}
      </div>
    </header>
  );
};

export default Navbar;

const UserMenuDropdown = () => {
  const MenuItem = ({
    icon: Icon,
    label,
    onClick,
  }: {
    icon: IconType;
    label: string;
    onClick?: () => void;
  }) => {
    return (
      <li
        onClick={onClick}
        className="flex items-center gap-4 cursor-pointer h-10 hover:bg-gray-100 transition rounded"
      >
        <Icon className="text-light-gray w-6 h-6" />
        <span className="text-light-gray">{label}</span>
      </li>
    );
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-white z-10 shadow rounded-lg p-4 md:left-0 md:right-0 top-12 md:w-full w-[240px]  -left-48"
    >
      <ul className="text-black">
        <MenuItem icon={FaRegUserCircle} label="My Account" />
        <MenuItem icon={LuShoppingCart} label="My Cart" />
        <MenuItem icon={LuBookmark} label="My Bookmarks" />
        <MenuItem icon={GoHistory} label="Order History" />
      </ul>

      <div className="w-full h-[1px] bg-gray-200 my-4"></div>

      <MenuItem icon={LuLogOut} label="Logout" />
    </div>
  );
};
