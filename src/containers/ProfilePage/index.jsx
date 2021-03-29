import React from "react";
import Dropzone from "react-dropzone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";

class ProfilePage extends React.Component {
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
        className="position-absolute position-absolute start-0 top-0 bottom-0 end-0 bg-white"
      >
        <img
          src={URL.createObjectURL(file)}
          className="w-100 h-100 object-fit-cover"
        />
      </div>
    ));

    return (
      <div className="py-4 px-3">
        <div className="w-50">
          <form>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="text-blue-0">General Information</h2>
              </div>
              <div className="bg-white p-3">
                <label className="form-label mb-3" htmlFor="name">
                  <span className="text-black opacity-75">Avatar</span>
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
                <div className="d-flex align-items-center row">
                  <div className="col-6">
                    <label className="form-label mb-3" htmlFor="name">
                      <span className="text-black opacity-75">Full name </span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="name"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-3" htmlFor="name">
                      <span className="text-black opacity-75">Title </span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="name"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center row">
                  <div className="col-6">
                    <label className="form-label mb-3" htmlFor="name">
                      <span className="text-black opacity-75">Birthday </span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="name"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-3" htmlFor="name">
                      <span className="text-black opacity-75">Location </span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="name"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center row">
                  <div className="col-6">
                    <label className="form-label mb-3" htmlFor="name">
                      <span className="text-black opacity-75">Email </span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="name"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-3" htmlFor="name">
                      <span className="text-black opacity-75">Phone </span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="text-blue-0">Password</h2>
              </div>
              <div className="d-flex align-items-center row">
                <div className="col-6">
                  <label className="form-label mb-3" htmlFor="name">
                    <span className="text-black opacity-75">Old password </span>
                  </label>
                  <input type="text" className="form-control mb-3" id="name" />
                </div>
                <div className="col-6">
                  <label className="form-label mb-3" htmlFor="name">
                    <span className="text-black opacity-75">Password </span>
                  </label>
                  <input type="text" className="form-control mb-3" id="name" />
                </div>
              </div>
            </div>
            <div className="d-flex">
              <button className="btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2 ms-2">
                <i className="text-white">
                  <FontAwesomeIcon icon={faCog} />
                </i>
                <span className="flex-1 ps-2 text-white">Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
