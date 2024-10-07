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
import { logout, setUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import AppIcon from "../images/AppIcon";
import { search } from "../../services/searchService";
import { toast } from "react-toastify";
import server from "../../helpers/apiCall";
import { setSearchKeyword } from "../../store/actions/searchActions";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";
import { getUsersOrganizations } from "../../services/organizationService";
import { getUser } from "../../services/userService";
import { setUserOrganization } from "../../store/actions/organizationActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [noitifcaitonOpen, setNotificationOpen] = useState(false);
  const [notificaitonList, setNotificationList] = useState([]);

  const user = useSelector((state) => state?.user);
  const userOrganization = useSelector((state) => state?.organization);
  console.log(userOrganization);

  const updateData = async () => {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken && user?._id && window.location.pathname !== "/login") {
      const response = await getUser(user?._id);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setUser(response.data));
      }
      const responseOrg = await getUsersOrganizations();
      if (responseOrg.status >= 200 && responseOrg.status < 300) {
        dispatch(setUserOrganization([...responseOrg.data.data]));
      }
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  const getNotificaitonList = async () => {
    try {
      const response = await getUserNotifications(10, 0);
      if (response.status === 200) {
        setNotificationList(response?.data?.data);
      } else {
        console.log("Error in fetching notifications");
      }
    } catch (err) {
      console.log("Error in fetching notifications");
    }
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
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
              <Link to={"/dashboard/connections"}>
                <button className="uppercase border-b border-white hover:border-primary duration-300">
                  Connections
                </button>
              </Link>
            </nav>
            <div className="flex items-center justify-end gap-4 lg:gap-8 w-full mx-4">
              <Search />
              <button
                className="p-1 hover:bg-gray-100 rounded-full"
                onClick={() => setNotificationOpen(true)}
              >
                {notificaitonList.filter(
                  (notification) => notification?.status === "pending"
                ).length > 0 && (
                  <div className="absolute bg-primary w-3.5 h-3.5 rounded-full ml-3.5 animate-pulse bg-opacity-25 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                  </div>
                )}
                <BellIcon className="w-7 h-7 text-secondary" />
              </button>
              {user?.firstName ? (
                <div className="relative group hidden lg:block">
                  <div className="w-40 flex gap-2 items-center capitalize rounded-full cursor-pointer">
                    <h1 className="pl-2 truncate w-16 duration-500">
                      {user?.firstName}
                    </h1>
                    <ChevronDownIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div
                    className={`w-full bg-white px-2 absolute -mb-3 border rounded shadow-md hidden duration-300 group-hover:block ${
                      userOrganization?.organizationData?.length > 0
                        ? "-bottom-28"
                        : "-bottom-14"
                    }`}
                  >
                    {userOrganization?.organizationData?.length > 0 && (
                      <button
                        className="hover:opacity-60 w-full text-left py-1 border-b"
                        onClick={() => navigate("/dashboard/organization/list")}
                      >
                        View Organization
                      </button>
                    )}
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
      <NotifcaitonModal
        openModal={noitifcaitonOpen}
        closeModal={() => setNotificationOpen(false)}
        notificaitonList={notificaitonList}
        setNotificationList={setNotificationList}
        getNotificaitonList={getNotificaitonList}
      />
    </>
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
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state) => state?.search?.searchKeyword);
  const currentPath = window.location.pathname;
  const loggedInUser = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const searchFn = async (query) => {
    if (currentPath === "/dashboard/search") {
      return;
    }
    try {
      setLoading(true);
      const response = await search(query);
      if (response.status === 200) {
        setUsers(response?.data?.data);
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
    const timeout = setTimeout(() => {
      if (searchKeyword.length > 1) searchFn(searchKeyword);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchKeyword]);

  const handleRedirect = (id) => {
    dispatch(setSearchKeyword(""));
    navigate(`profile/${id}`);
  };

  return (
    <div className="relative">
      <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg border">
        <input
          id="search"
          placeholder="Search"
          className="p-1 text-lg rounded-lg gray-50 w-full focus:outline-none"
          type="text"
          onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
        />
        <SearchIcon className="w-6 h-6 text-primary" />
      </div>
      <Dialog
        open={
          searchKeyword?.length > 1 && currentPath !== "/dashboard/search"
            ? true
            : false
        }
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => dispatch(setSearchKeyword(""))}
      >
        <div className="fixed inset-0 z-10 min-w-screen  overflow-y-auto">
          <div className="flex min-h-screen items-start justify-end p-4 mt-12 mr-56">
            <Dialog.Panel
              transition
              className="w-full max-w-md rounded-xl shadow-lg bg-white/60 p-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Dialog.Title
                as="h3"
                className="text-lg text-gray-600 mb-4 px-4 font-medium mt-2"
              >
                Search Results
              </Dialog.Title>
              {!loading ? (
                users?.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <div
                        key={user?._id}
                        className="flex justify-between items-center w-full gap-2 hover:bg-gray-50 p-4 rounded-lg"
                      >
                        <button
                          onClick={() => handleRedirect(user?._id)}
                          className="flex gap-2 items-center w-full"
                        >
                          <UserCircleIcon className="w-8 h-8 text-primary" />
                          <h1 className="text-left truncate">
                            {user?.firstName + " " + user?.lastName}
                          </h1>
                          {user?._id === loggedInUser?._id && (
                            <h1 className="text-right truncate ml-auto border rounded-full px-2 border-primary bg-primary bg-opacity-5 text-primary text-xs">
                              You
                            </h1>
                          )}
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center justify-center mt-4">
                      <Link
                        to="/dashboard/search"
                        className="text-primary underline"
                      >
                        See More
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <h1 className="text-gray-700 text-lg mb-4">
                      No user found
                    </h1>
                  </div>
                )
              ) : (
                <div className="w-full flex items-center justify-center">
                  <div className="border-2 rounded-full border-primary border-b-0 animate-spin w-5 h-5 p-4" />
                </div>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const NotifcaitonModal = ({
  openModal,
  closeModal,
  getNotificaitonList,
  notificaitonList,
  setNotificationList,
}) => {
  const markAsRead = async (notificationIds) => {
    try {
      const response = await markNotificationAsRead(notificationIds);
      if (response.status === 200) {
        getNotificaitonList();
      } else {
        console.log("Error in marking as read");
      }
    } catch (err) {
      console.log("Error in marking as read");
    }
  };

  useEffect(() => {
   
    if (
      openModal &&
      notificaitonList?.length > 0 &&
      notificaitonList?.filter(
        (notification) => notification?.status === "pending"
      ).length > 0
    ) {
      markAsRead(notificaitonList?.map((notification) => notification?._id));
    }
  }, [openModal]);

  useEffect(() => {
    getNotificaitonList();
  }, []);

  return (
    <Dialog
      open={openModal}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 min-w-screen  overflow-y-auto">
        <div className="flex min-h-screen items-start justify-end p-4 mt-16 mr-10">
          <Dialog.Panel
            transition
            className="w-full max-w-md rounded-xl shadow-lg bg-white/60 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <Dialog.Title as="h3" className="text-lg font-medium text-black">
              Notifications
            </Dialog.Title>
            {notificaitonList?.length > 0 ? (
              <div className="mt-4">
                {notificaitonList.map((notification) => (
                  <div
                    key={notification?._id}
                    className="flex gap-2 items-center my-2"
                  >
                    <BellIcon
                      className={`w-8 h-8 text-primary ${
                        notification?.status === "pending"
                          ? "border-2 border-primary rounded-full"
                          : ""
                      }`}
                    />
                    <h1 className="text-sm/6">{notification?.message}</h1>
                  </div>
                ))}
                <div className="mt-4">
                  <button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            ) : (
              <h1 className="text-sm/6 text-gray-700 text-center mt-4">
                No notifications found
              </h1>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
