import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

class UpdatePassword extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className='bg-white p-3'>
          <div className="d-flex align-items-center row">
            <div className="col-4">
              <label className="form-label mb-3" htmlFor="old_password">
                <span className="text-black opacity-75">Current password</span>
              </label>
              <input type="password" className="form-control mb-3" id="old_password"/>
            </div>
            <div className="col-4">
              <label className="form-label mb-3" htmlFor="new_password">
                <span className="text-black opacity-75">New Password</span>
              </label>
              <input type="password" className="form-control mb-3" id="new_password"/>
            </div>
            <div className="col-4">
              <label className="form-label mb-3" htmlFor="new_password">
                <span className="text-black opacity-75 text-nowrap">Confirm New Password</span>
              </label>
              <input type="password" className="form-control mb-3" id="new_password"/>
            </div>
            <div>
              <button
                className="btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2">
                <i className="text-white">
                  <FontAwesomeIcon icon={faCog}/>
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

export default UpdatePassword;
