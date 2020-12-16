import React from "react";

import { withTranslation } from "react-i18next";

import Select from "react-select";

class SelectComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    let { isBorder } = this.props;

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        minHeight: 50,
        boxShadow: "none",
        borderColor: isBorder ? "#ced4da" : "transparent",
        "&:hover": {
          borderColor: isBorder ? "#8bdcbc" : "transparent",
        }
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#FFFFFF" : "#212529",
        "&:hover": {
          backgroundColor: state.isSelected ? "#005f89" : "#8bdcbc",
        },
        backgroundColor: state.isSelected ? "#005f89" : "#FFF"
      }),
      indicatorSeparator: (styles) => ({display:'none'}),
      dropdownIndicator: base => ({
        ...base,
        color: "text-green"
      })
    };

    return <Select {...this.props} styles={customStyles} className="text-green" />;
  }
}

export default withTranslation("common")(SelectComponent);
