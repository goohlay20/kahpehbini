import React from "react";

const ErrorMessage = ({ errorMessage, error }) => {
  const displayMessage = errorMessage || error;

  return (
    displayMessage && (
      <div className="w-full flex justify-end mt-2">
        <span className="font-normal text-xs leading-4 tracking-wide text-left text-[#D32F2F]">
          {displayMessage}
        </span>
      </div>
    )
  );
};

export default ErrorMessage;
