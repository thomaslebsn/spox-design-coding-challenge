import React from "react";

import { ToastContainer, toast } from "react-toastify";

import "./index.scss";

const Toast = () => {
  return <ToastContainer />;
};

const notify = (msg, type = "success") => {
  switch (type) {
    case "error":
      toast.error(msg);
      break;
    case "warn":
      toast.warn(msg);
      break;
    case "success":
      toast.success(msg);
      break;

    default:
      toast.info(msg);
      break;
  }
};

const notifyHTML = (link, text) => {
  return (
    toast(
      <div>
        <a href={link} className="text-white">{text}</a>
      </div>
    , {
      autoClose: false,
      toastId: 'wr_custom_notify'
    })
  );
};

export { Toast, notify, notifyHTML };
