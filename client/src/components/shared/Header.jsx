import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  UserCircleIcon,
  XIcon,
  AcademicCapIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import { clearAuth } from "../../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { LibraryIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/outline";
import AppIcon from "../images/AppIcon";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state?.user);

  return (
    <div
      className={"bg-white sticky top-0 z-50 duration-500 shadow-lg"}
      style={{ zIndex: 999 }}
    >
      <div className="container mx-auto px-2 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <AppIcon logotType={1} width={"175px"} />
          </Link>
          <nav className="hidden lg:flex gap-10 text-secondary font-semibold items-center uppercase">
            <Link to={"/dashboard/link"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Some Link
              </button>
            </Link>
            {user?.firstName ? (
              <div className="relative group">
                <div className="w-45 flex gap-2 items-center capitalize rounded-full border-2 border-secondary border-opacity-50 cursor-pointer">
                  <h1 className="pl-2 truncate w-24 duration-500">
                    {user?.firstName}
                  </h1>
                  <UserCircleIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="w-full bg-white px-2 absolute -bottom-16 rounded shadow-md hidden duration-300 group-hover:block">
                  <button
                    className="hover:opacity-60 w-full text-left py-1"
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
          </nav>
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
