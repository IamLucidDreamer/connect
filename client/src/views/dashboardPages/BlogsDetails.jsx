import React, { useEffect, useState } from "react";
import BlogsSidebar from "../layout/BlogsSidebar";
import { serverUnauth } from "../../helpers/apiCall";
import { useParams } from "react-router-dom";

const BlogsDetails = () => {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetails] = useState();

  useEffect(() => {
    serverUnauth
      .get(`/blog/get/${blogId}`)
      .then((res) => {
        setBlogDetails(res?.data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-start justify-between gap-4 mt-12">
      <div className="bg-gray-50 w-full lg:w-3/4">
        <div className="px-2 lg:px-10 mx-auto">
          <div className="max-w-6xl pb-6 mx-auto bg-gray-50">
            <a href="#_" className="block transition duration-200 ease-out">
              <img
                className="object-cover w-full shadow-sm"
                src={blogDetail?.imageMain}
                style={{ maxHeight: "600px" }}
              />
            </a>

            <div className="mt-8">
              <a
                href="#"
                className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-secondary hover:underline"
              >
                {blogDetail?.title}
              </a>
            </div>

            <div className="max-w-4xl mx-auto text-lg md:text-2xl text-gray-700 mt-4">
              <div>
                <p className="p-0 lg:p-4 lg:pt-0 whitespace-pre-line">
                  {blogDetail?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogsSidebar />
    </div>
  );
};

export default BlogsDetails;
