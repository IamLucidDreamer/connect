import React, { useState, useEffect } from "react";
import AppLogo from "../images/AppIcon";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error(error, errorInfo);
      setHasError(true);
    };

    // Attach the error handler to the window's error event
    window.addEventListener("error", errorHandler);

    return () => {
      // Clean up the error handler
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4 flex-col p-4">
        <AppLogo />
        <h1>Something went wrong.</h1>
        <button
          className="p-2.5 text-lg rounded-lg bg-secondary text-white w-40 my-3 shadow-lg"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
        <h1 className="text-xs max-w-md">
          Note : The App is still under active development if it doen't work
          after refresh. Try again after some time. Our team is working
          tirelessly to serve you with best experience.
        </h1>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
