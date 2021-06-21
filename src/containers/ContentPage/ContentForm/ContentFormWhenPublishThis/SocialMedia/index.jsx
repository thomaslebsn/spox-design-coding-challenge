import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class SocialMedia extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'spost_now',
      isSwitch: false,
    };
  }

  handleRadio = (name) => {
    this.setState({
      isChecked: name,
    })

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
      let getDataChannelsSome = Object.values(contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social);
      getDataChannelsSome.map((value) => value.publishedPlan.publishingType = name)

    } else {
      let getListChannels = contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;
      getListChannels.facebook.publishedPlan.publishingType = name;
      getListChannels.linkedin.publishedPlan.publishingType = name;
      getListChannels.instagram.publishedPlan.publishingType = name;
      getListChannels.twitter.publishedPlan.publishingType = name;
      getListChannels.youtube.publishedPlan.publishingType = name;
      getListChannels.google_my_business.publishedPlan.publishingType = name;
      getListChannels.tumblr.publishedPlan.publishingType = name;
      getListChannels.medium.publishedPlan.publishingType = name;
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
              id="spost_now"
              checked={isChecked === 'spost_now' ? true : false}
              name={'spost_now'}
              onClick={() => this.handleRadio('spost_now')}
            />
            <label className="form-check-label" htmlFor="spost_now">
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
                id="sschedule_post"
                checked={isChecked === 'sschedule_post' ? true : false}
                name="sschedule_post"
                onClick={() => this.handleRadio('sschedule_post')}
              />
              <label className="form-check-label" htmlFor="sschedule_post">
                Schedule
              </label>
            </div>
            {/* {isChecked === 'schedule_post' && (
              <ComponentSwitch
                checked={isSwitch}
                handleChange={this.handleChangeSwitch}
                text={'Customize schedule for each channel'}
                id="customize_schedule"
              />
            )} */}
          </div>
          {/* {isChecked === 'sschedule_post' && (
            <ComponentSchedule isSwitch={isSwitch} regularly={true} />
          )} */}
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="ssave_as_draft"
              checked={isChecked === 'ssave_as_draft' ? true : false}
              name="ssave_as_draft"
              onClick={() => this.handleRadio('ssave_as_draft')}
            />
            <label className="form-check-label" htmlFor="ssave_as_draft">
              Save as draft
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialMedia;
