import React from 'react';

const AvatarDAM = ({children}) => {
  return (
    <div className='col-3'>
      <label className='form-label mb-3' htmlFor='name'>
        <span className='text-black opacity-75'>Profile picture</span>
      </label>
      <div className='border-da-1 mb-3'>
        {children}
      </div>
    </div>
  );
};

export default AvatarDAM;
