import React, { Component, lazy } from "react";
import { observer } from "mobx-react";

import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";

const FormComponent = lazy(() => import("../../../components/Form"));

const LoginChannelCMSForm = observer(
  class LoginChannelCMSForm extends Component {
    formPropsData = {
      endpoint_url: "",
      username: "",
      password: "",
    };

    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel;
      this.viewModel.setForm(this);
    }

    generateFormSetting = () => {
      console.log("re generate Form Setting", this.formPropsData);
      return [
        {
          fields: [
            {
              label: "Endpoint Url",
              key: "endpoint_url",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              placeholder: "",
              changed: (event) => {
                this.formPropsData.endpoint_url = event.target.value;
              },
            },
            {
              label: "Username",
              key: "username",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData.username = event.target.value;
              },
            },
            {
              label: "Password",
              key: "password",
              type: FORM_FIELD_TYPE.INPUT,
              typeFormat: FORM_FIELD_TYPE.PASSWORD,
              value: "",
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData.password = event.target.value;
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

export default LoginChannelCMSForm;
