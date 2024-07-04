import React, { useEffect, useState } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import dayjs from "dayjs";
import { isStringEmpty } from "../../helpers";

import placeholderImage from "../../assets/images/profile_cover.jpg";
import { useNavigate } from "react-router-dom";

const BlogsSidebar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    serverUnauth
      .get(`/blog/get-all`)
      .then((res) => {
        setData(res?.data?.data?.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="hidden lg:block w-1/4 max-w-md p-4 bg-white rounded-lg shadow-lg sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-secondary">
          Recent Blogs
        </h5>
      </div>
      <div className="flex flex-col gap-2">
        {data?.map((val) => {
          return (
            <Card
              id={val?._id}
              title={val?.title}
              description={val?.description}
              imagePrimary={val?.imageMain}
              imageSecondary={val?.imageSecondary}
              createdAt={val?.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogsSidebar;

const Card = ({
  id,
  title,
  description,
  imagePrimary,
  imageSecondary,
  createdAt,
}) => {
  const navigate = useNavigate();

  return (
    <button
      style={{ borderWidth: "0px 0px 1px" }}
      onClick={() => navigate(`/dashboard/blogs/${id}`)}
    >
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <div className="">
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg max-h-48 mx-auto"
                  src={
                    isStringEmpty(imageSecondary) ||
                    isStringEmpty(imagePrimary) ||
                    placeholderImage
                  }
                  alt="Lana image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-secondary font-semibold leading-6 mb-1 text-xl my-4 text-left">
                  {title}
                </h2>
                <p className="mb-1 font-medium text-secondary truncate text-left">
                  {description}
                </p>
                <p className="text-sm text-gray-500 truncate mr-auto">
                  {dayjs(createdAt).format("YYYY-MM-DD  HH:mm")}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </button>
  );
};
