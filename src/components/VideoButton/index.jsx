import React, { Component, lazy } from 'react';

import Iframe from 'react-iframe';
import { AUTHORIZATION_KEY, AXIOS_CONFIGS, GENERAL_CONFIG } from 'easii-io-web-service-library';
import { io } from 'socket.io-client';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

const ModalComponent = lazy(() => import('../../components/Modal'));

const socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT);

class VideoButton extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.socket = socket;
    this.state = {
      showModal: false
    };

    this.handleClickDamImage = this.handleClickDamImage.bind(this);
  }

  handleClickDamImage = () => {
    console.log(AUTHORIZATION_KEY.TOKEN_USER);
    console.log(AXIOS_CONFIGS.BASE_ENDPOINT_URL + ':9999');
    this.socket.emit('join room', localStorage.getItem(AUTHORIZATION_KEY.TOKEN_USER));

    this.setState({
      showModal: true,
    });

    const _this = this;
    // this._isMounted = true;

    this.socket.on('response assets', (roomId, data) => {
      console.log('datadatadatadataDamAssets')
      console.log(data)
      this.setState(
        {},
        _this.props.changed(data)
      )

      if (data) {
        this.closeModal();
      }
    });
  };

  closeModal = (s) => {
    this.setState({
      showModal: false,
    });
  };

  componentDidMount = () => {
  };

  componentWillUnmount = () => {
  };

  render() {
    const urlDam =
      AXIOS_CONFIGS.BASE_ENDPOINT_URL +
      '/administrator/index.php?option=com_aesir_dam&view=easii_dam&token=' +
      localStorage.getItem(AUTHORIZATION_KEY.TOKEN_USER);

    let { dataVideo, checkTypeVideo } = this.props;

    console.log('exportUrlDamexportUrlDam');
    console.log(dataVideo);
    return (
      <>
        <div className={`lg_btn_dam_assets ${dataVideo ? 'w-50' : ''}`}>
          <button
            className="wr_btn_dam border-0 ms-2 bg-blue-2 rounded-2 px-3"
            onClick={this.handleClickDamImage}
            type="button"
          >
            <i className="text-white">
              <FontAwesomeIcon icon={faVideo} />
            </i>
            <span className="text-white ms-2">Video</span>
          </button>
          {dataVideo && (
            <>
              {
                dataVideo.map((value, key) => {
                  return (
                    <video key={key} width="400" controls className="mt-3">
                      <source src={value.url} type="video/mp4"/>
                    </video>
                  )
                })
              }
            </>
          )}
          {
            checkTypeVideo && (
              <p className="mt-2 text-danger">Supported .mp4 only</p>
            )
          }
        </div>
        <ModalComponent
          header={'Digital Assets'}
          body={
            <Iframe
              url={urlDam}
              width="100%"
              height="100%"
              id="ifram_digital_assets"
              className="myClassname ifram_digital_assets"
              display="initial"
              position="relative"
            />
          }
          show={this.state.showModal}
          onHide={this.closeModal}
          dialogClassName="modal-fullscreen modal_digital_assets "
        />
      </>
    );
  }
}

export default VideoButton;
