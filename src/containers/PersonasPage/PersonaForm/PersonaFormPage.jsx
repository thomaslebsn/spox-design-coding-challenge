import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import SimpleReactValidator from "simple-react-validator";
import { Form } from "react-bootstrap";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import {
  GENDER,
  MARITAL_STATUS,
  PERSONA_FIELD_KEY,
} from "../../../constants/PersonaModule";

import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";

import ComponentFormFieldBio from "../FormComponentPersona/ComponentFormFieldBio";
import ComponentFormFieldGCP from "../FormComponentPersona/ComponentFormFieldGCP";
import ComponentFormFieldInformation from "../FormComponentPersona/ComponentFormFieldInformation";
import ComponentFormFieldPersonaName from "../FormComponentPersona/ComponentFormFieldPersonaName";
import ComponentHeaderPage from "../../../components/ComponentHeaderPage";
import PAGE_STATUS from "../../../constants/PageStatus";
import Spinner from "../../../components/Spinner";

import { renderingGroupFieldHandler } from "../../../utils/form";

import { faSave } from "@fortawesome/free-regular-svg-icons/faSave";

const PersonaFormPage = observer(
  class PersonaFormPage extends Component {
    formPropsData = {
      [PERSONA_FIELD_KEY.NAME]: "",
      [PERSONA_FIELD_KEY.TOOLS]: "",
      [PERSONA_FIELD_KEY.TOOLS]: "",
    };

    validator = null;
    viewModel = null;

    constructor(props) {
      console.log("[PersonaFormPage] re initialize");
      super(props);

      const { viewModel } = props;

      this.validator = new SimpleReactValidator();

      this.personaFormViewModel = viewModel
        ? viewModel.getPersonaFormViewModel()
        : null;

      this.personaFormViewModel.setForm(this);
    }

    componentDidMount() {
      const { match } = this.props;

      if (match.params.id) {
        this.personaFormViewModel.getPersona(match.params.id);
      } else {
        this.personaFormViewModel.formStatus = PAGE_STATUS.READY;
      }
    }

    populatingFormDataHandler = (data) => {
      if (!data) return false;

      console.log("populatingFormDataHandler", data);
      this.formPropsData[PERSONA_FIELD_KEY.NAME] = data.getName().value;

      this.formPropsData[PERSONA_FIELD_KEY.AVATAR] = data.getAvatar().value;

      this.formPropsData[PERSONA_FIELD_KEY.DG_NAME] = data.getDgName().value;
      this.formPropsData[PERSONA_FIELD_KEY.TOOLS] = data.getTools().value;
      this.formPropsData[PERSONA_FIELD_KEY.BIO] = data.getBio().value;
      this.formPropsData[PERSONA_FIELD_KEY.GOALS] = data.getGoals().value;
      this.formPropsData[PERSONA_FIELD_KEY.AGE] = data.getAge().value;
      this.formPropsData[PERSONA_FIELD_KEY.GENDER] = data.getGender().value;
      this.formPropsData[PERSONA_FIELD_KEY.LOCATION] = data.getLocation().value;
      this.formPropsData[
        PERSONA_FIELD_KEY.JOB_TITLE
      ] = data.getJobTitle().value;
      this.formPropsData[PERSONA_FIELD_KEY.SECTOR] = data.getSector().value;

      this.formPropsData[
        PERSONA_FIELD_KEY.MARITAL_STATUS
      ] = data.getMaritalStatus().value;

      this.formPropsData[PERSONA_FIELD_KEY.WEBSITE] = data.getWebsite().value;

      this.formPropsData[
        PERSONA_FIELD_KEY.VENDOR_RESEARCH
      ] = data.getVendorResearch().value;

      this.formPropsData[PERSONA_FIELD_KEY.INTEREST] = data.getInterest().value;

      this.formPropsData[
        PERSONA_FIELD_KEY.CHALLENGES
      ] = data.getChallenges().value;

      this.formPropsData[
        PERSONA_FIELD_KEY.PAINT_POINT
      ] = data.getPaintpoint().value;
    };

    isFormValid = () => {
      console.log("isFormValid");
      if (this.validator.allValid()) {
        console.log("[is Form Valid]");
        console.log(this.formPropsData);
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    generateFormSetting = () => {
      console.log("re generate Form Setting");
      return [
        {
          fields: [
            {
              label: "Name",
              key: PERSONA_FIELD_KEY.DG_NAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[PERSONA_FIELD_KEY.DG_NAME],
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData[PERSONA_FIELD_KEY.DG_NAME] =
                  event.target.value;
              },
            },
            {
              label: "Age",
              key: PERSONA_FIELD_KEY.AGE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[PERSONA_FIELD_KEY.AGE],
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData[PERSONA_FIELD_KEY.AGE] = event.target.value;
              },
            },
            {
              label: "Gender",
              key: PERSONA_FIELD_KEY.GENDER,
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[PERSONA_FIELD_KEY.GENDER],
              required: true,
              validation: "required",
              option: GENDER,
              changed: (value) => {
                this.formPropsData[PERSONA_FIELD_KEY.GENDER] = value;
              },
              isMulti: false,
            },
            {
              label: "Location",
              key: PERSONA_FIELD_KEY.LOCATION,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[PERSONA_FIELD_KEY.LOCATION],
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData[PERSONA_FIELD_KEY.LOCATION] =
                  event.target.value;
              },
            },
            {
              label: "Job Title",
              key: PERSONA_FIELD_KEY.JOB_TITLE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[PERSONA_FIELD_KEY.JOB_TITLE],
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData[PERSONA_FIELD_KEY.JOB_TITLE] =
                  event.target.value;
              },
            },
            {
              label: "Sector",
              key: PERSONA_FIELD_KEY.SECTOR,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[PERSONA_FIELD_KEY.SECTOR],
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData[PERSONA_FIELD_KEY.SECTOR] =
                  event.target.value;
              },
            },
            {
              label: "Marital Status",
              key: PERSONA_FIELD_KEY.MARITAL_STATUS,
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[PERSONA_FIELD_KEY.MARITAL_STATUS],
              required: true,
              validation: "required",
              option: MARITAL_STATUS,
              changed: (value) => {
                this.formPropsData[PERSONA_FIELD_KEY.MARITAL_STATUS] = value;
              },
            },
          ],
        },
      ];
    };

    handleSave = () => {
      this.personaFormViewModel.savePersona();
    };

    getFormPropsData = () => this.formPropsData;

    renderingFormHandler = (formSetting) => {
      console.log(this.formPropsData);
      return (
        <Form key={Math.random(40, 200)} className="row">
          <div className="mb-4">
            <ComponentHeaderPage
              title={"Make Persona Overview"}
              textBtn={"Save persona"}
              handleCreate={this.handleSave}
              faIcons={faSave}
            />
          </div>
          <div className="col-4 ">
            <ComponentFormFieldPersonaName
              validator={this.validator}
              formPropsData={this.formPropsData}
            />

            <div className="border-start-5 bg-white p-2 px-3 mb-3 rounded-2">
              <p className="text-blue-0 opacity-75 mb-2 fs-5">Demographic</p>
              <div>
                {Object.keys(formSetting)
                  .map((groupIndex) => {
                    return [...Array(formSetting[groupIndex])].map((group) => {
                      return renderingGroupFieldHandler(group, this.validator);
                    });
                  })
                  .reduce((arr, el) => {
                    return arr.concat(el);
                  }, [])}
              </div>
            </div>
          </div>
          <div className="col-8">
            <ComponentFormFieldBio
              validator={this.validator}
              formPropsData={this.formPropsData}
            />

            <div className="row">
              <div className="col-6">
                <div>
                  <p className="text-blue-0 opacity-75 fs-bold bg-blue-3 p-2">
                    Sources of information
                  </p>
                  <ComponentFormFieldInformation
                    validator={this.validator}
                    formPropsData={this.formPropsData}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <p className="text-blue-0 opacity-75 fs-bold bg-blue-3 p-2">
                    Goals - Challenges - Paint point
                  </p>
                  <div>
                    <ComponentFormFieldGCP
                      validator={this.validator}
                      formPropsData={this.formPropsData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      );
    };

    render() {
      console.log("[PersonaFormPage] rerender.....");

      this.validator.purgeFields();

      let formSetting = this.generateFormSetting();

      const { formStatus } = this.personaFormViewModel;

      return formStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        this.renderingFormHandler(formSetting)
      );
    }
  }
);

export default withPersonaViewModel(PersonaFormPage);
