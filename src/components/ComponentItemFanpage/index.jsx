import React from "react";
import Checkbox from "../Checkbox";

class ComponentItemFanpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul className="list-unstyled d-flex align-items-center">
          <li>
            <img src="/assets/images/ic-facebook.svg" />
            <p>text</p>
            <Checkbox />
          </li>
        </ul>
      </div>
    );
  }
}

export default ComponentItemFanpage;
