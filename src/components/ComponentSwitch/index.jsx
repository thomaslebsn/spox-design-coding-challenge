import React, { Component } from 'react';
import './index.scss';

class ComponentSwitch extends Component {
  constructor() {
    super();
  }

  render() {
    let { handleChange, checked, text, id, textLeft } = this.props;
    return (
      <div className="form-check form-switch">
        {textLeft && (
          <label className="form-check-label me-2" htmlFor={id}>
            {textLeft}
          </label>
        )}

        <input
          className="form-check-input w-98"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        {text && (
          <label className="form-check-label" htmlFor={id}>
            {text}
          </label>
        )}
      </div>
    );
  }
}

export default ComponentSwitch;
