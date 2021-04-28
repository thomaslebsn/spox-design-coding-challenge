import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';

import SimpleReactValidator from 'simple-react-validator';
import { Form } from 'react-bootstrap';

import { FORM_FIELD_TYPE, FORMAT_DATE } from '../../../constants/FormFieldType';
import { GENDER, MARITAL_STATUS, PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import { withPersonaViewModel } from '../PersonaViewModels/PersonaViewModelContextProvider';

import ComponentFormFieldBio from '../FormComponentPersona/ComponentFormFieldBio';
import ComponentFormFieldGCP from '../FormComponentPersona/ComponentFormFieldGCP';
import ComponentFormFieldInformation from '../FormComponentPersona/ComponentFormFieldInformation';
import ComponentFormFieldPersonaName from '../FormComponentPersona/ComponentFormFieldPersonaName';
import ComponentHeaderPage from '../../../components/ComponentHeaderPage';
import PAGE_STATUS from '../../../constants/PageStatus';
import Spinner from '../../../components/Spinner';

import { renderingGroupFieldHandler } from '../../../utils/form';

import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import ComponentFormChannels from '../FormComponentPersona/ComponentFormChannels';
import ComponentFBITads from '../../../components/ComponentFBITads';
import ComponentLocations from '../../../components/ComponentLocations';

const getDataSelectOptionsFBITDemographics = [
  { value: 'interior-design', label: 'Interior design' },
  { value: 'fashion-design', label: 'Fashion design' },
  { value: 'graphic-design', label: 'Graphic design' },
];

const getLocationsPesona = [
  { value: 'location-1', label: 'People living in or recently in this location' },
  { value: 'location-2', label: 'People living in or recently in this location 1' },
  { value: 'location-3', label: 'People living in or recently in this location 2' },
];

const getDataSelectOptionsAge = [
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '62', label: '62' },
  { value: '63', label: '63' },
  { value: '64', label: '64' },
  { value: '65', label: '65' },
  { value: '65+', label: '65+' },
];

const PersonaFormPage = observer(
  class PersonaFormPage extends Component {
    formPropsData = {
      [PERSONA_FIELD_KEY.NAME]: '',
    };

    validator = null;
    viewModel = null;

    constructor(props) {
      console.log('[PersonaFormPage] re initialize');
      super(props);

      const { viewModel } = props;
      console.log(viewModel);

      this.validator = new SimpleReactValidator();

      this.personaFormViewModel = viewModel ? viewModel.getPersonaFormViewModel() : null;

      this.personaFormViewModel.setForm(this);
    }

    componentDidMount() {
      const { match } = this.props;
      this.personaFormViewModel.getConnectedChannelMasterData();

      if (match.params.bypersonatemplate !== undefined && match.params.id !== undefined) {
        this.personaFormViewModel.getPersonaTemplate(match.params.id);
      } else if (match.params.id) {
        this.personaFormViewModel.getPersona(match.params.id);
      } else {
        this.personaFormViewModel.formStatus = PAGE_STATUS.READY;
      }
    }

    populatingFormDataHandler = (data) => {
      if (!data) return false;
      console.log('populatingFormDataHandler', data);
      this.formPropsData[PERSONA_FIELD_KEY.ID] = data.id ?? 0;
      this.formPropsData[PERSONA_FIELD_KEY.NAME] = data.getName().value;
      this.formPropsData[PERSONA_FIELD_KEY.AVATAR] = data.getAvatar().value;
      this.formPropsData[PERSONA_FIELD_KEY.DG_NAME] = data.getDgName().value;
      this.formPropsData[PERSONA_FIELD_KEY.TOOLS] = data.getTools().value;
      this.formPropsData[PERSONA_FIELD_KEY.BIO] = data.getBio().value;
      this.formPropsData[PERSONA_FIELD_KEY.GOALS] = data.getGoals().value;
      this.formPropsData[PERSONA_FIELD_KEY.AGE] = data.getAge().value;
      this.formPropsData[PERSONA_FIELD_KEY.GENDER] = data.getGender().value;
      this.formPropsData[PERSONA_FIELD_KEY.LOCATION] = data.getLocation().value;
      this.formPropsData[PERSONA_FIELD_KEY.JOB_TITLE] = data.getJobTitle().value;
      this.formPropsData[PERSONA_FIELD_KEY.SECTOR] = data.getSector().value;

      this.formPropsData[PERSONA_FIELD_KEY.MARITAL_STATUS] = data.getMaritalStatus().value;

      this.formPropsData[PERSONA_FIELD_KEY.WEBSITE] = data.getWebsite().value;

      this.formPropsData[PERSONA_FIELD_KEY.VENDOR_RESEARCH] = data.getVendorResearch().value;

      this.formPropsData[PERSONA_FIELD_KEY.INTEREST] = data.getInterest().value;

      this.formPropsData[PERSONA_FIELD_KEY.CHALLENGES] = data.getChallenges().value;

      this.formPropsData[PERSONA_FIELD_KEY.PAINT_POINT] = data.getPaintpoint().value;

      this.formPropsData[PERSONA_FIELD_KEY.CHANNELS] = data.channels;
    };

    isFormValid = () => {
      console.log('isFormValid');
      if (this.validator.allValid()) {
        console.log('[is Form Valid]');
        console.log(this.formPropsData);
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    handleSave = () => {
      this.personaFormViewModel.savePersona();
    };

    getFormPropsData = () => this.formPropsData;

    render() {
      console.log('[PersonaFormPage] rerender.....');

      this.validator.purgeFields();

      const { formStatus } = this.personaFormViewModel;
      this.formPropsData[
        'connected_channels_master_data'
      ] = this.personaFormViewModel.connectedChannelMasterData;

      console.log(this.formPropsData);

      console.log('getDataValueSelectedPersona');
      console.log(this.personaFormViewModel.getDataValueSelectedPersona);

      return formStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <Form key={Math.random(40, 200)} className="row">
          <div className="mb-4">
            <ComponentHeaderPage
              title={'Make Persona Overview'}
              textBtn={'Save persona'}
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
              <p className="text-blue-0 opacity-75 mb-2 fs-5">General</p>
              <ComponentLocations
                validator={this.validator}
                formPropsData={this.formPropsData}
                getDataSelectOptions={getLocationsPesona}
                getDataSelectOptionsAge={getDataSelectOptionsAge}
                viewModel={this.personaFormViewModel}
                getAge={this.personaFormViewModel.getAge}
              />
            </div>
            <div className="border-start-5 bg-white p-2 px-3 mb-3 rounded-2">
              <p className="text-blue-0 opacity-75 mb-2 fs-5">Channels</p>
              <div>
                <ComponentFormChannels
                  validator={this.validator}
                  formPropsData={this.formPropsData}
                  viewModel={this.personaFormViewModel}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <ComponentFBITads
              getDataSelectOptionsFBITDemographics={getDataSelectOptionsFBITDemographics}
              getDataSelectOptionsFBITInterests={getDataSelectOptionsFBITDemographics}
              getDataSelectOptionsFBITBehaviours={getDataSelectOptionsFBITDemographics}
              getDataSelectOptionsGGemographics={getDataSelectOptionsFBITDemographics}
              getDataSelectOptionsGGInterests={getDataSelectOptionsFBITDemographics}
              getDataSelectOptionsGGBehaviours={getDataSelectOptionsFBITDemographics}
              getDataValueSelectedPersona={this.personaFormViewModel.getDataValueSelectedPersona}
            />
          </div>
        </Form>
      );
    }
  }
);

export default withPersonaViewModel(PersonaFormPage);
