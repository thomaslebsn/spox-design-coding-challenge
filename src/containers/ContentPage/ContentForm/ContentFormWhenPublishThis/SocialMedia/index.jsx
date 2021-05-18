import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class SocialMedia extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'social_post_now',
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
              id="social_post_now"
              checked={isChecked === 'social_post_now' ? true : false}
              name={'social_post_now'}
              onClick={() => this.handleRadio('social_post_now')}
            />
            <label className="form-check-label" htmlFor="social_post_now">
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
                id="social_schedule"
                checked={isChecked === 'social_schedule' ? true : false}
                name="social_schedule"
                onClick={() => this.handleRadio('social_schedule')}
              />
              <label className="form-check-label" htmlFor="social_schedule">
                Schedule
              </label>
            </div>
            {isChecked === 'social_schedule' && (
              <ComponentSwitch
                checked={isSwitch}
                handleChange={this.handleChangeSwitch}
                text={'Customize schedule for each channel'}
                id="customize_schedule"
              />
            )}
          </div>
          {isChecked === 'social_schedule' && (
            <ComponentSchedule isSwitch={isSwitch} regularly={true} />
          )}
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="social_save"
              checked={isChecked === 'social_save' ? true : false}
              name="social_save"
              onClick={() => this.handleRadio('social_save')}
            />
            <label className="form-check-label" htmlFor="social_save">
              Save as draft
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialMedia;
