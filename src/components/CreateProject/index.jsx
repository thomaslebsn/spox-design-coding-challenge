import React from "react";
import Dropzone from "react-dropzone";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";

import "./index.scss";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  onDrop = (files) => {
    this.setState({ files });
  };

  render() {
    const files = this.state.files.map((file, index) => (
      <div
        key={file.name}
        className="position-absolute position-absolute start-0 top-0 bottom-0 end-0"
      >
        <img src={URL.createObjectURL(file)} />
      </div>
    ));

    return (
      <div className="bg-white">
        <div className="w-75 p-2 m-auto">
          <h3 className="fw-medium text-blue-0 mb-3 fs-2">
            Create a new project
          </h3>
          <form>
            <label className="form-label mb-3" htmlFor="name">
              <span className="text-black opacity-75">Project name </span>
              <span className="text-red-1">*</span>
            </label>
            <input type="text" className="form-control mb-4" id="name" />

            <label className="form-label mb-3" htmlFor="startdate">
              <span className="text-black opacity-75">Start date </span>
              <span className="text-red-1">*</span>
            </label>
            <input type="text" className="form-control mb-4" id="startdate" />

            <label className="form-label mb-3" htmlFor="enddate">
              <span className="text-black opacity-75">End date </span>
              <span className="text-red-1">*</span>
            </label>
            <input type="text" className="form-control mb-4" id="enddate" />

            <label className="form-label mb-3">
              <span className="text-black opacity-75">Project logo </span>
            </label>
            <div className="border-da-1 mb-3">
              <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div className="position-relative  cursor-pointer">
                    <div
                      {...getRootProps()}
                      className="d-flex align-items-center justify-content-center p-3"
                    >
                      <input
                        {...getInputProps()}
                        className="position-absolute start-0 top-0 bottom-0 end-0"
                      />
                      <div className="d-flex align-items-center p-3">
                        <i className="fs-1 text-blue-0 opacity-25">
                          <FontAwesomeIcon icon={faCloudUploadAlt} />
                        </i>
                        <div className="text-center ms-1">
                          <p className="mb-0">Drag and drop a file here </p>
                          <p className="mb-0">
                            or <strong>Choose file</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    {files}
                  </div>
                )}
              </Dropzone>
            </div>
            <label className="form-label mb-3" htmlFor="shortdesc">
              <span className="text-black opacity-75">
                Short description about project{" "}
              </span>
            </label>
            <textarea className="form-control mb-4" id="shortdesc" rows={3} />
          </form>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(CreateProject);
