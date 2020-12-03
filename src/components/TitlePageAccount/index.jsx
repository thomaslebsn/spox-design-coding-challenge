import React from "react";

import "./index.scss";

class TitleAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, title_below } = this.props;
    return (
      <div className="d-block mb-5">
        <h2>{title}</h2>
        {title_below != undefined && title_below != "" && (
          <h2>{title_below}</h2>
        )}
      </div>
    );
  }
}

export default TitleAccount;
