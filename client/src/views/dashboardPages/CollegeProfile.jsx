import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { server, serverUnauth } from "../../helpers/apiCall";
import { useLocation } from "react-router-dom";
import { getFeidlValue } from "../../helpers/predictor";

const CollegeProfile = () => {
  const location = useLocation();

  const [data, setData] = useState(location?.state?.data || {});
  const [cutOffData, setCutOffData] = useState({});
  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
    getData();
    getDataCutOffData();
  }, [data]);

  const getData = () => {
    if (!location?.state?.data) {
      server
        .get(`college/get/${searchParams.get("collegeId")}`)
        .then((res) => setData(res?.data?.data?.College[0], "This is res"))
        .catch((err) => console.log(err));
    }
  };

  const getDataCutOffData = () => {
    if (data?.collegeName) {
      serverUnauth
        .post("/predict-neet", {
          examType: [],
          year: [],
          course: [],
          round: [],
          allottedPH: [],
          quota: [],
          allottedCategory: [],
          instituteName: [data?.collegeName],
          rank: 1,
        })
        .then((res) => {
          const data = res?.data?.data;
          const newArr = [];
          const newObject = {};
          data.map((val) => {
            if (!newArr?.includes(val?.instituteName)) {
              const instituteName = val?.instituteName;
              newArr.push(instituteName);
              delete val["instituteName"];
              newObject[instituteName] = [val];
            } else {
              newObject[val?.instituteName].push(val);
            }
          });
          setCutOffData(newObject);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  };

  console.log(cutOffData, "hello");

  const displayValue = [
    "examType",
    "year",
    "course",
    "round",
    "instituteType",
    "allottedCategory",
    "closingRank",
    "percentage",
  ];

  return (
    <div className="bg-gray-100 w-full scroll-smooth">
      <div className="relative">
        <img
          style={{ maxHeight: "300px" }}
          className="object-cover w-full"
          src={data?.collegeCover}
          alt=""
          data-aos="fade-up"
          data-aos-offset="70"
        />
        <div className="absolute w-full -bottom-16 sm:-bottom-20">
          <img
            className="mx-auto w-32 sm:w-40 h-32 sm:h-40 shadow-lg border-white bg-white rounded"
            src={data?.collegeIcon}
            alt=""
            data-aos="fade-up"
            data-aos-offset="70"
          />
        </div>
      </div>
      <h1
        className="text-xl md:text-2xl font-semibold text-center mt-20 sm:mt-28"
        data-aos="fade-up"
        data-aos-offset="70"
      >
        {data?.displayName || data?.collegeName}
      </h1>
      <div
        className="flex items-center justify-center md:justify-between container mx-auto flex-wrap px-2 md:px-4 mt-6 gap-2"
        id="about"
        data-aos="fade-up"
        data-aos-offset="70"
      >
        <a
          className="py-2 bg-secondary text-white font-semibold text-lg text-center w-48 rounded-md"
          href="#about"
        >
          About
        </a>
        {data?.campusPhotos?.length > 0 && (
          <a
            className="py-2 bg-secondary text-white font-semibold text-lg text-center w-48 rounded-md"
            href="#campus-photos"
          >
            Campus Photos
          </a>
        )}
        {data?.coursesOffered?.length > 0 && (
          <a
            className="py-2 bg-secondary text-white font-semibold text-lg text-center w-48 rounded-md"
            href="#courses-offered"
          >
            Courses
          </a>
        )}
        <a
          className="py-2 bg-secondary text-white font-semibold text-lg text-center w-48 rounded-md"
          href="#cut-off"
        >
          Cut Off
        </a>
        {data?.applicationLink?.length > 0 && (
          <a
            className="py-2 bg-secondary text-white font-semibold text-lg text-center w-48 rounded-md"
            href={data?.applicationLink}
          >
            Apply Now
          </a>
        )}
      </div>

      <div className="container mx-auto my-5">
        <div className="md:flex no-wrap md:mx-2 ">
          <div className="w-full mx-2">
            <div className="overflow-hidden">
              <div
                className="bg-white px-1 py-3 md:p-3 shadow rounded"
                data-aos="flip-up"
                data-aos-offset="50"
              >
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    {data.collegeName && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Institute Name
                        </div>
                        <div className="px-2 md:px-4 py-2">
                          {data.collegeName}
                        </div>
                      </div>
                    )}
                    {data.displayName && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Also Known as Name
                        </div>
                        <div className="px-2 md:px-4 py-2">
                          {data.displayName}
                        </div>
                      </div>
                    )}
                    {data.collegeTag && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          College Tag
                        </div>
                        <div className="px-2 md:px-4 py-2">
                          {data.collegeTag}
                        </div>
                      </div>
                    )}
                    {data.collegeType && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          College Type
                        </div>
                        <div className="px-2 md:px-4 py-2">
                          {data.collegeType}
                        </div>
                      </div>
                    )}
                    {data.estYear && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Establishment Year
                        </div>
                        <div className="px-2 md:px-4 py-2">{data.estYear}</div>
                      </div>
                    )}
                    {data.city && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          City
                        </div>
                        <div className="px-2 md:px-4 py-2">{data.city}</div>
                      </div>
                    )}
                    <div id="campus-photos"></div>
                    {data?.campusPhotos?.length <= 0 && (
                      <div id="courses-offered"></div>
                    )}
                    {data.state && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          State
                        </div>
                        <div className="px-2 md:px-4 py-2">{data.state}</div>
                      </div>
                    )}
                    {data.state && data.city && data.address && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Address
                        </div>
                        <div className="px-2 md:px-4 py-2">
                          {data.address}, {data.city}, {data.state}
                        </div>
                      </div>
                    )}
                    {data.ranking && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Ranking
                        </div>
                        <div className="px-2 md:px-4 py-2">{data.ranking}</div>
                      </div>
                    )}
                    {data.contactNumber && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Phone Number
                        </div>
                        <div className="px-2 md:px-4 py-2">
                          {data.contactNumber}
                        </div>
                      </div>
                    )}
                    {data.website && (
                      <div className="grid grid-cols-2">
                        <div className="px-2 md:px-4 py-2 font-semibold">
                          Website
                        </div>
                        <div className="px-2 md:px-4 py-2">{data.website}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              {data?.campusPhotos?.length > 0 && (
                <div
                  className="bg-white px-1 py-3 md:p-3 shadow rounded my-5"
                  data-aos="flip-up"
                  data-aos-offset="50"
                >
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Campus Photos</span>
                  </div>
                  <div className="m-2 md:m-4 flex flex-wrap gap-2 md:gap-4">
                    {data?.campusPhotos?.map((item) => (
                      <img
                        key={item}
                        className="shadow rounded w-40 h-40 object-cover"
                        src={item}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <div
                className="bg-white px-1 py-3 md:p-3 shadow rounded my-5"
                data-aos="flip-up"
                data-aos-offset="50"
              >
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="">COURSES OFFERED</span>
                    </div>
                    <ul className="flex gap-4 px-4 py-2">
                      {data?.coursesOffered?.map((item) => (
                        <li key={item?.value}>
                          <div className="text-secondary font-bold">
                            {item?.value}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden" id="cut-off">
              <div
                className="overflow-x-scroll bg-white px-1 py-3 md:p-3 shadow rounded my-5"
                data-aos="flip-up"
                data-aos-offset="30"
              >
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span className="">CUT OFF</span>
                </div>

                <div className="flex justify-between bg-gray-100 items-center">
                  {Object.keys(cutOffData)?.length > 0 &&
                    displayValue?.map((val, index) => {
                      if (val === "rank") {
                        return;
                      }
                      return (
                        <div className="p-2 w-auto rounded-full mx-auto font-semibold">
                          <h1
                            style={{
                              minWidth: "120px",
                              maxWidth: "120px",
                            }}
                            className="text-center"
                          >
                            {val
                              ?.replace(/([A-Z])/g, " $1")
                              ?.charAt(0)
                              ?.toUpperCase() +
                              val?.replace(/([A-Z])/g, " $1")?.slice(1)}
                          </h1>
                        </div>
                      );
                    })}
                </div>
                {Object.entries(cutOffData).map((value, index) => {
                  const key = value[0];
                  const val = value[1];
                  return (
                    <div className="p-1 lg:p-4 m-1 shadow-lg rounded-lg">
                      <div className="flex items-center justify-start gap-4">
                        <div className="w-10/12 font-semibold">{key}</div>
                      </div>
                      {val.map((valMap) => (
                        <div className="flex gap-2 justify-between lg:gap-5 my-2 pl-5 border-b-2 py-0.5 px-1 w-full">
                          {Object.keys(cutOffData)?.length > 0 &&
                            displayValue?.map((colData, index) => {
                              return (
                                <div
                                  className="p-1"
                                  data-aos="flip-up"
                                  data-aos-offset="20"
                                >
                                  <h1
                                    style={{
                                      minWidth: "120px",
                                      maxWidth: "120px",
                                    }}
                                    className="text-center truncate"
                                  >
                                    {valMap[colData]}
                                  </h1>
                                </div>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;
