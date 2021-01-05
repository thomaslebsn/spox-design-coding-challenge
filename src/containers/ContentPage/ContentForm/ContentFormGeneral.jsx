import React, { Component, lazy } from "react";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import PersonaStore from "../../PersonasPage/PersonaStore/PersonaStore";
import PersonaViewModel from "../../PersonasPage/PersonaViewModels/PersonaViewModel";
import { PersonaViewModelContextProvider } from "../../PersonasPage/PersonaViewModels/PersonaViewModelContextProvider";

const FormComponent = lazy(() => import("../../../components/Form"));

const PersonasSelection = lazy(() =>
  import("../../PersonasPage/PersonasSelection/PersonasSelection")
);

const personaStore = new PersonaStore();
const personaViewModel = new PersonaViewModel(personaStore);

class ContentFormGeneral extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.NAME]: "",
    [CONTENT_FIELD_KEY.CREATED_DATE]: "",
    [CONTENT_FIELD_KEY.UPDATED_DATE]: "",
  };

  isEditMode = false;

  constructor(props) {
    super(props);

    this.viewModel = this.props.viewModel;
  }

  generateFormSetting = () => {
    console.log("re generate Form Setting");
    return [
      {
        fields: [
          {
            label: "Choose the persona",
            key: CONTENT_FIELD_KEY.PERSONA,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.PERSONA],
            component: (
              <PersonaViewModelContextProvider viewModel={personaViewModel}>
                <PersonasSelection />
              </PersonaViewModelContextProvider>
            ),
            viewModel: personaViewModel.getPersonaSelectionViewModel(),

            required: true,
            validation: "required",
            changed: (data) => {
              this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = data;
            },
          },
          {
            label: "Headline",
            key: CONTENT_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CONTENT_FIELD_KEY.NAME],
            required: true,
            validation: "required",
          },
          {
            label: "Description",
            key: CONTENT_FIELD_KEY.DESCRIPTION,
            type: FORM_FIELD_TYPE.TAB,
            value: this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION],
            viewModel: personaViewModel.getPersonaSelectionViewModel(),
            required: true,
            validation: "required",
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[CONTENT_FIELD_KEY.NAME] = data.getName().value;
  };

  render() {
    console.log("[Content - FormGeneral] - re-render .........");

    return (
      <div className="bg-white p-4">
        <div className="col-6">
          <h3 className="mb-4">General</h3>
          <FormComponent
            generateFormSetting={() => this.generateFormSetting()}
            formPropsData={this.formPropsData}
            viewModel={this.viewModel}
            key={Math.random(40, 200)}
          />
        </div>
      </div>
    );
  }
}
export default ContentFormGeneral;
