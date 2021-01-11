import React from "react";
import "./index.scss";

class ComponentHambuger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { handleAction, className } = this.props;
    return (
      <div
        class={`wrapper_hambuger d-none cursor-pointer ps-3 pe-2 ${className}`}
        onClick={handleAction}
      >
        <div class="item_hambuger"></div>
        <div class="item_hambuger"></div>
        <div class="item_hambuger"></div>
      </div>
    );
  }
}

export default ComponentHambuger;
