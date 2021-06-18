import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';

class UpdateGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  componentDidMount() {

  }

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
      <div>
        <div className="bg-white p-3">
          <div className="row">
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="name">
                <span className="text-black opacity-75">Avatar</span>
              </label>
              <div className="border-da-1 mb-3">
                <Dropzone onDrop={this.onDrop}>
                  {({getRootProps, getInputProps}) => (
                    <div className="position-relative  cursor-pointer">
                      <div
                        {...getRootProps()}
                        className="d-flex align-items-center justify-content-center p-3 pb-4"
                      >
                        <input
                          {...getInputProps()}
                          className="position-absolute start-0 top-0 bottom-0 end-0"
                        />
                        <div className="d-flex align-items-center p-4">
                          <i className="fs-1 text-blue-0 opacity-25">
                            <FontAwesomeIcon icon={faCloudUploadAlt}/>
                          </i>
                          <div className="text-center ms-1">
                            <p className="mb-0 fs-6">
                              Drag and drop a file here or <strong>Choose file</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                      {files}
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="form-label mb-3" htmlFor="status">
                  <span className="text-black opacity-75">Username</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value="abbyflemming"
                  disabled
                />
              </div>
              <div>
                <label className="form-label mt-3 mb-2" htmlFor="status">
                  <span className="text-black opacity-75">Status</span>
                </label>
                <input
                  type="text"
                  className="form-control mb-3 "
                  style={{color: "green"}}
                  id="status"
                  name="status"
                  value="Active"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center row">
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="fullname">
                <span className="text-black opacity-75">Full name</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="fullname"
                name="fullname"
              />
            </div>
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="email">
                <span className="text-black opacity-75">Email</span>
              </label>
              <input
                type="email"
                className="form-control mb-3"
                id="email"
                name="email"
                value="example@gmail.com"
                disabled
              />
            </div>
          </div>
          <div className="d-flex align-items-center row">
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="phone">
                <span className="text-black opacity-75">Phone</span>
              </label>
              <input
                type="tel"
                className="form-control mb-3"
                id="phone"
                name="phone"
              />
            </div>
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="birthday">
                <span className="text-black opacity-75">Birthday</span>
              </label>
              <input
                type="date"
                className="form-control mb-3"
                id="birthday"
                name="birthday"
              />
            </div>
          </div>
          <div className="d-flex align-items-center row">
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="address">
                <span className="text-black opacity-75">Address 1</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="address"
                name="address"
              />
            </div>
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="address_2">
                <span className="text-black opacity-75">Address 2</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="address_2"
                name="address_2"
              />
            </div>
          </div>
          <div className="d-flex align-items-center row">
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="city">
                <span className="text-black opacity-75">City</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="city"
                name="city"
              />
            </div>
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="state">
                <span className="text-black opacity-75">State</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="state"
                name="state"
              />
            </div>
          </div>
          <div className="d-flex align-items-center row">
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="country">
                <span className="text-black opacity-75">Country</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="country"
                name="country"
              />
            </div>
            <div className="col-6">
              <label className="form-label mb-3" htmlFor="zipcode">
                <span className="text-black opacity-75">Zipcode</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="zipcode"
                name="zipcode"
              />
            </div>
          </div>
          <div className="d-flex align-items-center row">
            <div>
              <button
                className="btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2">
                <i className="text-white">
                  <FontAwesomeIcon icon={faUserCog}/>
                </i>
                <span className="flex-1 ps-2 text-white">Update</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateGeneral;