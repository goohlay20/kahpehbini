import React from "react";

const SuccessMessage = ({ successMessage }) => {
  return (
    successMessage && (
      <div className="w-full flex justify-end">
        <span className="font-normal text-xs leading-4 tracking-wide text-left text-[#2E7D32]">
          {successMessage}
        </span>
      </div>
    )
  );
};

export default SuccessMessage;
