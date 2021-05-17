import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class EmailMarketing extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'email_post_now',
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
              id="email_post_now"
              checked={isChecked === 'email_post_now' ? true : false}
              name={'email_post_now'}
              onClick={() => this.handleRadio('email_post_now')}
            />
            <label className="form-check-label" htmlFor="email_post_now">
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
                id="email_schedule"
                checked={isChecked === 'cms_schedule' ? true : false}
                name="email_schedule"
                onClick={() => this.handleRadio('email_schedule')}
              />
              <label className="form-check-label" htmlFor="email_schedule">
                Schedule
              </label>
            </div>
            {isChecked === 'email_schedule' && (
              <ComponentSwitch
                checked={isSwitch}
                handleChange={this.handleChangeSwitch}
                text={'Customize schedule for each channel'}
                id="customize_schedule"
              />
            )}
          </div>
          {isChecked === 'email_schedule' && (
            <ComponentSchedule isSwitch={isSwitch} regularly={false} />
          )}
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="email_save"
              checked={isChecked === 'email_save' ? true : false}
              name="email_save"
              onClick={() => this.handleRadio('email_save')}
            />
            <label className="form-check-label" htmlFor="email_save">
              Save as draft
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailMarketing;
