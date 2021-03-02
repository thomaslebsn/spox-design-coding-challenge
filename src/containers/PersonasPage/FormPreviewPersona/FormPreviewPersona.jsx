import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

const FormPreviewPersona = observer(
  class FormPreviewPersona extends Component {
    personaFormViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormGenera - Debug View Model Preview");
      console.log(viewModel);

      this.personaFormViewModel = viewModel
        ? viewModel.getPersonaFormViewModel()
        : null;

      console.log("After binding class Preview persona");
      console.log(this.personaFormViewModel);
    }

    render() {
      return (
        <ContentSbarRight
          previewPersonaFormViewModel={this.personaFormViewModel}
        />
      );
    }
  }
);

export default withPersonaViewModel(FormPreviewPersona);
