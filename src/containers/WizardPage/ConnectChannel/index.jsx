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
import { notify } from "../../../components/Toast";

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

      //get project id from url
      let getIdProject = history.location.pathname.match(/\d/g);
      getIdProject = getIdProject.join("");

      this.state = {
        channels: [],
        showModal: true,
        getIDSFanpage: [],
        isWordpressConnected: false,
        projectId: getIdProject
      };

      //call check connected channels
      this.projectListViewModel.checkConnectedChannels(this.state.projectId, [
        'linkedin',
        'twitter',
        'instagram',
        'facebook',
        'mailchimp',
        'wordpress',
      ]);
    }

    checkConnectedCMS = (cmsName, isConnected) => {
      if (cmsName == "wordpress") {
        this.setState({
          isWordpressConnected: isConnected,
        });

        this.projectListViewModel.wordpressConnected = isConnected
      }
    };

    next = () => {
      const {
        facebookConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        wordpressConnected,
      } = this.projectListViewModel;

      if (
        facebookConnected == true ||
        twitterConnected == true ||
        linkedinConnected == true ||
        mailchimpConnected == true ||
        instagramConnected == true ||
        wordpressConnected == true
      ) {
        history.push(`${history.location.pathname}/content`);
      } else {
        notify("Please choose an connect channel");
      }
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
      this.projectListViewModel.saveChosseFacebookFanpages(
        this.state.projectId,
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
        wordpressConnected,
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
            wordpressConnected={wordpressConnected}
            viewModel={this.viewModel}
            projectId={this.state.projectId}
            checkConnectedCMS={this.checkConnectedCMS}
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
              onClick={(e) => this.next()}
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
