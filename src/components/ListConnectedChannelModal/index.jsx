import React, { Component, lazy } from "react";
import { Button } from "react-bootstrap";
import styles from "./index.module.scss";
import "./index.scss";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import ButtonNormal from "../ButtonNormal";

const ModalComponent = lazy(() => import("../Modal"));

const ListConnectedChannelModal = observer(
  class ListConnectedChannelModal extends React.Component {
    field = null;
    viewModel = null;
    constructor(props) {
      super(props);
      this.state = {
        getArrayConnectChannels: [],
      };
      this.field = this.props.field ? this.props.field : null;
      this.viewModel = this.field ? this.field.viewModel : null;
      console.log("Debuggin -------- ListConnectedChannel ----- View Model");
      console.log(this.viewModel);
    }

    handleSlectChannels = (des, img) => {
      let { getArrayConnectChannels } = this.state;
      document.getElementById(des).classList.toggle("active");

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
      let arrayConnectedChannelsFinal = this.viewModel
        .arrayConnectedChannelsFinal;

      arrayConnectedChannelsFinal.splice(index, 1);
      this.viewModel.arrayConnectedChannelsFinal = arrayConnectedChannelsFinal;
    };

    render() {
      const arrayConnectedChannels = this.viewModel
        ? this.viewModel.connectedChannels
        : "";

      let arrayConnectedChannelsFinal = this.viewModel
        ? this.viewModel.arrayConnectedChannelsFinal
        : "";

      return (
        <>
          <div className="row w-100 d-flex align-items-center mb-3 mt-4">
            <p className="text-black">Connected Channels</p>
            <div className="rounded-2 px-3 py-2 h-100 d-flex align-items-center">
              <div className="row w-100">
                {arrayConnectedChannelsFinal
                  ? arrayConnectedChannelsFinal.map((value, key) => {
                      return (
                        <div
                          key={Math.random(10000, 20000)}
                          className={`item_social ${styles.item_social} col-2 mb-2 cursor-pointer position-relative `}
                        >
                          <a
                            href={void 0}
                            className="cursor-pointer position-absolute end-0 top-0 text-red-1"
                            onClick={(e) =>
                              this.handleDeleteConnectChannel(key)
                            }
                          >
                            <i className={``}>
                              <FontAwesomeIcon icon={faTimes} />
                            </i>
                          </a>
                          <div
                            className={`main_social ${styles.main_social} text-center`}
                          >
                            <p
                              className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}
                            >
                              <img
                                alt={value.des}
                                src={value.images}
                                className="img-avatar"
                              />
                            </p>
                            <p className="text-blue-0 opacity-50 mb-0">
                              {value.des}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          {this.field.addConnectChannlesBtn && (
            <ButtonNormal
              className="btn btn-success mb-3"
              text={this.field.label}
              iconStart={true}
              onClick={this.viewModel.openModal}
            />
          )}

          <ModalComponent
            show={this.viewModel.show}
            onHide={this.viewModel.closeModal}
            header={"Select Channels"}
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
                            onClick={(e) =>
                              this.handleSlectChannels(item.des, item.images)
                            }
                            disabled={isDisabled}
                          >
                            <div
                              className={`main_social ${styles.main_social} text-center`}
                            >
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
                                  <img
                                    alt={item.des}
                                    src={item.images}
                                    className="img-avatar"
                                  />
                                </span>
                              </p>
                              <p className="text-blue-0 opacity-50 mb-0">
                                {item.des}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    : ""}
                </div>
                <a
                  href="/channels"
                  className="text-blue-3 d-flex justify-content-end"
                >
                  Add more
                </a>
              </div>
            }
            footer={
              <Button
                onClick={this.handleSaveConectChannels}
                className="btn btn-success w-100"
              >
                <span>Save</span>
              </Button>
            }
            key={Math.random(40, 200)}
          />
        </>
      );
    }
  }
);

export default ListConnectedChannelModal;
