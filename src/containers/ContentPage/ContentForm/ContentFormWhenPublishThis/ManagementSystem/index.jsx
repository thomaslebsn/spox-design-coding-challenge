import React, { Component } from 'react';
import { format } from "date-fns";

import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class ManagementSystem extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'cpost_now',
      isSwitch: false,
      startDateTime: new Date(),
      timeDate: new Date()
    };
  }

  handleRadio = (name) => {
    this.setState({
      isChecked: name,
    });

    let sliceName = name.substring(1);

    this.postPublishingTypeChannels(sliceName);

    this.checkSchedulePost(sliceName);
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

  checkSchedulePost = (name) => {
    let { startDateTime, timeDate } = this.state;
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    let getListChannels = isAdvanceMode ? 
    contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels
    : contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;


    if(name === "schedule_post") {
      const getObjectItemscheduleChannel = {
        date: format((startDateTime), "dd-MM-yyyy"), 
        time: format((timeDate), "HH:mm")
      }

      if(isAdvanceMode) {
        getListChannels.cms.joomla.publishedPlan.schedule = getListChannels.cms.joomla.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.cms.wordpress.publishedPlan.schedule = getListChannels.cms.wordpress.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.cms.drupal.publishedPlan.schedule = getListChannels.cms.drupal.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
      } else {
        getListChannels.joomla.publishedPlan.schedule = getListChannels.joomla.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.wordpress.publishedPlan.schedule = getListChannels.wordpress.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.drupal.publishedPlan.schedule = getListChannels.drupal.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
      }

    } else {
      if(isAdvanceMode) {
        getListChannels.cms.joomla.publishedPlan.schedule = []
        getListChannels.cms.wordpress.publishedPlan.schedule = []
        getListChannels.cms.drupal.publishedPlan.schedule = []
      } else {
        getListChannels.joomla.publishedPlan.schedule = []
        getListChannels.wordpress.publishedPlan.schedule = []
        getListChannels.drupal.publishedPlan.schedule = []
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

    let getSelectedSchedulePageJL = isAdvanceMode ? 
      getListChannels.cms.joomla.publishedPlan.schedule 
    : getListChannels.joomla.publishedPlan.schedule

    let getSelectedSchedulePageWP = isAdvanceMode ? 
      getListChannels.cms.wordpress.publishedPlan.schedule 
    : getListChannels.wordpress.publishedPlan.schedule

    let getSelectedSchedulePageDP = isAdvanceMode ? 
      getListChannels.cms.drupal.publishedPlan.schedule 
    : getListChannels.drupal.publishedPlan.schedule

    if(isChecked === "cschedule_post") {
      getSelectedSchedulePageJL && getSelectedSchedulePageJL.map((value) => value.date = dateFormat)
      getSelectedSchedulePageWP && getSelectedSchedulePageWP.map((value) => value.date = dateFormat)
      getSelectedSchedulePageDP && getSelectedSchedulePageDP.map((value) => value.date = dateFormat)
    }
  }

  handlChangeTime = (date) => {
    let { isChecked } = this.state;
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    this.setState({
      timeDate: date
    })

    const timeFormat = format((date), "HH:mm");

    let getListChannels = isAdvanceMode ? 
    contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels
    : contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;

    let getSelectedSchedulePageJL = isAdvanceMode ? 
      getListChannels.cms.joomla.publishedPlan.schedule 
    : getListChannels.joomla.publishedPlan.schedule

    let getSelectedSchedulePageWP = isAdvanceMode ? 
      getListChannels.cms.wordpress.publishedPlan.schedule 
    : getListChannels.wordpress.publishedPlan.schedule

    let getSelectedSchedulePageDP = isAdvanceMode ? 
      getListChannels.cms.drupal.publishedPlan.schedule 
    : getListChannels.drupal.publishedPlan.schedule


    if(isChecked === "cschedule_post") {
      getSelectedSchedulePageJL && getSelectedSchedulePageJL.map((value) => value.time = timeFormat)
      getSelectedSchedulePageWP && getSelectedSchedulePageWP.map((value) => value.time = timeFormat)
      getSelectedSchedulePageDP && getSelectedSchedulePageDP.map((value) => value.time = timeFormat)
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
        {/* <div className="d-flex mb-2">
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
        </div> */}
      </div>
    );
  }
}

export default ManagementSystem;
