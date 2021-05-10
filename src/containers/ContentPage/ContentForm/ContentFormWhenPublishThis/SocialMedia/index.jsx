import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class SocialMedia extends Component {
  constructor() {
    super();
  }

  render() {
    let { handleRadio, name, isChecked } = this.props;
    return (
      <div>
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="social_post_now"
              checked={isChecked === 'social_post_now' ? true : false}
              name={name}
              onClick={() => handleRadio('social_post_now')}
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
                name="radio_2"
                onClick={() => handleRadio('social_schedule')}
              />
              <label className="form-check-label" htmlFor="social_schedule">
                Schedule
              </label>
            </div>
            {/* <ComponentSwitch
                          checked={isSwitch}
                          handleChange={this.handleChangeSwitch}
                          text={'Customize schedule for each channel'}
                          id="customize_schedule"
                        /> */}
            <ComponentSwitch text={'Customize schedule for each channel'} id="customize_schedule" />
          </div>
          {/* <ComponentSchedule isSwitch={isSwitch} /> */}
          <ComponentSchedule />
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="social_save"
              checked={isChecked === 'social_save' ? true : false}
              name="radio_3"
              onClick={() => handleRadio('social_save')}
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
