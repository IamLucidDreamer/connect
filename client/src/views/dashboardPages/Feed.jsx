import {
  BellIcon,
  CameraIcon,
  ChatIcon,
  ChevronDownIcon,
  DuplicateIcon,
  GlobeIcon,
  MailIcon,
  PaperAirplaneIcon,
  PencilIcon,
  ThumbUpIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";

const Feed = () => {
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
                <div className="flex flex-row items-center">
                  <PencilIcon className="w-5 h-5" />
                  <sm className="ml-2 text-left text-md font-SourceSansProSemibold text-gray-600">
                    Write article
                  </sm>
                </div>
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
            {Array.from({ length: 5 }).map((_, i) => (
              <FeedCard key={i} id={i} />
            ))}
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

const FeedCard = ({ id }) => {
  return (
    <div className="rounded-lg border-gray-200 bg-white border-2 pb-2">
      <div className="flex flex-row p-4 items-center">
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
          className="w-14 h-14 rounded-full"
          alt="profile"
        />
        <div className="flex flex-col ml-2 ">
          <div className="flex flex-row items-center gap-2">
            <h4 className="font-SourceSansProSemibold text-center text-md">
              Stella Waithera
            </h4>
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <p className="text-center font-SourceSansProLight text-sm text-gray-900">
              Friend
            </p>
          </div>
          <div className="">
            <p className="font-SourceSansProLight text-sm text-gray-900">
              Founder of AfricanSTEMGirl
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-center font-SourceSansProLight text-sm text-gray-900">
              57 min
            </p>
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <GlobeIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex flex-col mx-4">
          <p className="font-ArialRegular text-base text-gray-800">
            What a night! Join me in applauding the incredible talent,
            innovation, glamour, and swag experienced yesterday at the Black
            Tech Achievements Awards! Still in Awe!!!
          </p>
          <br></br>
          <a href="" className="font-ArialRegular text-base text-blue-700 ">
            Black Tech Achievement Awards
          </a>
          <br></br>
          <div className="flex flex-flow">
            <a
              href="#"
              className="font-ArialRegular text-base text-blue-700 mr-2"
            >
              #BlackTechAwards
            </a>
            <a
              href="#"
              className="font-ArialRegular text-base text-blue-700 mr-2"
            >
              #TechAwards
            </a>
            <a href="#" className="font-ArialRegular text-base text-blue-700 ">
              #Awards
            </a>
          </div>
        </div>
        <img
          src={`https://picsum.photos/200/300?random=${id}`}
          alt="feed image"
          className="w-full p-0 object-contain max-h-[45vh]"
        />
        <div className="flex flex-col mx-4">
          <div className="flex flex-row w-full mb-1 items-center">
            <ThumbUpIcon className="w-6 h-6 mr-1" />
            <sm className="flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600 ml-1">
              4
            </sm>
            <sm className="text-left text-sm font-SourceSansProSemibold text-gray-600">
              4 reposts
            </sm>
          </div>
        </div>
        <hr class="h-px my-4 mx-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-row mx-4">
          <div className="flex flex-row items-center">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              className="w-6 h-6 rounded-full"
              alt="profile"
            />
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              className="w-6 h-6 rounded-full -ml-2 border border-gray-600"
              alt="profile"
            />
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              className="w-6 h-6 rounded-full -ml-2 border border-gray-600"
              alt="profile"
            />
          </div>
          <div className="flex flex-row mx-6">
            <div className="flex flex-row mx-4 items-center">
              <ThumbUpIcon className="w-6 h-6 mr-1" />
              <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                Like
              </sm>
            </div>
            <div className="flex flex-row mx-4 items-center">
              <ChatIcon className="w-6 h-6 mr-1" />
              <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                Comment
              </sm>
            </div>
            <div className="flex flex-row mx-4 items-center">
              <DuplicateIcon className="w-6 h-6 mr-1" />
              <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                Repost
              </sm>
            </div>
            <div className="flex flex-row mx-4 items-center">
              <PaperAirplaneIcon className="w-6 h-6 mr-1 rotate-90" />
              <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                Send
              </sm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="sticky top-20">
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
    </div>
  );
};

const OrganizationActivity = () => {
  return (
    <div className="sticky top-20">
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

      <div className="rounded-lg border-gray-200 bg-white border-2 pb-2 mt-2 px-3 py-2">
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
