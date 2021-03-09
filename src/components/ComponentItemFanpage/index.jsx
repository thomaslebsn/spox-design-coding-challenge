import React from "react";
import Checkbox from "../Checkbox";

class ComponentItemFanpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCheckbox = (id) => {
    console.log("id id id id 11111", id);
  };

  render() {
    const { name, handleCheckbox } = this.props;
    return (
      <li className="d-flex align-items-center justify-content-between w-100 mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <img src="/assets/images/ic-facebook.svg" />
          <p className="mb-0">{name}</p>
        </div>
        <div onClick={handleCheckbox}>
          <Checkbox />
        </div>
      </li>
    );
  }
}

export default ComponentItemFanpage;
