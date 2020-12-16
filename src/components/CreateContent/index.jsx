import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SelectComponent from "../Select";

import "./index.scss";

const campaigns = [
  { value: "campaigns1", label: "campaigns11" },
  { value: "campaigns2", label: "campaigns2" },
  { value: "campaigns3", label: "campaigns3" },
];

const personas = [
  { value: "personas1", label: "personas1" },
  { value: "personas2", label: "personas2" },
  { value: "personas3", label: "personas3" },
];

const themes = [
  { value: "themes1", label: "themes1" },
  { value: "themes2", label: "themes2" },
  { value: "themes3", label: "themes3" },
];

class CreateContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null,
      persona: null,
      theme: null,
      channels: [
        {
          id: 1,
          name: "facebook",
          title: "Facebook",
        },
        {
          id: 2,
          name: "advertising",
          title: "Advertising",
        },
      ],
    };
  }

  handleCampaign = (selectedOption) => {
    this.setState((state) => ({ campaign: selectedOption }));
  };

  handlePersona = (selectedOption) => {
    this.setState((state) => ({ persona: selectedOption }));
  };

  handleTheme = (selectedOption) => {
    this.setState((state) => ({ theme: selectedOption }));
  };

  render() {
    let { channels } = this.state;

    return (
      <div className="col-6">
        <h3 className="mb-4">General</h3>
        <form>
          <div className="d-flex justify-content-between">
            <label className="form-label mb-2" htmlFor="email">
              Choose the campaign <span>*</span>
            </label>
            <Link>Create new</Link>
          </div>

          <SelectComponent
            value={this.state.campaign}
            onChange={this.handleCampaign}
            options={campaigns}
            className="mb-4"
          />

          <div className="d-flex justify-content-between">
            <label className="form-label mb-2" htmlFor="email">
              Choose the persona <span>*</span>
            </label>
            <Link>Create new</Link>
          </div>
          <SelectComponent
            value={this.state.persona}
            onChange={this.handlePersona}
            options={personas}
            isMulti={true}
            className="mb-4"
          />

          <label className="form-label mb-2" htmlFor="email">
            Choose theme <span>*</span>
          </label>
          <SelectComponent
            value={this.state.theme}
            onChange={this.handleTheme}
            options={themes}
            className="mb-4"
          />

          <label className="form-label mb-2" htmlFor="email">
            Headline
          </label>
          <input type="text" className="form-control mb-4" id="email" />

          <label className="form-label mb-2" htmlFor="email">
            Description
          </label>
          <div className="wrapper_tabs">
            <Tabs defaultActiveKey="1" id="desc-tab">
              {channels.map((value) => {
                return (
                  <Tab eventKey={value.id} title={value.title}>
                    <textarea
                      class="form-control"
                      id={value.id}
                      rows="5"
                    ></textarea>
                  </Tab>
                );
              })}
            </Tabs>{" "}
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation("common")(CreateContent);
