import React from "react";
import { withTranslation } from "react-i18next";

import ComponentHeaderPage from "../../components/ComponentHeaderPage";
import Layout from "../../hoc/Layout";

import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSave } from "@fortawesome/free-regular-svg-icons/faSave";

import styles from "./index.module.scss";
import MakePersonaOverview from "../../components/MakePersonaOverview";

class PersonasPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false,
    };
  }

  handleCreate = () => {
    this.setState({
      isCreate: true,
    });
  };

  render() {
    const { t, i18n } = this.props;
    let { isCreate } = this.state;

    return (
      <Layout>
        <div className="py-4 px-3">
          {!isCreate ? (
            <div className="mb-3">
              <div className="mb-4">
                <div className="mb-3">
                  <ComponentHeaderPage title={"Persona recommendations"} />
                </div>
                <div>
                  <img src="assets/images/banner-template.png" />
                </div>
              </div>
              <div>
                <ComponentHeaderPage
                  title={"List Personas"}
                  textBtn={"Create a new persona"}
                  handleCreate={this.handleCreate}
                  faIcons={faPlus}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <ComponentHeaderPage
                  title={"Make Persona Overview"}
                  textBtn={"Save persona"}
                  handleCreate={this.handleSave}
                  faIcons={faSave}
                />
              </div>
              <MakePersonaOverview />
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default withTranslation("common")(PersonasPage);
