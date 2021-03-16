import React, { Component } from "react";

import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";
import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from "../../../constants/ContentModule";
import { ESI_CONTENT_THEME_FIELD_KEY } from "../../../constants/ContentThemeModule";

import ButtonNormal from "../../../components/ButtonNormal";

import SimpleReactValidator from "simple-react-validator";

import {
  CampaignSelectionPage,
  campaignSelectionViewModal,
} from "./CampaignSelectionPage";

import { renderingGroupFieldHandler } from "../../../utils/form";
import PAGE_STATUS from "../../../constants/PageStatus";

import { Form } from "react-bootstrap";

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
  contentConnectedChannelsByProjectViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;
  selectedProjectIdFromWizardStep1 = null;
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();
    // if this component is MOUNTED from Content Module => viewModel is ContentViewModel
    // Otherwise, viewModel is WizardViewModel
    this.viewModel = this.props.viewModel;
    this.selectedProjectIdFromWizardStep1 = this.props
      .selectedProjectIdFromWizardStep1
      ? this.props.selectedProjectIdFromWizardStep1
      : null;

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

    this.contentConnectedChannelsByProjectViewModel = this.viewModel.getContentConnectedChannelsViewModel();
    this.contentDisplayProjectNameInWizardStep3ViewModel = this.viewModel.getContentDisplayProjectNameInWizardStep3ViewModel();
    this.viewModel.setForm(this);
  }

  componentWillUnmount() {
    this.personaTableSelectionModalViewModel.resetObservableProperties();
    this.campaignTableSelectionModalViewModel.resetObservableProperties();
    this.contentConnectedChannelsByProjectViewModel.resetObservableProperties();
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
    if (this.selectedProjectIdFromWizardStep1) {
      console.log("this.contentDisplayProjectNameInWizardStep3ViewModel");
      console.log(this.contentDisplayProjectNameInWizardStep3ViewModel);
      this.contentDisplayProjectNameInWizardStep3ViewModel.renderProjectNameByProjectId(
        this.selectedProjectIdFromWizardStep1
      );
      this.contentConnectedChannelsByProjectViewModel.renderChannelByProjectId(
        this.selectedProjectIdFromWizardStep1
      );
      this.formPropsData[
        CONTENT_FIELD_KEY.PROJECT
      ] = this.selectedProjectIdFromWizardStep1;
    }
  };

  handleLoadingConnectedChannelsBySelectedProjectId = (projectId) => {
    this.contentConnectedChannelsByProjectViewModel.renderChannelByProjectId(
      projectId
    );
  };

  generateFormSetting = () => {
    console.log("re generate Form Setting", this.formPropsData);

    const projectField = this.selectedProjectIdFromWizardStep1
      ? {
          label: "Project Name",
          key: CONTENT_FIELD_KEY.PROJECT,
          type: FORM_FIELD_TYPE.INFORMATION,
          viewModel: this.contentDisplayProjectNameInWizardStep3ViewModel,
        }
      : {
          label: "Choose the Project",
          key: CONTENT_FIELD_KEY.PROJECT,
          type: FORM_FIELD_TYPE.SELECTION,
          value: this.formPropsData[CONTENT_FIELD_KEY.PROJECT],
          required: true,
          validation: "required",
          viewModel: this.projectTableSelectionModalViewModel,
          changed: () => {
            const projectId = this.projectTableSelectionModalViewModel.getSelectedIDs();
            if (projectId) {
              this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = projectId;
              console.log("Debugging - connectedChannelsByProjectId");
              console.log(projectId);
              this.handleLoadingConnectedChannelsBySelectedProjectId(projectId);
            }
          },
          clicked: () => {
            this.projectTableSelectionModalViewModel.openModal();
          },
        };
    return [
      {
        fields: [
          projectField,
          {
            label: "Choose the Campaign",
            key: CONTENT_FIELD_KEY.CAMPAIGN,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN],
            required: true,
            validation: "required",
            viewModel: this.campaignTableSelectionModalViewModel,
            changed: () => {
              const campaignId = this.campaignTableSelectionModalViewModel.getSelectedIDs();
              if (campaignId) {
                this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = campaignId;
              }
            },
            clicked: () => {
              this.campaignTableSelectionModalViewModel.openModal();
            },
          },
          {
            label: "Choose the Persona",
            key: CONTENT_FIELD_KEY.PERSONA,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.PERSONA],
            required: true,
            validation: "required",
            viewModel: this.personaTableSelectionModalViewModel,
            changed: () => {
              const personaIds = this.personaTableSelectionModalViewModel.getSelectedIDs();
              if (personaIds) {
                this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = personaIds;
              }
            },
            clicked: () => {
              console.log("clicked =====");
              console.log(this.personaTableSelectionModalViewModel);
              this.personaTableSelectionModalViewModel.openModal();
            },
            multi: true,
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
          {
            label: "Connected Channels",
            key: CONTENT_FIELD_KEY.CHANNELS,
            type: FORM_FIELD_TYPE.LABELCARD,
            viewModel: this.contentConnectedChannelsByProjectViewModel,
            value: "",
          },
          {
            label: "Content",
            key: CONTENT_FIELD_KEY.THEME,
            type: FORM_FIELD_TYPE.CANVA,
            value: {
              exportedUrl: this.formPropsData[
                CONTENT_FIELD_KEY.CANVA_EXPORTED_URL
              ],
              designId: this.formPropsData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID],
            },
            // required: true,
            // validation: "required",
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

        <CampaignSelectionPage />
      </>
    );
  }
}

export default ComponentContentFormGeneral;
