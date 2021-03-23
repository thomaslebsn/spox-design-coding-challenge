import React from "react";

class ComponentBillingPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { value } = this.props;

    return (
      <div>
        <h2>ComponentBillingPlan</h2>
      </div>
    );
  }
}

export default ComponentBillingPlan;
