import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

import './index.scss';

const Toast = () => {
  return <ToastContainer />;
};

const notify = (msg, type = 'success') => {
  switch (type) {
    case 'error':
      toast.error(msg);
      break;
    case 'warn':
      toast.warn(msg);
      break;
    case 'success':
      toast.success(msg);
      break;

    default:
      toast.info(msg);
      break;
  }
};

const notifyHTML = (text) => {
  return toast(<div className="text-white" dangerouslySetInnerHTML={{ __html: text }} />, {
    toastId: 'wr_custom_notify',
    autoClose: false,
  });
};

export { Toast, notify, notifyHTML };
