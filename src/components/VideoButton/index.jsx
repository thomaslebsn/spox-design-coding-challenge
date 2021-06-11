import React, { Component, lazy } from 'react';
import { AUTHORIZATION_KEY, AXIOS_CONFIGS } from 'easii-io-web-service-library';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

class VideoButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exportUrlVideo: this.props.data,
    }
  }

  render() {
    let { exportUrlVideo } = this.state;
    let { handleVideo } = this.props;
    
    return (
      <>
        <button
          className="wr_btn_dam border-0 bg-blue-2 rounded-2 px-3 position-relativee"
          type="button"
        >
          <i className="text-white">
            <FontAwesomeIcon icon={faVideo} />
          </i>
          <span className="text-white ms-2">Video</span>
          <input type="file" accept="video/mp4,video/x-m4v,video/*" className="up_file_video" onChange={handleVideo}/> 
        </button>
        {
          exportUrlVideo && (
            <video width="400" controls>
              <source src={URL.createObjectURL(exportUrlVideo)}/>
            </video>
          )
        }
      </>
    );
  }
}

export default VideoButton;
