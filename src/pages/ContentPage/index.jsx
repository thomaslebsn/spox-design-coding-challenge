import React from "react";
import { withTranslation } from "react-i18next";
import ComponentHeaderPage from "../../components/ComponentHeaderPage";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import CreateContent from "../../components/CreateContent";
import ContentSbarRight from "../../components/ContentSbarRight";

class ContentPage extends React.Component {
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
    let { isCreate } = this.state;
    return (
      <div className="py-4 px-3">
        {!isCreate ? (
          <ComponentHeaderPage
            title="List posts"
            textBtn={"Create post"}
            handleCreate={this.handleCreate}
            faIcons={faPlus}
          />
        ) : (
          <div>
            <CreateContent />
            <ContentSbarRight />
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation("common")(ContentPage);
