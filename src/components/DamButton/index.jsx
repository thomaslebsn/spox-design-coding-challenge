import React, { Component, lazy, createRef } from 'react';

import Iframe from 'react-iframe';
import { AUTHORIZATION_KEY, AXIOS_CONFIGS, GENERAL_CONFIG } from 'easii-io-web-service-library';
import { io } from 'socket.io-client';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

const ModalComponent = lazy(() => import('../../components/Modal'));

const socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
  autoConnect: false,
});

class DamButton extends React.Component {
  modalSelectionDAMSession = null;
  roomID = null;
  constructor(props) {
    super(props);
    this.socket = socket;
    this.state = {
      showModal: false,
    };
    this.onWebSocketCallbackSuccess.bind(this);
  }

  onWebSocketCallbackSuccess = (roomId, data) => {
    console.log('WS - Event - response assets');
    console.log('room id', roomId);
    console.log('Data');
    console.log(data);

    if (roomId === this.roomID && data) {
      
      this.closeModal();
      this.socket.disconnect();
      this.socket.close();
      
      this.props.changed(data);
    }
  }

  handleClick = () => {
    this.modalSelectionDAMSession = Math.floor(Date.now() / 1000);
    console.log('modalSelectionDAMSession', this.modalSelectionDAMSession);

    this.roomID = 'DAM_BTN_WS_CLIENT_'.concat(this.modalSelectionDAMSession);
    console.log('RoomID', this.roomID);
    // WS Client gets started a CONNETION
    this.socket.connect();
    
    // Send server a signal to join room by a predefined {roomID}
    this.socket.emit('join room', this.roomID);

    // WS Client listens on event of "response assets"
    this.socket.on('response assets', this.onWebSocketCallbackSuccess);

    this.setState({
      showModal: true,
    });
  };

  closeModal = (s) => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const urlDam = AXIOS_CONFIGS.BASE_ENDPOINT_URL.concat(
      '/administrator/index.php?option=com_aesir_dam&view=easii_dam'
    )
      .concat('&token=')
      .concat(localStorage.getItem(AUTHORIZATION_KEY.TOKEN_USER))
      .concat('&modalSelectionDAMSession=')
      .concat(this.modalSelectionDAMSession);

    let { data, checkTypeImage} = this.props;

    return (
      <>
        <div className={`lg_btn_dam_assets ${data ? 'w-50' : ''}`}>
          <button
            className="wr_btn_dam border-0 ms-2 bg-blue-2 rounded-2 px-3"
            onClick={this.handleClick}
            type="button"
          >
            <i className="text-white">
              <FontAwesomeIcon icon={faImage} />
            </i>
            <span className="text-white ms-2">Digital Asset Management</span>
          </button>
          {data && (
            <>
              {data.map((value, key) => {
                return (
                  <div
                    key={key}
                    className={`item_dam_assets d-flex justify-content-start border-top mt-4`}
                  >
                    <div className="wr_img_thumbnail_dam position-relative m-2">
                      <img
                        className={`img-thumbnail rounded imgTab`}
                        alt={value.url}
                        src={value.url}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {checkTypeImage && <p className="mt-2 text-danger">Supported .jpg/png/jpeg only</p>}
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

export default DamButton;
