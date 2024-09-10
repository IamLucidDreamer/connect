import React from "react";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../helpers/auth";

const AppIcon = ({
  width = "200px",
  height = "200px",
  classname = "",
  logotType = 1,
}) => {
  const authToken = getAuthToken();
  switch (logotType) {
    case 1:
      return (
        <Link to={authToken ? "/dashboard" : "/"}>
          <h1 className="text-3xl">Alumns</h1>
        </Link>
      );
      break;
    case 2:
      return (
        <Link to={authToken ? "/dashboard" : "/"}>
          <h1 className="text-3xl">Alumns</h1>
        </Link>
      );
      break;
  }
};

export default AppIcon;
