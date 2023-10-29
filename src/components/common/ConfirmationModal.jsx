import React from "react";
import { IconBtn } from "./IconBtn";

export const ConfirmationModal = ({ modalData, isOpen }) => {
  // Custom styles for the modal
  const modalStyles = isOpen
    ? "fixed inset-0 flex justify-center items-center bg-opacity-75 backdrop-blur-lg"
    : "hidden";

  return (
    <div className={`${modalStyles} bg-richblack-800 text-white z-40`}>
      <div className="bg-[#0e030345] rounded-lg p-6 shadow-lg">
        <p className="font-bold text-xl text-richblack-100">{modalData.text1}</p>
        <p className="text-sm text-richblack-100">{modalData.text2}</p>
        <div className="flex gap-2 mt-4">
          <IconBtn onClick={modalData?.btn1Handler} text={modalData?.btn1Text} />
          <button
            onClick={modalData?.btn2Handler}
            className="bg-red-500 hover:bg-red-600 text-white font-bold flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};
