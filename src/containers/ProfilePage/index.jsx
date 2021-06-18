import React from 'react';
import UpdateGeneral from './UpdateGeneral';
import UpdatePassword from './UpdatePassword';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='py-4 px-3'>
        <div className='w-75'>
          <h2 className='text-blue-0 mb-3'>General Information</h2>
          <UpdateGeneral />

          <h2 className='text-blue-0 my-3'>Password</h2>
          <UpdatePassword />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
