import React, { Component } from "react";

import { Image, Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { observer } from "mobx-react";

import Button from "../../../components/Button";
import ModalComponent from "../../../components/Modal";
import history from "../../../routes/history";

import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import ButtonNormal from "../../../components/ButtonNormal";
import ComponentConnectaChannel from "../../../components/ComponentConnectaChannel";
import { withWizardViewModel } from "../WizardViewModels/WizardViewModelContextProvider";
import Checkbox from "../../../components/Checkbox";
import ComponentItemFanpage from "../../../components/ComponentItemFanpage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import WizardSteps from "../../../components/WizardSteps";
import styles from "./index.module.scss";

const ConnectChannel = observer(
  class ConnectChannel extends Component {
    projectListViewModel = null;
    viewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ProjectList - Debug View Model 2222");
      console.log(viewModel);
      this.projectListViewModel = viewModel
        ? viewModel.getProjectListViewModel()
        : null;

      this.viewModel = viewModel;

      console.log("After binding class 22222");
      console.log(this.projectListViewModel);

      this.state = {
        channels: [
          {
            id: 1,
            name: "social",
            title: "Social Media",
            items: [
              { name: "Facebook", image: "/assets/images/icon-pepsi.png" },
              { name: "Twitter", image: "/assets/images/icon-nikon.png" },
            ],
          },
          {
            id: 2,
            name: "advertising",
            title: "Advertising",
            items: [
              {
                name: "Advertising 1",
                image: "/assets/images/icon-adidas.png",
              },
              { name: "Advertising 2", image: "/assets/images/icon-nikon.png" },
            ],
          },
        ],
        showModal: true,
        getIDSFanpage: [],
      };
    }

    next = () => {
      history.push(`${history.location.pathname}/content`);
    };

    handleCloseModal = () => {
      this.setState({
        showModal: false,
      });
    };

    handleCheckbox = (id) => {
      let getIDSFanpage = this.state.getIDSFanpage;
      getIDSFanpage.push(id);

      this.setState({
        getIDFanpage: getIDSFanpage,
      });
    };

    handleSaveFanpage = () => {
      let getIdProject = history.location.pathname.match(/\d/g);
      getIdProject = getIdProject.join("");
      this.projectListViewModel.saveChosseFacebookFanpages(
        getIdProject,
        this.state.getIDSFanpage
      );

      this.setState({
        showModal: false,
      });
    };

    render() {
      let { showModal } = this.state;

      const {
        listFaceBookFanpage,
        listFaceBookFanpageView,
        facebookConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
      } = this.projectListViewModel;

      return (
        <div className="d-flex flex-column m-4 p-4">
          <ComponentConnectaChannel
            projectListViewModel={this.projectListViewModel}
            listFaceBookFanpageView={
              listFaceBookFanpageView ? listFaceBookFanpageView : null
            }
            facebookConnected={facebookConnected}
            twitterConnected={twitterConnected}
            linkedinConnected={linkedinConnected}
            mailchimpConnected={mailchimpConnected}
            instagramConnected={instagramConnected}
            viewModel={this.viewModel}
          />
          <div className="d-flex justify-content-between">
            <Button
              className="btn btn-light border-success"
              onClick={() => this.props.goToStep(1)}
              text="Back"
            />

            <ButtonNormal
              className="btn btn-success"
              text="Next"
              onClick={this.next}
            ></ButtonNormal>
          </div>
          {listFaceBookFanpage && (
            <ModalComponent
              header={"Facebook Fanpage"}
              body={
                <div>
                  <ul className="list-unstyled align-items-center">
                    {listFaceBookFanpage &&
                      listFaceBookFanpage.map((value, key) => {
                        return (
                          <ComponentItemFanpage
                            key={key}
                            name={value.name}
                            handleCheckbox={(e) => {
                              this.handleCheckbox(value.id);
                            }}
                          />
                        );
                      })}
                  </ul>
                </div>
              }
              show={showModal}
              onHide={this.handleCloseModal}
              footer={
                <button
                  onClick={this.handleSaveFanpage}
                  className="btn btn-success w-100"
                >
                  <span>Save</span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </button>
              }
            />
          )}
        </div>
      );
    }
  }
);

export default withWizardViewModel(ConnectChannel);
