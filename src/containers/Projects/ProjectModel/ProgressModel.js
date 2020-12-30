import React from "react";
import { ProgressBar } from "react-bootstrap";

class ProgressModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.progress = data.progress ?? 0;
  }

  getProgress = () => {
    return (
      <>
        <ProgressBar className="bg-blue-1 rounded-2 position-relative">
          <ProgressBar
            key={this.id}
            now={this.progress}
            style={{ height: "5px" }}
            className="bg-green rounded-2 fs-14"
          />
          <span className="fs-12 text-blue-0 opacity-75 position-absolute start-0 end-0 bottom-0 text-center pb-2 mb-0">
            {this.progress}%
          </span>
        </ProgressBar>
      </>
    );
  };
}

export { ProgressModel };
