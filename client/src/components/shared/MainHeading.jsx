import React from "react";

const MainHeading = ({ text }) => {
  return (
    <h5 className="text-3xl font-bold leading-none text-secondary mt-2">
      {text}
      <div className="h-2 bg-primary w-11/12  mt-2"></div>
    </h5>
  );
};

export default MainHeading;
