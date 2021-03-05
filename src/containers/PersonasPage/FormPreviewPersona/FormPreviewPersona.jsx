import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

import {
  PersonalSelectionPage,
  personaSelectionViewModal,
} from "../../ContentPage/ContentForm/PersonalSelectionPage";

import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

const FormPreviewPersona = observer(
  class FormPreviewPersona extends Component {
    previewPersonaViewModel = null;
    isHiddenPersonaPeview = false;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormGenera - Debug View Model Preview");
      console.log(viewModel);

      this.previewPersonaViewModel = viewModel
        ? viewModel.personaFormViewModel
        : null;

      console.log("After binding class Preview persona");
      console.log(this.previewPersonaViewModel);
    }

    componentDidMount = () => {};

    handleSelect = (e) => {
      this.previewPersonaViewModel.getPreviewPersona(e.value);
    };

    handlShowPreviewPersona = (tranferPersonaObject) => {
      const itemPersonalPerview = tranferPersonaObject
        ? tranferPersonaObject[0]
        : null;
      this.handleSelect(itemPersonalPerview);
      this.isHiddenPersonaPeview = false;
    };

    render() {
      let data = this.previewPersonaViewModel.previewPersonaData;

      let PersonaIdFormSelectData = personaSelectionViewModal.getSelectionData();

      let tranferPersonaObject = PersonaIdFormSelectData.map((item) => {
        return {
          value: item[PERSONA_FIELD_KEY.ID],
          label: item[PERSONA_FIELD_KEY.NAME],
        };
      }).reduce((arr, el) => {
        return arr.concat(el);
      }, []);

      personaSelectionViewModal.show === true &&
        (this.isHiddenPersonaPeview = true);

      return (
        <ContentSbarRight
          data={data}
          handleSelect={this.handleSelect}
          options={tranferPersonaObject ? tranferPersonaObject : null}
          disabled={
            tranferPersonaObject
              ? tranferPersonaObject.length > 0
                ? false
                : true
              : null
          }
          handlShowPreviewPersona={() =>
            this.handlShowPreviewPersona(tranferPersonaObject)
          }
          isHidden={this.isHiddenPersonaPeview}
        />
      );
    }
  }
);

export default withPersonaViewModel(FormPreviewPersona);
