import React from "react";
import { Transition } from "@headlessui/react";

const CustomValidationErrorMessage = ({ show, error }) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <h3 className="text-red-600 text-sm">{error}</h3>
    </Transition>
  );
};

export default CustomValidationErrorMessage;
