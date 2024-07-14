import React from "react";

const WarningMessage = ({ warningMessage }) => {

  return (
    warningMessage && (
      <div className="w-full flex justify-end mt-2">
        <span className="font-normal text-xs leading-4 tracking-wide text-left text-[#ff9800]">
          {warningMessage}
        </span>
      </div>
    )
  );
};

export default WarningMessage;
