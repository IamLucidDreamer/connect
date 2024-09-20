import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  UserCircleIcon,
  XIcon,
  BellIcon,
  SearchIcon,
  ArrowCircleRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { clearAuth } from "../../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import AppIcon from "../images/AppIcon";
import { search } from "../../services/searchService";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state?.user);

  return (
    <div
      className={"bg-white sticky top-0 z-50 duration-500 shadow-md"}
      style={{ zIndex: 999 }}
    >
      <div className="container mx-auto px-2 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="block lg:hidden mr-4">
            <AppIcon logotType={1} width={"100px"} />
          </Link>
          <nav className="hidden lg:flex gap-10 text-secondary font-medium items-center uppercase">
            <Link to={"/"}>
              <AppIcon logotType={1} width={"175px"} />
            </Link>
            <Link to={"/dashboard/link"}>
              <button className="uppercase border-b border-white hover:border-primary duration-300">
                Jobs
              </button>
            </Link>
            <Link to={"/dashboard/link"}>
              <button className="uppercase border-b border-white hover:border-primary duration-300">
                Events
              </button>
            </Link>
            <Link to={"/dashboard/link"}>
              <button className="uppercase border-b border-white hover:border-primary duration-300">
                Organization
              </button>
            </Link>
            <Link to={"/dashboard/link"}>
              <button className="uppercase border-b border-white hover:border-primary duration-300">
                Connections
              </button>
            </Link>
          </nav>
          <div className="flex items-center justify-end gap-4 lg:gap-8 w-full mx-4">
            <Search />
            <BellIcon className="w-7 h-7 text-secondary" />
            {user?.firstName ? (
              <div className="relative group hidden lg:block">
                <div className="w-40 flex gap-2 items-center capitalize rounded-full cursor-pointer">
                  <h1 className="pl-2 truncate w-16 duration-500">
                    {user?.firstName}
                  </h1>
                  <ChevronDownIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="w-full bg-white px-2 absolute -bottom-36 border rounded shadow-md hidden duration-300 group-hover:block">
                  <button
                    className="hover:opacity-60 w-full text-left py-1 border-b"
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Manage Organization
                  </button>
                  <button
                    className="hover:opacity-60 w-full text-left py-1 border-b"
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Profile
                  </button>
                  <button
                    className="hover:opacity-60 w-full text-left py-1"
                    onClick={() => {
                      dispatch(logout());
                      clearAuth();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="flex gap-2 items-center capitalize rounded-full border-2 border-secondary border-opacity-50 cursor-pointer"
              >
                <UserCircleIcon className="w-8 h-8 text-primary" />
              </button>
            )}
          </div>
          <button
            className="lg:hidden h-7 flex flex-col justify-between items-stretch"
            onClick={() => setOpen(true)}
          >
            <div className="w-8 h-1 bg-secondary" />
            <div className="w-8 h-1 bg-secondary" />
            <div className="w-8 h-1 bg-secondary" />
          </button>
        </div>
      </div>

      <DrawerMenu
        openModal={open}
        closeModal={() => setOpen(false)}
        navigate={navigate}
      />
    </div>
  );
};

export default Header;

const DrawerMenu = ({ openModal, closeModal, navigate }) => {
  const dispatch = useDispatch();

  return (
    <Transition show={openModal} as={Fragment}>
      <Dialog
        as="div"
        style={{ zIndex: 9999 }}
        className="fixed inset-0 overflow-hidden"
        onClose={closeModal}
      >
        <div className="absolute inset-0  overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-auto" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="min-h-screen bg-white w-96">
                <div className="my-4 mx-6">
                  <div className="w-full">
                    <XIcon
                      className="w-8 h-8 text-secondary ml-auto self-end"
                      onClick={closeModal}
                    />
                  </div>
                  <nav className="flex flex-col text-secondary font-semibold text-xl">
                    <Link to={"/profile"}>
                      <button className="my-4 flex gap-2 items-center">
                        <UserCircleIcon className="w-5 h-5" />
                        Profile
                      </button>
                    </Link>
                    {/* <button className="my-4">Profile</button>
                    </Link> */}
                    <button
                      className="my-4 flex gap-2 items-center"
                      onClick={() => {
                        dispatch(logout());
                        clearAuth();
                        navigate("/");
                      }}
                    >
                      <ArrowCircleRightIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </nav>
                </div>
                <div className="absolute bottom-0 w-full mb-2 ml-4">
                  <AppIcon logotType={1} width={"175px"} classname="mx-auto" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const searchFn = async (query) => {
    try {
      setLoading(true);
      const response = await search(query);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Error in search");
      }
    } catch (err) {
      toast.error("Error in search");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const timout = setTimeout(() => {
      if (searchKeyword.length > 1) searchFn(searchKeyword);
    }, 1500);
    return () => {
      clearTimeout(timout);
    };
  }, [searchKeyword]);

  return (
    <div className="relative">
      <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg border">
        <input
          id="search"
          placeholder="Search"
          className="p-1 text-lg rounded-lg gray-50 w-full focus:outline-none"
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SearchIcon className="w-6 h-6 text-primary" />
      </div>
      {searchKeyword?.length > 1 && (
        <div className="bg-white shadow-lg flex items-center justify-center absolute top-12 w-full border p-2 rounded">
          {!loading ? (
            users?.length > 0 ? (
              users.map((user) => (
                <div className="flex gap-2 items-center w-full">
                  <UserCircleIcon className="w-8 h-8 text-primary" />
                  <h1>{user?.firstName + " " + user?.lastName}</h1>
                </div>
              ))
            ) : (
              <h1>No user found</h1>
            )
          ) : (
            <div className="border-2 rounded-full border-primary border-b-0 animate-spin w-5 h-5 p-4" />
          )}
        </div>
      )}
    </div>
  );
};
