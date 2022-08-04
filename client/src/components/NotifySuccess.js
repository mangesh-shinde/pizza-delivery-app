import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function NotifySuccess() {
  return (
    <div className="border-l-4 border-green-700 my-4 w-1/5 flex align-items justify-center bg-green-300 rounded-md absolute right-0 notification-transition">
      <div className="px-4 py-4 text-green-700 ff-open-sans">
        <CheckCircleOutlineIcon />
      </div>
      <div className="py-4">
          <p className="ff-open-sans font-bold">Pizza added to cart</p>
      </div>
    </div>
  );
}

export default NotifySuccess;
