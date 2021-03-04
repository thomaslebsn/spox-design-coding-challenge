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

      this.state = {
        getPersonaID: "",
      };
    }

    componentDidMount = () => {};

    handleSelect = (e) => {
      this.previewPersonaViewModel.getPreviewPersona(e.value);
      this.setState({
        getPersonaID: e.value,
      });
    };

    handlShowPreviewPersona = (tranferPersonaId) => {
      this.handleSelect(tranferPersonaId[0]);
    };

    render() {
      let data = this.previewPersonaViewModel.previewPersonaData;

      let PersonaIdFormSelectData = personaSelectionViewModal.getSelectionData();

      let tranferPersonaId = PersonaIdFormSelectData.map((item) => {
        return {
          value: item[PERSONA_FIELD_KEY.ID],
          label: item[PERSONA_FIELD_KEY.NAME],
        };
      }).reduce((arr, el) => {
        return arr.concat(el);
      }, []);

      return (
        <ContentSbarRight
          data={data}
          handleSelect={this.handleSelect}
          options={tranferPersonaId}
          disabled={tranferPersonaId.length > 0 ? false : true}
          handlShowPreviewPersona={() =>
            this.handlShowPreviewPersona(tranferPersonaId)
          }
        />
      );
    }
  }
);

export default withPersonaViewModel(FormPreviewPersona);
