import React from "react";

const Card = () => {
  return (
    <div className="flex flex-col gap-6 overflow-y-scroll max-h-[85vh]">
      <div className="flex flex-col-reverse lg:flex-row w-full bg-white shadow rounded">
        <div className="w-full lg:w-1/2">
          <div className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6">
            <div className="flex justify-between items-center lg:items-start flex-row-reverse lg:flex-col">
              <h4 className="text-base text-primary tracking-normal leading-4">
                12:00pm
              </h4>
              <h4 className="lg:mt-3 text-gray-600 text-base font-normal">
                23 December, Sunday
              </h4>
            </div>
            <h2 className="text-gray-800 mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">
              CES - The Global Stage for Innovation
            </h2>
            <p className="mb-6 font-normal text-gray-600 text-sm tracking-normal w-11/12 lg:w-9/12">
              The Consumer Technology Association’s CES 2020 will take place on
              7-10 January at the Las Vegas Convention Center in Nevada. It will
              bring together over 150,000 delegates and 4,500 exhibitors to
              explore the business of consumer technologies.
            </p>
          </div>
          <div className="px-5 lg:px-5 md:px-10 py-3 lg:py-4 flex flex-row items-center justify-between border-t border-gray-300">
            <div className="flex items-center">
              <div className="text-gray-600 hover:text-gray-700 cursor-pointer mr-4">
                <svg
                  className="feather feather-bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-primary opacity-75 hover:opacity-100 cursor-pointer">
                <svg
                  className="feather feather-share-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={18} cy={5} r={3} />
                  <circle cx={6} cy={12} r={3} />
                  <circle cx={18} cy={19} r={3} />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 lg:h-auto lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
          <img
            className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none"
            src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_27.png"
            alt="banner"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-full bg-white shadow rounded">
        <div className="w-full lg:w-1/2">
          <div className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6">
            <div className="flex justify-between items-center lg:items-start flex-row-reverse lg:flex-col">
              <h4 className="text-base text-primary tracking-normal leading-4">
                12:00pm
              </h4>
              <h4 className="lg:mt-3 text-gray-600 text-base font-normal">
                23 December, Sunday
              </h4>
            </div>
            <h2 className="text-gray-800 mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">
              CES - The Global Stage for Innovation
            </h2>
            <p className="mb-6 font-normal text-gray-600 text-sm tracking-normal w-11/12 lg:w-9/12">
              The Consumer Technology Association’s CES 2020 will take place on
              7-10 January at the Las Vegas Convention Center in Nevada. It will
              bring together over 150,000 delegates and 4,500 exhibitors to
              explore the business of consumer technologies.
            </p>
          </div>
          <div className="px-5 lg:px-5 md:px-10 py-3 lg:py-4 flex flex-row items-center justify-between border-t border-gray-300">
            <div className="flex items-center">
              <div className="text-gray-600 hover:text-gray-700 cursor-pointer mr-4">
                <svg
                  className="feather feather-bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-primary opacity-75 hover:opacity-100 cursor-pointer">
                <svg
                  className="feather feather-share-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={18} cy={5} r={3} />
                  <circle cx={6} cy={12} r={3} />
                  <circle cx={18} cy={19} r={3} />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 lg:h-auto lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
          <img
            className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none"
            src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_27.png"
            alt="banner"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-full bg-white shadow rounded">
        <div className="w-full lg:w-1/2">
          <div className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6">
            <div className="flex justify-between items-center lg:items-start flex-row-reverse lg:flex-col">
              <h4 className="text-base text-primary tracking-normal leading-4">
                12:00pm
              </h4>
              <h4 className="lg:mt-3 text-gray-600 text-base font-normal">
                23 December, Sunday
              </h4>
            </div>
            <h2 className="text-gray-800 mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">
              CES - The Global Stage for Innovation
            </h2>
            <p className="mb-6 font-normal text-gray-600 text-sm tracking-normal w-11/12 lg:w-9/12">
              The Consumer Technology Association’s CES 2020 will take place on
              7-10 January at the Las Vegas Convention Center in Nevada. It will
              bring together over 150,000 delegates and 4,500 exhibitors to
              explore the business of consumer technologies.
            </p>
          </div>
          <div className="px-5 lg:px-5 md:px-10 py-3 lg:py-4 flex flex-row items-center justify-between border-t border-gray-300">
            <div className="flex items-center">
              <div className="text-gray-600 hover:text-gray-700 cursor-pointer mr-4">
                <svg
                  className="feather feather-bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-primary opacity-75 hover:opacity-100 cursor-pointer">
                <svg
                  className="feather feather-share-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={18} cy={5} r={3} />
                  <circle cx={6} cy={12} r={3} />
                  <circle cx={18} cy={19} r={3} />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 lg:h-auto lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
          <img
            className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none"
            src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_27.png"
            alt="banner"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-full bg-white shadow rounded">
        <div className="w-full lg:w-1/2">
          <div className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6">
            <div className="flex justify-between items-center lg:items-start flex-row-reverse lg:flex-col">
              <h4 className="text-base text-primary tracking-normal leading-4">
                12:00pm
              </h4>
              <h4 className="lg:mt-3 text-gray-600 text-base font-normal">
                23 December, Sunday
              </h4>
            </div>
            <h2 className="text-gray-800 mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">
              CES - The Global Stage for Innovation
            </h2>
            <p className="mb-6 font-normal text-gray-600 text-sm tracking-normal w-11/12 lg:w-9/12">
              The Consumer Technology Association’s CES 2020 will take place on
              7-10 January at the Las Vegas Convention Center in Nevada. It will
              bring together over 150,000 delegates and 4,500 exhibitors to
              explore the business of consumer technologies.
            </p>
          </div>
          <div className="px-5 lg:px-5 md:px-10 py-3 lg:py-4 flex flex-row items-center justify-between border-t border-gray-300">
            <div className="flex items-center">
              <div className="text-gray-600 hover:text-gray-700 cursor-pointer mr-4">
                <svg
                  className="feather feather-bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-primary opacity-75 hover:opacity-100 cursor-pointer">
                <svg
                  className="feather feather-share-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={18} cy={5} r={3} />
                  <circle cx={6} cy={12} r={3} />
                  <circle cx={18} cy={19} r={3} />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 lg:h-auto lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
          <img
            className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none"
            src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_27.png"
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
