import React from "react";
import Checkbox from "../Checkbox";

class ComponentItemFanpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listFaceBookFanpage, handleCheckbox } = this.props;
    return (
      <div>
        <ul className="list-unstyled d-flex align-items-center">
          {listFaceBookFanpage.map((value, key) => {
            return (
              <li className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <img src="/assets/images/ic-facebook.svg" />
                  <p>{value.name}</p>
                </div>
                <Checkbox onClick={handleCheckbox(value.id)} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ComponentItemFanpage;
