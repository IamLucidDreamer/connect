import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import Updates from "../layout/Updates";
import dayjs from "dayjs";
import { isStringEmpty, truncate } from "../../helpers";
import MainHeading from "../../components/shared/MainHeading";
import { useNavigate } from "react-router-dom";

import placeholderImage from "../../assets/images/profile_cover.jpg";

const BlogPage = () => {
  const [data, setData] = useState([]);
  const [lading, setLoading] = useState(false);

  const requestCaller = () => {
    setLoading(true);
    serverUnauth
      .get(`/blog/get-all`)
      .then((res) => {
        setData(res?.data?.data?.blogs);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    requestCaller();
  }, []);

  return (
    <div className="p-4 sm:p-8 mx-auto container">
      <div className="flex items-center justify-between mb-4">
        <MainHeading text={"Blogs"} />
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="w-full lg:w-3/4 flex flex-col gap-y-8">
          {lading ? (
            <>
              <BlogLaodingCard />
              <BlogLaodingCard />
              <BlogLaodingCard />
              <BlogLaodingCard />
              <BlogLaodingCard />
              <BlogLaodingCard />
              <BlogLaodingCard />
              <BlogLaodingCard />
            </>
          ) : (
            data?.map((val) => {
              return (
                <BlogCard
                  title={val?.title}
                  description={val?.description}
                  imagePrimary={val?.imageMain}
                  imageSecondary={val?.imageSecondary}
                  createdAt={val?.createdAt}
                  id={val?._id}
                />
              );
            })
          )}
        </div>
        <Updates />
      </div>
    </div>
  );
};

export default BlogPage;

const BlogCard = ({
  title,
  description,
  imagePrimary,
  imageSecondary,
  id,
  createdAt,
}) => {
  const navigate = useNavigate();
  console.log(imagePrimary, "hello");
  return (
    <button
      onClick={() => navigate(`/dashboard/blogs/${id}`)}
      className="flex flex-col rounded-lg bg-white shadow-md md:max-w-5xl md:flex-row w-full"
      data-aos="fade-up"
      data-aos-offset="50"
    >
      <img
        className={`h-72 rounded-t-lg object-cover md:w-60  md:rounded-none md:rounded-l-lg ${
          isStringEmpty(imageSecondary) && isStringEmpty(imagePrimary)
            ? "object-right"
            : "object-center"
        }`}
        src={
          isStringEmpty(imageSecondary) ||
          isStringEmpty(imagePrimary) ||
          placeholderImage
        }
        alt=""
      />
      <div className="flex flex-col justify-start p-6 w-full">
        <p className="text-secondary font-semibold text-2xl mb-4 text-justify">
          {title}
        </p>
        <p className="mb-4 text-base text-secondary text-justify">
          {truncate(description)}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p
            className="text-sm text-gray-700 border-secondary border-opacity-20 rounded-full py-1 px-2"
            style={{ borderWidth: "1px" }}
          >
            {dayjs(createdAt).format("YYYY-MM-DD  HH:mm")}
          </p>
          <div className="bg-primary px-2.5 py-1.5 rounded-lg text-white font-semibold text-sm">
            Read More
          </div>
        </div>
      </div>
    </button>
  );
};

const BlogLaodingCard = () => {
  return (
    <div class="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
      <div class="flex flex-col flex-1 gap-5 sm:p-2">
        <div class="flex flex-1 flex-col gap-3">
          <div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl"></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
        </div>
        <div class="mt-auto flex gap-3">
          <div class="bg-gray-200 w-32 h-8 animate-pulse rounded-full"></div>
          <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto"></div>
        </div>
      </div>
    </div>
  );
};
