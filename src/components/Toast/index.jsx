import React from "react";

import "./index.scss";

class Toast extends React.Component {
  render() {
    return (
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          class="toast d-flex align-items-center text-white bg-primary border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-body">Hello, world! This is a toast message.</div>
          <button
            type="button"
            class="btn-close btn-close-white ms-auto me-2"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }
}

export default Toast;
