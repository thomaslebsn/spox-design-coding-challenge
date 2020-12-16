import React from "react";

import { withTranslation } from "react-i18next";

import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: 50,
    boxShadow: "none",
    borderColor: "#ced4da",
    "&:hover": {
      borderColor: "#8bdcbc",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#FFFFFF" : "#212529",
    "&:hover": {
      backgroundColor: state.isSelected ? "#005f89" : "#8bdcbc",
    },
    backgroundColor: state.isSelected ? "#005f89" : "#FFF",
  }),
};

class SelectComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <Select {...this.props} styles={customStyles} />;
  }
}

export default withTranslation("common")(SelectComponent);
