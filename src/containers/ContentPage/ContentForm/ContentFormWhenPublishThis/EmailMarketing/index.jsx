import React, { Component } from 'react';
import { format } from "date-fns";

import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class EmailMarketing extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'post_now',
      isSwitch: false,
      startDateTime: new Date(),
      timeDate: new Date()
    };
  }

  handleRadio = (name) => {
    this.setState({
      isChecked: name,
    })

    this.postPublishingTypeChannels(name)

    this.checkSchedulePost(name);
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

  checkSchedulePost = (name) => {
    let { startDateTime, timeDate } = this.state;
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    let getListChannels = isAdvanceMode ? 
    contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels
    : contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;


    if(name === "schedule_post") {
      const getObjectItemscheduleChannel = {
        date: format((startDateTime), "dd-MM-yyyy"), 
        time: format((timeDate), "hh:mm a")
      }

      if(isAdvanceMode) {
        getListChannels.mail.mailchimp.publishedPlan.schedule = getListChannels.mail.mailchimp.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
      } else {
        getListChannels.mailchimp.publishedPlan.schedule = getListChannels.mailchimp.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
      }

    } else {
      if(isAdvanceMode) {
        getListChannels.mail.mailchimp.publishedPlan.schedule = []
      } else {
        getListChannels.mailchimp.publishedPlan.schedule = []
      }
    }
  }

  handlChangeDay = (date) => {
    let { isChecked } = this.state;
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;
    
    this.setState({
      startDateTime: date
    })

    const dateFormat = format((date), "dd-MM-yyyy");

    let getListChannels = isAdvanceMode ? 
    contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels
    : contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;

    let getSelectedSchedulePageEM = isAdvanceMode ? 
      getListChannels.mail.mailchimp.publishedPlan.schedule 
    : getListChannels.mailchimp.publishedPlan.schedule

    if(isChecked === "schedule_post") {
      getSelectedSchedulePageEM && getSelectedSchedulePageEM.map((value) => value.date = dateFormat)
    }
  }

  handlChangeTime = (date) => {
    let { isChecked } = this.state;
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    this.setState({
      timeDate: date
    })

    const timeFormat = format((date), "hh:mm a");

    let getListChannels = isAdvanceMode ? 
    contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels
    : contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;

    let getSelectedSchedulePageEM = isAdvanceMode ? 
      getListChannels.mail.mailchimp.publishedPlan.schedule 
    : getListChannels.mailchimp.publishedPlan.schedule


    if(isChecked === "schedule_post") {
      getSelectedSchedulePageEM && getSelectedSchedulePageEM.map((value) => value.time = timeFormat)
    }
  }

  render() {
    let { isChecked, isSwitch, startDateTime, timeDate } = this.state;
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
            <ComponentSchedule 
              isSwitch={isSwitch} 
              regularly={false} 
              startDateTime={startDateTime}
              timeDate={timeDate}
              handlChangeDay={(date) => this.handlChangeDay(date)}
              handlChangeTime={(date) => this.handlChangeTime(date)}
            />
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
