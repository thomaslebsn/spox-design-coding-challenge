import React from "react";

import "./index.scss";

class Line extends React.Component {
  render() {
    let { text } = this.props;
    return (
      <div className="wrapper_line mb-4">
        <div className="text_line">{text}</div>
      </div>
    );
  }
}

export default Line;
