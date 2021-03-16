import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../../constants/PersonaModule";

const FormPreviewPersona = observer(
  class FormPreviewPersona extends Component {
    previewPersonaViewModel = null;
    isHiddenPersonaPeview = false;
    personaTableSelectionModalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormGenera - Debug View Model Preview ----");
      console.log(viewModel);
      console.log(this.props);
      this.personaTableSelectionModalViewModel = this.props.personaTableSelectionModalViewModel
        ? this.props.personaTableSelectionModalViewModel
        : null;

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
      this.isHiddenPersonaPeview = !this.isHiddenPersonaPeview;
    };

    render() {
      let data = this.previewPersonaViewModel.previewPersonaData;
      console.log('render - this.personaTableSelectionModalViewModel');
      console.log(this.personaTableSelectionModalViewModel);
      let { personasSelectionData } = this.personaTableSelectionModalViewModel;

      let tranferPersonaObject = personasSelectionData.map((item) => {
        return {
          value: item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID],
          label: item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME],
        };
      }).reduce((arr, el) => {
        return arr.concat(el);
      }, []);

      this.personaTableSelectionModalViewModel.show === true &&
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
