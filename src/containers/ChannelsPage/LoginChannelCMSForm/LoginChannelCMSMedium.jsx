import React, { Component, lazy } from "react";
import { observer } from "mobx-react";

import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";

const FormComponent = lazy(() => import("../../../components/Form"));

const LoginChannelCMSMedium = observer(
  class LoginChannelCMSMedium extends Component {
    formPropsData = {
      token: "",
    };

    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel;
      this.viewModel.setForm(this);
    }

    generateFormSetting = () => {
      return [
        {
          fields: [
            {
              label: "Integration tokens",
              key: "token",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData.token = event.target.value;
              },
            },
          ],
        },
      ];
    };

    render() {
      return (
        <FormComponent
          generateFormSetting={() => this.generateFormSetting()}
          formPropsData={this.formPropsData}
          viewModel={this.viewModel}
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default LoginChannelCMSMedium;
