import React, { Component } from 'react';
import { Button, Accordion, Image } from 'react-bootstrap';

import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { CONTENT_FIELD_KEY } from '../../../constants/ContentModule';

import ButtonNormal from '../../../components/ButtonNormal';
import ComponentSwitch from '../../../components/ComponentSwitch';
import ComponentSchedule from '../../../components/ComponentSchedule';
import FormSelectDropdown from '../../../components/Form/FormSelectDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

import SimpleReactValidator from 'simple-react-validator';

import { observer } from 'mobx-react';
import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';
import PAGE_STATUS from '../../../constants/PageStatus';
import Spinner from '../../../components/Spinner';
import ComponentPublishListChannels from '../../../components/ComponentPublishListChannels';
import SocialMedia from './ContentFormWhenPublishThis/SocialMedia';
import ManagementSystem from './ContentFormWhenPublishThis/ManagementSystem';
import EmailMarketing from './ContentFormWhenPublishThis/EmailMarketing';

class ComponentContentFormPublish extends Component {
  formPropsData = {};
  validator = null;
  contentConnectedChannelsViewModel = null;

  constructor(props) {
    super(props);
    this.state = {
      social: true,
      cms: true,
      email: false,
    };

    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;
  }

  post = () => {
    if (this.isFormValid()) {
      this.viewModel.post(this.viewModel.contentEditdata);
    }
  };

  isFormValid = () => {
    console.log('isFormValid');
    console.log(this.formPropsData);
    if (this.validator.allValid()) {
      console.log('[is Form Valid]');

      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  handleDeselectAll = (value, key) => {
    console.log('valuevaluevaluevalueselectall');
    console.log(value);
    console.log(key);
  };

  handleDeselect = (name) => {
    this.handleCheck(name);
  };

  handleItemCheck = (name) => {
    this.handleCheck(name);
  };

  render() {
    let publishContentConnectChannels = this.viewModel.publishContentConnectChannels;
    console.log('[Content - FormPublish] - re-render .........');

    let { formStatus } = this.props;

    return formStatus === PAGE_STATUS.LOADING ? (
      <Spinner />
    ) : (
      <div className="pe-80">
        <h3 className="mb-4">Publish</h3>
        <div className="bg-white p-4">
          <div className="row">
            <div className="col-5 pe-3">
              <div>
                {publishContentConnectChannels &&
                  publishContentConnectChannels.map((value, key) => {
                    return (
                      <div key={key} className="mb-4">
                        <ComponentPublishListChannels
                          value={value}
                          handleDeselectAll={(e) => this.handleDeselectAll(value, key)}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-5 ps-3">
              <h6 className="text-blue mb-0 mb-3">When to publish this?</h6>
              <Accordion defaultActiveKey="0" className="mb-3">
                <div>
                  <Accordion.Toggle
                    as={Button}
                    className="w-100 bg-blue-3 text-body text-start d-flex justify-content-between align-items-center"
                    eventKey="0"
                    onClick={() => this.setState({ social: !this.state.social })}
                  >
                    Social Media
                    <FontAwesomeIcon icon={this.state.social ? faMinus : faPlus} color="#16b979" />
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                  <div className="p-3 border-1">
                    <SocialMedia />
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey="0" className="mb-3">
                <div>
                  <Accordion.Toggle
                    as={Button}
                    className="w-100 bg-blue-3 text-body text-start d-flex justify-content-between align-items-center"
                    eventKey="0"
                    onClick={() => this.setState({ cms: !this.state.cms })}
                  >
                    Content Management System (CMS)
                    <FontAwesomeIcon icon={this.state.cms ? faMinus : faPlus} color="#16b979" />
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                  <div className="p-3 border-1">
                    <ManagementSystem />
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey="0">
                <div>
                  <Accordion.Toggle
                    as={Button}
                    className="w-100 bg-blue-3 text-body text-start d-flex justify-content-between align-items-center"
                    eventKey="0"
                    onClick={() => this.setState({ email: !this.state.email })}
                  >
                    Email Marketing
                    <FontAwesomeIcon icon={this.state.email ? faMinus : faPlus} color="#16b979" />
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                  <div className="p-3 border-1">
                    <EmailMarketing />
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </div>
          </div>
          <div className="d-flex justify-content-between border-top-1 pt-3">
            <Button className="btn btn-light border-success" onClick={this.props.previousStep}>
              Back
            </Button>
            {/* <div className="w-180">
                <FormSelectDropdown field={fieldApproval} />
              </div> */}
            <ButtonNormal
              className="btn btn-success"
              text="Post"
              onClick={this.post}
            ></ButtonNormal>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentContentFormPublish;
