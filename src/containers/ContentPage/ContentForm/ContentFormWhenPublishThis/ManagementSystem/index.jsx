import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class ManagementSystem extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'cpost_now',
      isSwitch: false,
    };
  }

  handleRadio = (name) => {
    this.setState({
      isChecked: name,
    });

    let sliceName = name.substring(1);

    this.postPublishingTypeChannels(sliceName);
  };

  handleChangeSwitch = () => {
    this.setState({
      isSwitch: !this.state.isSwitch,
    });
  };

  componentDidMount = () => {
    // this.postPublishingTypeChannels(this.state.isChecked)
  }

  postPublishingTypeChannels = (name) => {
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    if(isAdvanceMode) {
      let getDataChannelsSome = Object.values(contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.cms);
      getDataChannelsSome.map((value) => value.publishedPlan.publishingType = name)

    } else {
      let getListChannels = contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;
      getListChannels.joomla.publishedPlan.publishingType = name;
      getListChannels.wordpress.publishedPlan.publishingType = name;
      getListChannels.drupal.publishedPlan.publishingType = name;
    }
  }

  render() {
    let { isChecked, isSwitch } = this.state;
    
    return (
      <div>
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="cpost_now"
              checked={isChecked === 'cpost_now' ? true : false}
              name={'cpost_now'}
              onClick={() => this.handleRadio('cpost_now')}
            />
            <label className="form-check-label" htmlFor="cpost_now">
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
                id="cschedule_post"
                checked={isChecked === 'cschedule_post' ? true : false}
                name="cschedule_post"
                onClick={() => this.handleRadio('cschedule_post')}
              />
              <label className="form-check-label" htmlFor="cschedule_post">
                Schedule
              </label>
            </div>
            {/* {isChecked === 'cschedule_post' && (
              <ComponentSwitch
                checked={isSwitch}
                handleChange={this.handleChangeSwitch}
                text={'Customize schedule for each channel'}
                id="customize_schedule"
              />
            )} */}
          </div>
          {isChecked === 'cschedule_post' && (
            <ComponentSchedule isSwitch={isSwitch} regularly={false} />
          )}
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="csave_as_draft"
              checked={isChecked === 'csave_as_draft' ? true : false}
              name="csave_as_draft"
              onClick={() => this.handleRadio('csave_as_draft')}
            />
            <label className="form-check-label" htmlFor="csave_as_draft">
              Save as draft
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementSystem;
