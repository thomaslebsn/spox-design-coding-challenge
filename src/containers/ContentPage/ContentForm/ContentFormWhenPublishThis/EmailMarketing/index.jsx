import React, { Component } from 'react';
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class EmailMarketing extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'post_now',
      isSwitch: false,
    };
  }

  handleRadio = (name) => {
    this.setState({
      isChecked: name,
    })

    this.postPublishingTypeChannels(name)
  }

  handleChangeSwitch = () => {
    this.setState({
      isSwitch: !this.state.isSwitch,
    });
  }

  componentDidMount = () => {
    // this.postPublishingTypeChannels(this.state.isChecked)
  }

  postPublishingTypeChannels = (name) => {
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    if(isAdvanceMode) {
      let getDataChannelsSome = Object.values(contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.mail);
      getDataChannelsSome.map((value) => value.publishedPlan.publishingType = name)

    } else {
      let getListChannels = contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;
      getListChannels.mailchimp.publishedPlan.publishingType = name;
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
              id="post_now"
              checked={isChecked === 'post_now' ? true : false}
              name={'post_now'}
              onClick={() => this.handleRadio('post_now')}
            />
            <label className="form-check-label" htmlFor="post_now">
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
                id="schedule_post"
                checked={isChecked === 'schedule_post' ? true : false}
                name="schedule_post"
                onClick={() => this.handleRadio('schedule_post')}
              />
              <label className="form-check-label" htmlFor="schedule_post">
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
          {isChecked === 'schedule_post' && (
            <ComponentSchedule isSwitch={isSwitch} regularly={false} />
          )}
        </div>
        <div className="d-flex mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="save_as_draft"
              checked={isChecked === 'save_as_draft' ? true : false}
              name="save_as_draft"
              onClick={() => this.handleRadio('save_as_draft')}
            />
            <label className="form-check-label" htmlFor="save_as_draft">
              Save as draft
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailMarketing;
