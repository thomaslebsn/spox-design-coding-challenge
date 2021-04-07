import React, { Component } from "react";

import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";
import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from "../../../constants/ContentModule";
import { ESI_CONTENT_THEME_FIELD_KEY } from "../../../constants/ContentThemeModule";

import ButtonNormal from "../../../components/ButtonNormal";

import SimpleReactValidator from "simple-react-validator";

import { renderingGroupFieldHandler } from "../../../utils/form";
import PAGE_STATUS from "../../../constants/PageStatus";

import { Form } from "react-bootstrap";
import ListConnectedChannelModal from "../../../components/ListConnectedChannelModal";

class ComponentContentFormGeneral extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.NAME]: "",
    [CONTENT_FIELD_KEY.PROJECT]: "",
    [CONTENT_FIELD_KEY.CAMPAIGN]: "",
    [CONTENT_FIELD_KEY.PERSONA]: "",
    [CONTENT_FIELD_KEY.DESCRIPTION]: "",
    [CONTENT_FIELD_KEY.CANVA_DESIGN_ID]: "",
    [CONTENT_FIELD_KEY.CANVA_EXPORTED_URL]: "",
  };
  validator = null;
  isEditMode = false;
  viewModel = null;
  projectTableSelectionModalViewModel = null;
  personaTableSelectionModalViewModel = null;
  campaignTableSelectionModalViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;
  // selectedOrganizationIDFromWizardStep1 = null;
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();
    // if this component is MOUNTED from Content Module => viewModel is ContentViewModel
    // Otherwise, viewModel is WizardViewModel
    this.viewModel = this.props.viewModel;
    // this.selectedOrganizationIDFromWizardStep1 = this.props
    //   .selectedOrganizationIDFromWizardStep1
    //   ? this.props.selectedOrganizationIDFromWizardStep1
    //   : null;

    console.log("ComponentContentFormGeneral - Debug viewModel");
    console.log(this.viewModel);

    this.projectTableSelectionModalViewModel = this.props
      .projectTableSelectionModalViewModel
      ? this.props.projectTableSelectionModalViewModel
      : null;

    this.personaTableSelectionModalViewModel = this.props
      .personaTableSelectionModalViewModel
      ? this.props.personaTableSelectionModalViewModel
      : null;

    this.campaignTableSelectionModalViewModel = this.props
      .campaignTableSelectionModalViewModel
      ? this.props.campaignTableSelectionModalViewModel
      : null;

    console.log(
      "ComponentContentFormGeneral - this.campaignTableSelectionModalViewModel"
    );
    console.log(this.campaignTableSelectionModalViewModel);

    this.contentConnectedChannelsByOrganisationViewModel = this.viewModel.getContentConnectedChannelsViewModel();
    this.contentDisplayProjectNameInWizardStep3ViewModel = this.viewModel.getContentDisplayProjectNameInWizardStep3ViewModel();
    this.viewModel.setForm(this);

    console.log("this.contentConnectedChannelsByOrganisationViewModel 1111");
    console.log(this.contentConnectedChannelsByOrganisationViewModel);
  }

  componentWillUnmount() {
    this.personaTableSelectionModalViewModel.resetObservableProperties();
    this.campaignTableSelectionModalViewModel.resetObservableProperties();
    this.contentConnectedChannelsByOrganisationViewModel.resetObservableProperties();
    this.contentDisplayProjectNameInWizardStep3ViewModel.resetObservableProperties();
  }

  componentDidMount = () => {
    const { match } = this.props;
    console.log("Debugging - Match Params");
    console.log(match);
    if (match) {
      if (match.params.id) {
        this.viewModel.getContent(match.params.id);
      } else {
        this.viewModel.formStatus = PAGE_STATUS.READY;
      }
    }
    // if (this.selectedOrganizationIDFromWizardStep1) {
    //   this.contentConnectedChannelsByOrganisationViewModel.renderChannelByOrganizationID();
    //   this.formPropsData[
    //     CONTENT_FIELD_KEY.PROJECT
    //   ] = this.selectedOrganizationIDFromWizardStep1;
    // }

    this.contentConnectedChannelsByOrganisationViewModel.renderChannelByOrganizationID();
  };

  generateFormSetting = () => {
    console.log("re generate Form Setting", this.formPropsData);

    const connectChannelsField = this.props.connectChannelsField
      ? {
          label: "Connected Channels",
          key: CONTENT_FIELD_KEY.CHANNELS,
          type: FORM_FIELD_TYPE.LABELCARD,
          viewModel: this.contentConnectedChannelsByOrganisationViewModel,
          value: "",
        }
      : "";
    // {
    //     label: "Add Channels",
    //     key: CONTENT_FIELD_KEY.CHANNELS,
    //     type: FORM_FIELD_TYPE.LABELBTN,
    //     viewModel: this.contentConnectedChannelsByOrganisationViewModel,
    //     value: "",
    //     clicked: () => {
    //       this.contentConnectedChannelsByOrganisationViewModel.openModal();
    //     },
    //   };

    console.log("===============");
    let valueCanva = "";

    if (
      this.formPropsData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL] !== "" &&
      this.formPropsData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID] !== ""
    ) {
      valueCanva = {
        exportedUrl: this.formPropsData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL],
        designId: this.formPropsData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID],
      };
    }
    console.log(valueCanva);
    return [
      {
        fields: [
          {
            label: "Choose the Project",
            key: CONTENT_FIELD_KEY.PROJECT,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.PROJECT],
            viewModel: this.projectTableSelectionModalViewModel,
            changed: () => {
              // const projectId = this.projectTableSelectionModalViewModel.getSelectedIDs();
              // if (projectId) {
              //   this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = projectId;
              // }
            },
            clicked: () => {
              // this.projectTableSelectionModalViewModel.openModal();
            },
          },
          {
            label: "Choose the Campaign",
            key: CONTENT_FIELD_KEY.CAMPAIGN,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN],
            viewModel: this.campaignTableSelectionModalViewModel,
            changed: () => {
              // const campaignId = this.campaignTableSelectionModalViewModel.getSelectedIDs();
              // if (campaignId) {
              //   this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = campaignId;
              // }
            },
            clicked: () => {
              // this.campaignTableSelectionModalViewModel.openModal();
            },
          },
          {
            label: "Choose the Persona",
            key: CONTENT_FIELD_KEY.PERSONA,
            // type: FORM_FIELD_TYPE.SELECTION,
            type: FORM_FIELD_TYPE.SELECTIONPERSONA,
            //value: this.formPropsData[CONTENT_FIELD_KEY.PERSONA],
            viewModel: this.personaTableSelectionModalViewModel,
            changed: () => {
              // const personaIds = this.personaTableSelectionModalViewModel.getSelectedIDs();
              // if (personaIds) {
              //   this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = personaIds;
              // }
              console.log("aaaaaaaaaaaaaaaaaa");
            },
            clicked: () => {
              // console.log("clicked =====");
              // console.log(this.personaTableSelectionModalViewModel);
              // this.personaTableSelectionModalViewModel.openModal();
            },
            multi: true,
            handleOnChange: (value) => {
              console.log("value 11111111111111");
              console.log(value);
              this.contentConnectedChannelsByOrganisationViewModel.renderConnectedChannelByPersonaIds(
                "1697"
              );
            },
          },
          {
            label: "Headline",
            key: CONTENT_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CONTENT_FIELD_KEY.NAME],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[CONTENT_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: this.blurringFieldHandler,
          },
          connectChannelsField,
          {
            label: "Content",
            key: CONTENT_FIELD_KEY.THEME,
            type: FORM_FIELD_TYPE.CANVA,
            required: true,
            validation: "required",
            value: valueCanva,
            changed: ({ exportUrl, designId }) => {
              console.log("[Canva Field] changed", { exportUrl, designId });
              this.formPropsData[
                CONTENT_FIELD_KEY.CANVA_EXPORTED_URL
              ] = exportUrl;
              this.formPropsData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID] = designId;
            },
            blurred: this.blurringFieldHandler,
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    console.log("populatingFormDataHandler", data);
    if (!data) return false;
    this.formPropsData[CONTENT_FIELD_KEY.ID] = data.id ?? 0;
    this.formPropsData[CONTENT_FIELD_KEY.NAME] = data.getName().value;
    this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = [
      { value: 366, label: "Et et aut incidunt labore." },
    ];

    this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = [
      { value: 7, label: "Persona 10" },
    ];

    this.formPropsData[
      CONTENT_FIELD_KEY.DESCRIPTION
    ] = data.getDescription().value.props.children;

    this.blurringFieldHandler();
  };

  next = () => {
    if (this.isFormValid()) {
      this.props.nextStep();
      this.viewModel.contentEditdata = this.formPropsData;
    }
  };

  blurringFieldHandler = () => {
    console.log("blurringFieldHandler");
    this.isFormValid();
  };

  isFormValid = () => {
    console.log("isFormValid");
    console.log(this.formPropsData);
    if (this.validator.allValid()) {
      console.log("[is Form Valid]");

      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  render() {
    console.log("[Content - FormGeneral] - re-render .........");

    const formSetting = this.generateFormSetting();

    // const { formStatus } = this.personaFormViewModel;

    return (
      <>
        <div className="col-6">
          <h3 className="mb-4">General</h3>
          <div className="bg-white p-4">
            <Form key={Math.random(40, 200)}>
              {Object.keys(formSetting)
                .map((groupIndex) => {
                  return [...Array(formSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, this.validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
              {!this.props.connectChannelsField && (
                <ListConnectedChannelModal
                  field={this.contentConnectedChannelsByOrganisationViewModel}
                  getValueSelected={this.personaTableSelectionModalViewModel}
                />
              )}
            </Form>
            <div className="d-flex justify-content-end">
              <ButtonNormal
                className="btn btn-success"
                text="Next"
                onClick={this.next}
              ></ButtonNormal>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ComponentContentFormGeneral;
