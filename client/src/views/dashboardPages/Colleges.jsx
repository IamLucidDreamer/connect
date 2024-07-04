import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import Updates from "../layout/Updates";
import dayjs from "dayjs";
import MainHeading from "../../components/shared/MainHeading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Colleges = () => {
  const [data, setData] = useState([]);

  // const [dataTop, setDataTop] = useState([]);

  const [dataTopState, setDataTopState] = useState([]);

  const user = useSelector((state) => state?.user);

  useEffect(() => {
    serverUnauth
      .get(`/college/get-all`)
      .then((res) => {
        setData(res?.data?.data?.College);
      })
      .catch((err) => {
        console.log(err);
      });

    // serverUnauth
    //   .get(`/college/get-all-top`)
    //   .then((res) => {
    //     setDataTop(res?.data?.data?.College);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (user?.state) {
      serverUnauth
        .post(`/college/get-all-top-state`, { state: user?.state })
        .then((res) => {
          setDataTopState(res?.data?.data?.College);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div className="p-4 sm:p-8 mx-auto container">
      <div className="flex items-center justify-between mb-4">
        <MainHeading text={"Colleges"} />
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="w-full flex flex-wrap gap-8 justify-center lg:justify-evenly my-4">
          {data?.map((val) => {
            return (
              <CollegeCardLocal
                data={val}
                coverImage={val.collegeCover}
                collegeIcon={val.collegeIcon}
                collegeName={val.displayName || val.collegeName}
                location={`${val.city}, ${val.state}`}
              />
            );
          })}
        </div>
      </div>

      {/* <div className="flex items-center justify-between mb-4">
        <MainHeading text={"Top Colleges"} />
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="w-full flex gap-8 justify-center lg:justify-evenly my-4 max-w-screen overflow-x-scroll no-scrollbar">
          {dataTop?.map((val) => {
            return (
              <div className="min-w-max">
                <CollegeCardLocal
                  data={val}
                  coverImage={val.collegeCover}
                  collegeIcon={val.collegeIcon}
                  collegeName={val.collegeName}
                  location={`${val.city}, ${val.state}`}
                />
              </div>
            );
          })}
        </div>
      </div> */}

      {user?.name && user?.state && dataTopState?.length !== 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <MainHeading text={"Top Colleges in Your State"} />
          </div>
          <div className="flex justify-between items-start gap-6">
            <div className="w-full flex gap-8 justify-center lg:justify-evenly my-4 max-w-screen overflow-x-scroll no-scrollbar">
              {dataTopState?.map((val) => {
                return (
                  <CollegeCardLocal
                    data={val}
                    coverImage={val.collegeCover}
                    collegeIcon={val.collegeIcon}
                    collegeName={val.collegeName}
                    location={`${val.city}, ${val.state}`}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Colleges;

export const CollegeCardLocal = ({
  data,
  coverImage,
  collegeIcon,
  collegeName,
  location,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-1" data-aos="fade" data-aos-offset="10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/dashboard/colleges/${data?._id}`, {
            state: { data: data },
          });
        }}
        className="relative rounded-lg bg-white shadow-md md:flex-row"
        style={{ maxWidth: "450px" }}
      >
        <img
          style={{ height: "220px" }}
          className="rounded-lg object-cover w-full"
          src={coverImage}
          alt=""
        />
        <div className="relative">
          <img
            style={{ width: "100px", height: "100px" }}
            className="rounded-lg mx-auto shadow-lg -mt-16 bg-white object-cover"
            src={collegeIcon}
            alt=""
          />
        </div>
        <div className="px-2 md:px-4">
          <p className="text-secondary font-semibold text-xl text-center mt-4">
            {collegeName}
          </p>
          <p className="mb-2 text-sm text-secondary text-center">{location}</p>
          <div className="flex justify-center gap-4 items-center p-3 pb-5">
            <button
              className="border-secondary text-secondary px-2.5 py-1 rounded-lg text-sm"
              style={{ borderWidth: "1px" }}
            >
              Read More
            </button>
            {data?.applicationLink && (
              <a
                className="bg-primary text-white px-2.5 py-1.5 rounded-lg text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://${data?.applicationLink}`, "_blank");
                }}
              >
                Apply Now
              </a>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export const CollgeCard = ({
  data,
  coverImage,
  collegeIcon,
  collegeName,
  location,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-4" data-aos="flip-up" data-aos-offset="100">
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/dashboard/colleges/${data?._id}`, {
            state: { data: data },
          });
        }}
        className="relative rounded-lg bg-white shadow-md md:flex-row w-full md:max-w-screen-sm"
      >
        <img
          style={{ height: "220px" }}
          className="rounded-lg object-cover w-full"
          src={coverImage}
          alt=""
        />
        <div className="relative">
          <img
            style={{ width: "100px", height: "100px" }}
            className="rounded-lg mx-auto shadow-lg -mt-16 bg-white object-cover"
            src={collegeIcon}
            alt=""
          />
        </div>
        <div className="px-2">
          <p className="text-secondary font-semibold text-xl text-center mt-4">
            {collegeName}
          </p>
          <p className="mb-2 text-sm text-secondary text-center">{location}</p>
          <div className="flex justify-center gap-4 items-center p-3 pb-5">
            <button
              className="border-secondary text-secondary px-2.5 py-1 rounded-lg text-sm"
              style={{ borderWidth: "1px" }}
            >
              Read More
            </button>
            {data?.applicationLink && (
              <a
                className="bg-primary text-white px-2.5 py-1.5 rounded-lg text-sm"
                href={data?.applicationLink}
                target="_blank"
              >
                Apply Now
              </a>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};
