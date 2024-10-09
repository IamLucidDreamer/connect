import {
  BellIcon,
  CameraIcon,
  ChatIcon,
  ChevronDownIcon,
  MailIcon,
  PencilIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import PostList from "../dashboardPages/post/ListPosts";

import { getConnectionRequests } from "../../services/connectionService";
import ConnectionButtons from "../../components/connections/ConnectionButtons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-screen-xl mx-auto py-6">
      {/* search */}
      <div className="flex gap-5">
        <div className="w-1/4">
          <OrganizationActivity />
        </div>
        <div className="w-2/4">
          <div className="rounded-lg border-gray-200 bg-white border-2 pb-2">
            <div className="flex flex-row p-4 items-center w-full">
              <div className="w-[10%]">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="w-[90%] ">
                <form class="mx-auto">
                  <input
                    type="search"
                    id="default-search"
                    class="ml-2 block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-full"
                    placeholder="Start a post"
                  />
                </form>
              </div>
            </div>
            <div className="px-10 mb-2">
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-row items-center">
                  <MailIcon className="w-5 h-5" />
                  <sm className="ml-2 text-left text-md font-SourceSansProSemibold text-gray-600">
                    Media
                  </sm>
                </div>
                <div className="flex flex-row items-center">
                  <BellIcon className="w-5 h-5" />
                  <sm className="ml-2 text-left text-md font-SourceSansProSemibold text-gray-600">
                    Event
                  </sm>
                </div>
                <button
                  className="flex flex-row items-center"
                  onClick={() => {
                    navigate("/dashboard/post/create");
                  }}
                >
                  <PencilIcon className="w-5 h-5" />
                  <sm className="ml-2 text-left text-md font-SourceSansProSemibold text-gray-600">
                    Write article
                  </sm>
                </button>
              </div>
            </div>
          </div>
          {/* horizontal */}
          <div className="flex flex-row items-center justify-between">
            <hr class="h-px my-6 w-[80%] bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex flex-row">
              <p className="ml-1 text-center font-SourceSansProLight text-sm flex-grow">
                Sort by:
              </p>
              <div className="flex flex-row items-center">
                <sm className="ml-1 text-left text-sm font-SourceSansProSemibold">
                  Top
                </sm>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
          {/* feed */}
          <div className="gap-5 flex flex-col">
            <PostList />
          </div>
        </div>
        <div className="w-1/4">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Feed;

const Profile = () => {
  return (
    <div className="sticky top-20 flex flex-col gap-5">
      <div className="rounded-lg border-gray-200 bg-white border-2 pb-2">
        <div className="flex flex-col relative pb- ">
          <img
            src="https://picsum.photos/200/300"
            alt="banner image"
            className="w-full h-28 object-cover rounded-t-md"
          />
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
            alt="profile"
            className="relative top-[100%] z-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-white border-2"
          />
          <h4 className="font-SourceSansProSemibold text-center text-lg font-bold">
            Stella Waithera
          </h4>
          <p className="text-center font-ArialRegular text-gray-500 text-[13px] mx-4">
            Founder of AfricanSTEMGirl Org||Creator and Lead Organizer
            AfricaSTEMsummit||Founder of The Transition Series Kenya||Fullstack
            developer(ReactJS,Django)||Digital skills Instructor|| Technical
            Writer(SheCodeAfrica)
          </p>
          <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-row w-full mx-4 mb-1">
            <sm className="flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
              Profile Viewers
            </sm>
            <sm className="text-right text-sm mr-10 text-blue-500 font-bold">
              224
            </sm>
          </div>
          <div className="flex flex-row w-full mx-4 mb-1">
            <sm className="flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
              Post Impressions
            </sm>
            <sm className="text-right text-sm mr-10 text-blue-500 font-bold">
              1,757
            </sm>
          </div>
        </div>
      </div>
      <div className="rounded-lg border-gray-200 bg-white border-2 p-3">
        <h4 className="text-left text-lg font-semibold">Recommendations</h4>
      </div>
      <div className="rounded-lg border-gray-200 bg-white border-2 p-3">
        <ConnectionsList />
      </div>
    </div>
  );
};

const OrganizationActivity = () => {
  return (
    <div className="sticky top-20 flex gap-4 flex-col">
      <div className="rounded-lg border-gray-200 bg-white border-2 pb-2 px-3 py-2">
        <h4 className="text-left text-lg font-semibold">My Organization (5)</h4>
        <div className="flex flex-row items-center my-2">
          <UserGroupIcon className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-left ml-4 text-md font-semibold">
              New Users Joined
            </h3>
            <div className="flex flex-row w-full mx-4 mb-1">
              <sm className="flex-grow text-left text-xs font-ArialRegular font-bold text-gray-600">
                Page notifications
              </sm>
              <sm className="text-right text-sm mr-2 text-blue-500 font-bold">
                7
              </sm>
            </div>
          </div>
        </div>
        <hr class="h-px my-4 ml-12 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-row items-center my-2">
          <CameraIcon className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-left ml-4 text-md font-semibold">
              New Posts Added
            </h3>
            <div className="flex flex-row w-full mx-4 mb-1">
              <sm className="flex-grow text-left text-xs font-ArialRegular font-bold text-gray-600">
                Page notifications
              </sm>
              <sm className="text-right text-sm mr-2 text-blue-500 font-bold">
                7
              </sm>
            </div>
          </div>
        </div>
        <hr class="h-px my-4 ml-12 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-row items-center my-2">
          <ChatIcon className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-left ml-4 text-md font-semibold">
              New Group Messages
            </h3>
            <div className="flex flex-row w-full mx-4 mb-1">
              <sm className="flex-grow text-left text-xs font-ArialRegular font-bold text-gray-600">
                Page notifications
              </sm>
              <sm className="text-right text-sm mr-2 text-blue-500 font-bold">
                7
              </sm>
            </div>
          </div>
        </div>
        <hr class="h-px my-4 ml-12 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex justify-center">
          <sm className="text-sm font-ArialRegular text-gray-600 font-bold">
            See all my Organization Activity
          </sm>
        </div>
      </div>
      {/* Recent Events */}

      <div className="rounded-lg border-gray-200 bg-white border-2 pb-2 px-3 py-2">
        <p className="font-SourceSansProLight text-left text-sm font-semibold my-2">
          Events
        </p>
        <div className="flex flex-row align-middle items-center mb-1">
          <sm className="ml-2 flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
            How to recruit a developer
          </sm>
        </div>
        <div className="flex flex-row align-middle items-center mb-1">
          <sm className="ml-2 flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
            Python Developer Community
          </sm>
        </div>
        <div className="flex flex-row align-middle items-center mb-1">
          <sm className="ml-2 flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
            Full-Stack Machine Learning
          </sm>
        </div>
        <p className="font-SourceSansProLight text-left text-sm font-semibold my-2">
          Sub-Groups
        </p>
        <div className="flex flex-row align-middle items-center mb-1">
          <sm className="ml-2 flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
            Python Developer Community
          </sm>
        </div>
        <div className="flex flex-row align-middle items-center mb-1">
          <sm className="ml-2 flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
            Africa Professionals Group
          </sm>
        </div>
        <div className="flex flex-row align-middle items-center mb-1">
          <sm className="ml-2 flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600">
            Hernovation
          </sm>
        </div>
      </div>
    </div>
  );
};

const ConnectionsList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await getConnectionRequests("accepted");
      if (response?.status >= 200 && response?.status < 300) {
        setConnections(response?.data?.data);
        console.log(response?.data?.data, "Connections");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch connections");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl mb-4 font-regular">Connections</h2>
      <div>
        {loading ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">Loading...</p>
          </div>
        ) : connections?.length === 0 ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">
              No connections found...
            </p>
          </div>
        ) : (
          <ul>
            {connections?.map((connection) => (
              <li
                key={connection?._id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
              >
                <ConnectionItem
                  connection={connection}
                  updateFn={fetchConnections}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ConnectionItem = ({ connection, updateFn }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user);

  return (
    <div
      key={connection._id}
      className="rounded-xl shadow-lg bg-white/60 p-4 backdrop-blur-2xl flex items-center justify-center flex-col"
    >
      {connection?.connectionData?._id === loggedInUser?._id && (
        <h1 className="absolute top-4 right-4 border rounded-full px-2 border-primary bg-primary bg-opacity-5 text-primary text-xs">
          You
        </h1>
      )}

      <img
        src={
          connection?.connectionData?.profilePicture ||
          "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
        }
        alt={`${connection?.connectionData?.firstName} ${connection?.connectionData?.lastName}`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex items-center">
        <div>
          <h2 className="text-lg font-semibold text-center">
            {connection?.connectionData?.firstName}{" "}
            {connection?.connectionData?.lastName}
          </h2>
          <h2 className="text-center font-medium">
            {connection?.connectionData?.introLine || "Alumns User"}
          </h2>
          <p className="text-gray-500 capitalize text-center">
            {connection?.connectionData?._id !== loggedInUser._id &&
              `Connection :
                  ${
                    connection?.status === "none"
                      ? "Not Connected"
                      : connection?.status
                  }`}
          </p>
        </div>
      </div>
      {connection?.connectionData?._id !== loggedInUser._id ? (
        <ConnectionButtons
          user={{ ...connection, connectionStatus: connection?.status }}
          updateFn={updateFn}
        />
      ) : (
        <button
          onClick={() => {
            navigate(`/dashboard/profile`);
          }}
          className="text-white bg-primary text-sm px-4 py-2 rounded-md hover:bg-blue-800 mt-4"
        >
          View Profile
        </button>
      )}
    </div>
  );
};
