import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class ManagementSystem extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'cms_post_now',
      isSwitch: false,
    };
  }

  handleRadio = (name) => {
    this.setState({
      isChecked: name,
    });
  };

  handleChangeSwitch = () => {
    this.setState({
      isSwitch: !this.state.isSwitch,
    });
  };

  render() {
    let { isChecked, isSwitch } = this.state;
    return (
      <div>
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="cms_post_now"
              checked={isChecked === 'cms_post_now' ? true : false}
              name={'cms_post_now'}
              onClick={() => this.handleRadio('cms_post_now')}
            />
            <label className="form-check-label" htmlFor="cms_post_now">
              Post now
            </label>
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="cms_schedule"
                checked={isChecked === 'cms_schedule' ? true : false}
                name="cms_schedule"
                onClick={() => this.handleRadio('cms_schedule')}
              />
              <label className="form-check-label" htmlFor="cms_schedule">
                Schedule
              </label>
            </div>
            {isChecked === 'cms_schedule' && (
              <ComponentSwitch
                checked={isSwitch}
                handleChange={this.handleChangeSwitch}
                text={'Customize schedule for each channel'}
                id="customize_schedule"
              />
            )}
          </div>
          {isChecked === 'cms_schedule' && (
            <ComponentSchedule isSwitch={isSwitch} regularly={false} />
          )}
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="cms_save"
              checked={isChecked === 'cms_save' ? true : false}
              name="cms_save"
              onClick={() => this.handleRadio('cms_save')}
            />
            <label className="form-check-label" htmlFor="cms_save">
              Save as draft
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementSystem;
