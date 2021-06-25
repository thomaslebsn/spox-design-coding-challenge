import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from '../../../constants/ContentModule';
import { ESI_CONTENT_THEME_FIELD_KEY } from '../../../constants/ContentThemeModule';

import ButtonNormal from '../../../components/ButtonNormal';

import SimpleReactValidator from 'simple-react-validator';

import { renderingGroupFieldHandler } from '../../../utils/form';
import PAGE_STATUS from '../../../constants/PageStatus';

import { Form } from 'react-bootstrap';
import ListConnectedChannelModal from '../../../components/ListConnectedChannelModal';

class ComponentContentFormGeneral extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.NAME]: '',
    [CONTENT_FIELD_KEY.PROJECT]: '',
    [CONTENT_FIELD_KEY.CAMPAIGN]: '',
    [CONTENT_FIELD_KEY.PERSONA]: '',
    [CONTENT_FIELD_KEY.DESCRIPTION]: null,
    [CONTENT_FIELD_KEY.CANVA_DESIGN_ID]: '',
    [CONTENT_FIELD_KEY.CANVA_EXPORTED_URL]: '',
    [CONTENT_FIELD_KEY.DAM]: '',
  };
  validator = null;
  isEditMode = false;
  viewModel = null;
  projectTableSelectionModalViewModel = null;
  personaTableSelectionModalViewModel = null;
  campaignTableSelectionModalViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      validators: {
        desc: {
          message: 'The :attribute must be a valid.',
          rule: (val) => {
            let isEmpty = (o) =>
              o.constructor.name === 'Object'
                ? Object.keys(o).reduce((y, z) => y && isEmpty(o[z]), true)
                : o.length === 0;

            return !isEmpty(val);
          },
        },
      },
    });
    this.viewModel = this.props.viewModel;

    console.log('ComponentContentFormGeneral - Debug viewModel');
    console.log(this.viewModel);

    this.projectTableSelectionModalViewModel = this.props.projectTableSelectionModalViewModel
      ? this.props.projectTableSelectionModalViewModel
      : null;

    this.personaTableSelectionModalViewModel = this.props.personaTableSelectionModalViewModel
      ? this.props.personaTableSelectionModalViewModel
      : null;

    this.campaignTableSelectionModalViewModel = this.props.campaignTableSelectionModalViewModel
      ? this.props.campaignTableSelectionModalViewModel
      : null;

    console.log('ComponentContentFormGeneral - this.campaignTableSelectionModalViewModel');
    console.log(this.campaignTableSelectionModalViewModel);

    this.contentConnectedChannelsByOrganisationViewModel = this.props
      .contentConnectedChannelsByOrganisationViewModel
      ? this.props.contentConnectedChannelsByOrganisationViewModel
      : null;
    this.contentDisplayProjectNameInWizardStep3ViewModel = this.props.contentDisplayProjectNameInWizardStep3ViewModel;

    this.viewModel.setForm(this);
  }

  componentWillUnmount() {
    this.personaTableSelectionModalViewModel.resetObservableProperties();
    this.campaignTableSelectionModalViewModel.resetObservableProperties();
    this.contentConnectedChannelsByOrganisationViewModel.resetObservableProperties();
    this.contentDisplayProjectNameInWizardStep3ViewModel.resetObservableProperties();
  }

  componentDidMount = () => {
    this.contentConnectedChannelsByOrganisationViewModel.renderChannelByOrganizationID();
    Object.values(this.props.dataContentDescriptionSingle.list_channels)[0].description = "";

    
    if(!this.contentConnectedChannelsByOrganisationViewModel.isBackSaveData) {
      this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode = false;
      
      let getListChannels = this.props.dataContentDescriptionSocial.list_channels;

      Object.values(getListChannels.social).map((value) => {
        return (
          value.description = "",
          value.assets.canvaAssets = [],
          value.assets.damAssets = []
        )
      })

      Object.values(getListChannels.cms).map((value) => {
        return (
          value.description = "",
          value.assets.canvaAssets = [],
          value.assets.damAssets = []
        )
      })

      Object.values(getListChannels.mail).map((value) => {
        return (
          value.description = "",
          value.assets.canvaAssets = [],
          value.assets.damAssets = []
        )
      })

      getListChannels.social.youtube.assets.videoAssets = []
    
      Object.values(this.props.dataContentDescriptionSingle.list_channels).map((value) => {
        return (
          value.assets.canvaAssets = [],
          value.assets.damAssets = []
        )
      })
      this.props.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets = []
     
    }
  };

  generateFormSetting = () => {
    console.log('re generate Form Setting', this.formPropsData);

    return [
      {
        fields: [
          {
            label: 'Choose the Project',
            key: CONTENT_FIELD_KEY.PROJECT,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.PROJECT],
            viewModel: this.projectTableSelectionModalViewModel,
            getDataSelectOptions: this.props.getDataSelectOptionsProject,
            getValueSelected: this.props.getValueSelectedProject,
            changed: () => {
              // const projectId = this.projectTableSelectionModalViewModel.getSelectedIDs();
              // if (projectId) {
              //   this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = projectId;
              // }
            },
            clicked: () => {
              // this.projectTableSelectionModalViewModel.openModal();
            },
            handleChange: (value) => {
              this.projectTableSelectionModalViewModel.getValueSelected = value;
            },
          },
          {
            label: 'Choose the Campaign',
            key: CONTENT_FIELD_KEY.CAMPAIGN,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN],
            viewModel: this.campaignTableSelectionModalViewModel,
            getDataSelectOptions: this.props.getDataSelectOptionsCampaign,
            getValueSelected: this.props.getValueSelectedCampaign,
            changed: () => {
              // const campaignId = this.campaignTableSelectionModalViewModel.getSelectedIDs();
              // if (campaignId) {
              //   this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = campaignId;
              // }
            },
            clicked: () => {
              // this.campaignTableSelectionModalViewModel.openModal();
            },
            handleChange: (value) => {
              this.campaignTableSelectionModalViewModel.getValueSelected = value;
            },
          },
          {
            label: 'Choose the Persona',
            key: CONTENT_FIELD_KEY.PERSONA,
            type: FORM_FIELD_TYPE.SELECTIONPERSONA,
            value: this.formPropsData[CONTENT_FIELD_KEY.PERSONA],
            viewModel: this.personaTableSelectionModalViewModel,
            getDataSelectOptions: this.props.getDataSelectOptionsPersona,
            getValueSelected: this.props.getValueSelectedPersona,
            changed: () => {
              // const personaIds = this.personaTableSelectionModalViewModel.getSelectedIDs();
              // if (personaIds) {
              //   this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = personaIds;
              // }
            },
            clicked: () => {
              // console.log("clicked =====");
              // console.log(this.personaTableSelectionModalViewModel);
              // this.personaTableSelectionModalViewModel.openModal();
            },
            multi: true,
            handleOnChange: (value) => {
              this.personaTableSelectionModalViewModel.getValueSelected = value;
              this.contentConnectedChannelsByOrganisationViewModel.getDataValueSelected = value;
              let personaIds = this.contentConnectedChannelsByOrganisationViewModel.getSelectedIDs();

              if (personaIds) {
                this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = personaIds;
              }

              let newPersonaIds = personaIds ? personaIds.join(',') : null;

              this.contentConnectedChannelsByOrganisationViewModel.renderConnectedChannelByPersonaIds(
                newPersonaIds
              );
            },
          },
          {
            label: 'Headline',
            key: CONTENT_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CONTENT_FIELD_KEY.NAME],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[CONTENT_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: this.blurringFieldHandler,
          },
        ],
      },
    ];
  };

  generateFormSettingDescription = () => {
    let valueCanva = '';

    if (
      this.formPropsData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL] !== '' &&
      this.formPropsData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID] !== ''
    ) {
      valueCanva = {
        exportedUrl: this.formPropsData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL],
        designId: this.formPropsData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID],
      };
    }

    return [
      {
        fields: [
          {
            label: 'Content Description',
            key: 'Description',
            type: FORM_FIELD_TYPE.DESCRIPTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION],
            required: true,
            validation: 'required|desc',
            viewModel: this.contentConnectedChannelsByOrganisationViewModel,
            dataContentDescriptionSingle: this.props.dataContentDescriptionSingle,
            dataContentDescriptionSocial: this.props.dataContentDescriptionSocial,
            isAdvanceMode: this.props.isAdvanceMode,
            handleChange: (data) => {
              this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION] = this.props.isAdvanceMode
                ? this.props.dataContentDescriptionSocial
                : this.props.dataContentDescriptionSingle;
            },
            blurred: this.blurringFieldHandler,
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    console.log('populatingFormDataHandler', data);
    if (!data) return false;
    this.formPropsData[CONTENT_FIELD_KEY.ID] = data.id ?? 0;
    this.formPropsData[CONTENT_FIELD_KEY.NAME] = data.getName().value;
    this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = [
      { value: 366, label: 'Et et aut incidunt labore.' },
    ];

    this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = [{ value: 7, label: 'Persona 10' }];

    this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION] = data.getDescription().value.props.children;

    this.blurringFieldHandler();
  };

  next = () => {
    this.contentConnectedChannelsByOrganisationViewModel.getDataWhenBackGeneral()
    if (this.isFormValid()) {
      this.props.nextStep();
      this.viewModel.contentEditdata = this.formPropsData;
    }
  };

  blurringFieldHandler = () => {
    console.log('blurringFieldHandler');
    this.isFormValid();
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

  render() {
    console.log(this.contentConnectedChannelsByOrganisationViewModel);
    console.log('this.contentConnectedChannelsByOrganisationViewModel 123');
    console.log('[Content - FormGeneral] - re-render .........');

    const formSetting = this.generateFormSetting();

    const formSettingDescription = this.generateFormSettingDescription();

    return (
      <div className="pe-80">
        <h3 className="mb-4">General</h3>
        <div className="bg-white p-4">
          <Form key={Math.random(40, 200)}>
            <div className="d-flex">
              <div className="w-450">
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

                  <div>
                    <ListConnectedChannelModal
                      viewModel={this.contentConnectedChannelsByOrganisationViewModel}
                      showModalChannels={this.props.showModalChannels}
                      arrayConnectedChannelsFinal={this.props.arrayConnectedChannelsFinal}
                      isBackSaveData={this.contentConnectedChannelsByOrganisationViewModel.isBackSaveData}
                      isDeleteConnectChannel={this.contentConnectedChannelsByOrganisationViewModel.isDeleteConnectChannel}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 ps-4 mb-3">
                {Object.keys(formSettingDescription)
                  .map((groupIndex) => {
                    return [...Array(formSettingDescription[groupIndex])].map((group) => {
                      return renderingGroupFieldHandler(group, this.validator);
                    });
                  })
                  .reduce((arr, el) => {
                    return arr.concat(el);
                  }, [])}
              </div>
            </div>
          </Form>
          <div
            className={`d-flex border-top-1 pt-3 ${
              this.props.isBackWizardStep ? 'justify-content-between' : 'justify-content-end'
            }`}
          >
            {this.props.isBackWizardStep && (
              <Button
                className="btn btn-light border-success"
                onClick={this.props.previousWizardStep}
              >
                Back
              </Button>
            )}
            <ButtonNormal
              className="btn btn-success px-4"
              text="Next"
              onClick={this.next}
            ></ButtonNormal>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentContentFormGeneral;
