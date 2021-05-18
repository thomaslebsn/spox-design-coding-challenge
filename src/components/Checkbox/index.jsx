import React from 'react';

import './index.scss';

class Checkbox extends React.Component {
  render() {
    let { name, text, checked, onCheckBoxChange } = this.props;
    return (
      <div className="form-check">
        <input
          name={name}
          className="form-check-input"
          type="checkbox"
          checked={checked}
          onChange={onCheckBoxChange}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          {text}
        </label>
      </div>
    );
  }
}

export default Checkbox;
