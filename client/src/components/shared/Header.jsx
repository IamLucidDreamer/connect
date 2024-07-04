import React, { Fragment, useEffect, useState } from "react";
import AppLogo from "../images/AppLogo";
import { Transition, Dialog } from "@headlessui/react";
import {
  OfficeBuildingIcon,
  UserCircleIcon,
  XIcon,
  AcademicCapIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import { clearAuth, getAuthToken } from "../../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { LibraryIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/outline";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);

  const user = useSelector((state) => state?.user);
  const appInApp = useSelector((state) => state.appInApp.appInApp);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setTop(true);
      } else {
        setTop(false);
      }
    });
    return () => window.removeEventListener("scroll", setTop(false));
  }, []);

  return (
    <div
      className={`bg-white sticky top-0 z-50 duration-500 ${
        top ? "shadow-lg" : "shadow-none"
      }`}
      style={{ zIndex: 999 }}
    >
      <div className="container mx-auto px-2 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          {appInApp ? (
            <AppLogo logotType={1} width={"175px"} />
          ) : (
            <Link to={"/"}>
              <AppLogo logotType={1} width={"175px"} />
            </Link>
          )}
          <nav className="hidden lg:flex gap-10 text-secondary font-semibold items-center uppercase">
            <Link to={"/dashboard/predictor"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Predictor
              </button>
            </Link>
            <Link to={"/dashboard/colleges"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Colleges
              </button>
            </Link>
            <Link to={"/dashboard/blogs"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Blogs
              </button>
            </Link>
            <Link to={"/dashboard/updates"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Updates
              </button>
            </Link>
            <Link to={"/about"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                About
              </button>
            </Link>
            {/* <div className="flex gap-2 items-center capitalize rounded-full border-2 border-secondary border-opacity-50 text-sm group w-32 duration-500">
              <h1 className="group-hover:hidden group-hover:pl-0 pl-2 truncate w-24 duration-500">
                {user?.name}
              </h1>
              {user?.profileImage ? (
                <img
                  src={
                    "https://documents-.s3.ap-south-1.amazonaws.com/my image.jfif"
                  }
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-primary" />
              )}
              <button
                className="hidden group-hover:block group-hover:pl-0 pl-2 truncate w-24"
                onClick={() => {
                  clearAuth();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div> */}
            {user?.name ? (
              <div className="relative group">
                <div className="w-45 flex gap-2 items-center capitalize rounded-full border-2 border-secondary border-opacity-50 cursor-pointer">
                  <h1 className="pl-2 truncate w-24 duration-500">
                    {user?.name}
                  </h1>
                  <UserCircleIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="w-full bg-white px-2 absolute -bottom-16 rounded shadow-md hidden duration-300 group-hover:block">
                  <button
                    className="hover:opacity-60 w-full text-left py-1"
                    onClick={() => navigate("/profile")}
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
          </nav>
          {!appInApp && (
            <button
              className="lg:hidden h-7 flex flex-col justify-between items-stretch"
              onClick={() => setOpen(true)}
            >
              <div className="w-8 h-1 bg-secondary" />
              <div className="w-8 h-1 bg-secondary" />
              <div className="w-8 h-1 bg-secondary" />
            </button>
          )}
        </div>
      </div>

      <DrawerMenu
        openModal={open}
        closeModal={() => setOpen(false)}
        navigate={navigate}
        appInApp={appInApp}
      />
    </div>
  );
};

export default Header;

const DrawerMenu = ({ openModal, closeModal, navigate, appInApp }) => {
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
                    <Link to={"/dashboard/predictor"}>
                      <button className="my-4 flex gap-2 items-center">
                        <AcademicCapIcon className="w-5 h-5" />
                        Predictor
                      </button>
                    </Link>
                    <Link to={"/dashboard/colleges"}>
                      <button className="my-4 flex gap-2 items-center">
                        <LibraryIcon className="w-5 h-5" /> Colleges
                      </button>
                    </Link>
                    <Link to={"/dashboard/blogs"}>
                      <button className="my-4 flex gap-2 items-center">
                        <DocumentTextIcon className="w-5 h-5" />
                        Blogs
                      </button>
                    </Link>
                    <Link to={"/dashboard/updates"}>
                      <button className="my-4 flex gap-2 items-center">
                        <BellIcon className="w-5 h-5" />
                        Updates
                      </button>
                    </Link>
                    <Link to={"/about"}>
                      <button className="my-4 flex gap-2 items-center">
                        <InformationCircleIcon className="w-5 h-5" />
                        About
                      </button>
                    </Link>
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
                        appInApp ? navigate("/login") : navigate("/");
                      }}
                    >
                      <ArrowCircleRightIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </nav>
                </div>
                <div className="absolute bottom-0 w-full mb-2">
                  <AppLogo logotType={1} width={"175px"} classname="mx-auto" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
