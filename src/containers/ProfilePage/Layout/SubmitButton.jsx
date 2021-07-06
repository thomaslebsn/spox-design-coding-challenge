import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';

const SubmitButton = ({validateInfoBeforeSending}) => {
  return (<div>
    <div className='d-flex align-items-center row'>
      <div>
        <button onClick={(e) => {
          e.preventDefault();
          validateInfoBeforeSending();
        }}
                className='btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2'>
          <i className='text-white'>
            <FontAwesomeIcon icon={faUserCog} />
          </i>
          <span className='flex-1 ps-2 text-white'>Update</span>
        </button>
      </div>
    </div>
    </div>);
};

export default SubmitButton;
