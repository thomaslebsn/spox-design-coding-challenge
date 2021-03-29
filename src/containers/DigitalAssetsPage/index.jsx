import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

function DigitalAssetsPage() {
  return (
    <div className="py-4 px-3">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-blue-0">Your Digital Assets</h2>
        <div className="d-flex align-items-center">
          <button className="btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2 ms-2">
            <i className="text-white">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <span className="flex-1 ps-2 text-white">New</span>
          </button>
        </div>
      </div>
      <div>
        <img
          src="assets/images/digital-assets.png"
          className="w-100 object-fix-cover"
        />
      </div>
    </div>
  );
}

export default DigitalAssetsPage;
