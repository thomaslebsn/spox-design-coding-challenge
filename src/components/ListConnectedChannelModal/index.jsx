import React, { Component, lazy } from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.module.scss';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const ModalComponent = lazy(() => import('../Modal'));

class ListConnectedChannelModal extends React.Component {
  field = null;
  viewModel = null;
  constructor(props) {
    super(props);
    this.state = {
      getArrayConnectChannels: [],
    };

    this.viewModel = this.props.viewModel ? this.props.viewModel : null;
    console.log('Debuggin -------- ListConnectedChannel ----- View Model');
    console.log(this.viewModel);
  }

  handleSlectChannels = (des, img) => {
    let { getArrayConnectChannels } = this.state;
    document.getElementById(des).classList.toggle('active');

    let getObjectAConnectChannel = {
      des: des,
      images: img,
    };

    getArrayConnectChannels.push(getObjectAConnectChannel);
  };

  handleSaveConectChannels = () => {
    let { getArrayConnectChannels } = this.state;
    let arrayConnectedChannelsFinal = this.viewModel
      ? this.viewModel.arrayConnectedChannelsFinal
      : null;

    let newArrayConnectedChannelsFinal = [
      ...arrayConnectedChannelsFinal,
      ...getArrayConnectChannels,
    ];

    newArrayConnectedChannelsFinal = Object.values(
      newArrayConnectedChannelsFinal.reduce(
        (acc, cur) => Object.assign(acc, { [cur.des]: cur }),
        {}
      )
    );

    this.viewModel.arrayConnectedChannelsFinal = newArrayConnectedChannelsFinal;

    this.viewModel.closeModal();
  };

  handleDeleteConnectChannel = (index) => {
    this.viewModel.handleDeleteConnectChannel(index);
  };

  handleShowModalChannels = () => {
    this.viewModel.openModal();
  };

  render() {
    const arrayConnectedChannels = this.viewModel ? this.viewModel.connectedChannels : '';

    let arrayConnectedChannelsFinal = this.props.arrayConnectedChannelsFinal
      ? this.props.arrayConnectedChannelsFinal
      : '';

    console.log('arrayConnectedChannelsFinalrender123');
    console.log(arrayConnectedChannelsFinal);

    return (
      <>
        <div className="row w-100 d-flex align-items-center mb-3 mt-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="text-black mb-0">Connected Channels</p>
            <a
              href={void 0}
              className="cursor-pointer text-green"
              onClick={this.handleShowModalChannels}
            >
              <i className={`me-2`}>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              Add Channels
            </a>
          </div>
          <div className="rounded-2 px-3 py-4 h-100 d-flex align-items-center bg-blue-3">
            <div className="row w-100">
              {arrayConnectedChannelsFinal
                ? arrayConnectedChannelsFinal.map((value, key) => {
                    return (
                      <div
                        key={Math.random(10000, 20000)}
                        className={`item_social ${styles.item_social} col-3 mb-4 cursor-pointer position-relative `}
                      >
                        <a
                          href={void 0}
                          className="cursor-pointer position-absolute end-0 top-0 text-red-1"
                          onClick={(e) => this.handleDeleteConnectChannel(key)}
                        >
                          <i className={``}>
                            <FontAwesomeIcon icon={faTimes} />
                          </i>
                        </a>
                        <div className={`main_social ${styles.main_social} text-center`}>
                          <p
                            className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}
                          >
                            <img alt={value.des} src={value.images} className="img-avatar" />
                          </p>
                          <p className="text-blue-0 opacity-75 mb-0">{value.des}</p>
                        </div>
                      </div>
                    );
                  })
                : ''}
            </div>
          </div>
        </div>

        <ModalComponent
          show={this.props.showModalChannels}
          onHide={this.viewModel.closeModal}
          header={'Select Channels'}
          body={
            <div className="bg-white rounded-2 px-3 py-2 h-100 ">
              <div className="row w-100 d-flex align-items-center mb-3">
                {arrayConnectedChannels
                  ? arrayConnectedChannels.map((item, key) => {
                      let isDisabled = arrayConnectedChannelsFinal.some(
                        (value) => item.des == value.des
                      );

                      return (
                        <button
                          key={Math.random(10000, 20000)}
                          className={`item_social_modal item_social ${styles.item_social} col-3 mb-2 cursor-pointer ${isDisabled}`}
                          onClick={(e) => this.handleSlectChannels(item.des, item.images)}
                          disabled={isDisabled}
                        >
                          <div className={`main_social ${styles.main_social} text-center`}>
                            <p
                              className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}
                            >
                              <span
                                id={item.des}
                                className={`position-relative pe-2 wr_checked_channels`}
                              >
                                <i
                                  className={`icon_check position-absolute end-0 bottom-0 text-green`}
                                >
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                </i>
                                <img alt={item.des} src={item.images} className="img-avatar" />
                              </span>
                            </p>
                            <p className="text-blue-0 opacity-50 mb-0">{item.des}</p>
                          </div>
                        </button>
                      );
                    })
                  : ''}
              </div>
              <a href="/channels" className="text-blue-3 d-flex justify-content-end">
                Add more
              </a>
            </div>
          }
          footer={
            <Button onClick={this.handleSaveConectChannels} className="btn btn-success w-100">
              <span>Save</span>
            </Button>
          }
          key={Math.random(40, 200)}
        />
      </>
    );
  }
}

export default ListConnectedChannelModal;
