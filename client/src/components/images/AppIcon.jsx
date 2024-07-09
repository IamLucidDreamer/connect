import React from "react";

const AppIcon = ({
  width = "200px",
  height = "200px",
  classname = "",
  logotType = 1,
}) => {
  switch (logotType) {
    case 1:
      return <h1 className="text-3xl">Alumns</h1>;
      break;
    case 2:
      return <h1 className="text-3xl">Alumns</h1>;
      break;
  }
};

export default AppIcon;