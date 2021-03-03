import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

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
    }

    componentDidMount = () => {
      this.previewPersonaViewModel.getPreviewPersona(700);
    };

    render() {
      let data = this.previewPersonaViewModel.previewPersonaData;

      return <ContentSbarRight data={data} />;
    }
  }
);

export default withPersonaViewModel(FormPreviewPersona);
