import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrganization,
  setUserOrganization,
} from "../../../store/actions/organizationActions";
import { useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import ListMember from "./ListMember";
import ListMemberToApprove from "./ListMembersForApproval";

const OrganizationForm = () => {
  const dispatch = useDispatch();
  const [showTab, setShowTab] = useState(1);
  const organizationList = useSelector(
    (state) => state.organization?.organizationData
  );
  const { organizationId: organizationIdFromParams } = useParams();
  const organizationData = organizationList?.find(
    (org) => org.organizationId?._id === organizationIdFromParams
  );

  const fullOrgData = organizationData?.organizationId || {};

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={
                    fullOrgData?.profileImage ||
                    "https://cdn4.vectorstock.com/i/1000x1000/77/43/organization-icon-vector-23027743.jpg"
                  }
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile"
                />
                {/* <input
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                ></input> */}
                <h1 className="text-xl font-bold">
                  {`${fullOrgData?.name || ""}`}
                </h1>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-5 gap-4">
                <button
                  onClick={() => setShowTab(1)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 1
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  Organization Details
                </button>
                <button
                  onClick={() => setShowTab(2)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 2
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  Members Details
                </button>
                <button
                  onClick={() => setShowTab(3)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 3
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  New Joiners
                </button>
              </div>
              {showTab === 1 && <EditProfile />}
              {showTab === 2 && (
                <ListMember organizationId={organizationIdFromParams} />
              )}
              {showTab === 3 && (
                <ListMemberToApprove
                  organizationId={organizationIdFromParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
