import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const WarningMessage = ({ onConfirm }) => {
  return (
    <div className="gap-1 w-full h-12 flex flex-col justify-center items-center border-2 border-red-500 bg-red-300 rounded-lg my-2 py-8">
      <div className="flex gap-1 justify-center items-center">
        <FontAwesomeIcon
          className="text-red-500"
          icon={faTriangleExclamation}
        />
        <span className="text-red-500 font-bold">혈당체크가 필요해요!</span>
      </div>
      <div
        className="flex justify-center items-center bg-white w-[50%] rounded-xl border-2 border-red-500 cursor-pointer"
        onClick={onConfirm}
      >
        <span>확인</span>
      </div>
    </div>
  );
};

export default WarningMessage;
