import React, { Component } from 'react';
import { format } from "date-fns";
import ComponentSchedule from '../../../../../components/ComponentSchedule';
import ComponentSwitch from '../../../../../components/ComponentSwitch';

class SocialMedia extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: 'spost_now',
      isSwitch: false,
      startDateTime: new Date(),
      timeDate: new Date()
    };
  }

  handleRadio = (name) => {
  
    this.setState({
      isChecked: name,
    })

    let sliceName = name.substring(1);

    this.postPublishingTypeChannels(sliceName);

    this.checkSchedulePost(sliceName);
  };

  handleChangeSwitch = () => {
    this.setState({
      isSwitch: !this.state.isSwitch,
    });
  };

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

  checkSchedulePost = (name) => {
    let { startDateTime, timeDate } = this.state;
    let { isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    let getListChannels = isAdvanceMode ? 
    contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels
    : contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels;

    let getSelectedPageFB = isAdvanceMode ? getListChannels.social.facebook.selectedPage
      : getListChannels.facebook.selectedPage;
    
    let getSelectedPageLI = isAdvanceMode ? getListChannels.social.linkedin.selectedPage
      : getListChannels.linkedin.selectedPage;

    if(name === "schedule_post") {
      getSelectedPageFB && getSelectedPageFB.map((value) => {
        const getObjectItemschedule = {
          pageId: value,
          date: format((startDateTime), "dd-MM-yyyy"), 
          time: format((timeDate), "hh:mm a")
        }

        const getValuePush = value = (getObjectItemschedule)

        if(isAdvanceMode) {
          getListChannels.social.facebook.publishedPlan.schedule = getListChannels.social.facebook.publishedPlan.schedule.concat(getValuePush)
        } else {
          getListChannels.facebook.publishedPlan.schedule = getListChannels.facebook.publishedPlan.schedule.concat(getValuePush)
        }
      })

      getSelectedPageLI && getSelectedPageLI.map((value) => {
        const getObjectItemscheduleLI = {
          pageId: value,
          date: format((startDateTime), "dd-MM-yyyy"), 
          time: format((timeDate), "hh:mm a")
        }

        const getValuePushLI = value = (getObjectItemscheduleLI)

        if(isAdvanceMode) {
          getListChannels.social.linkedin.publishedPlan.schedule = getListChannels.social.linkedin.publishedPlan.schedule.concat(getValuePushLI)
        } else {
          getListChannels.linkedin.publishedPlan.schedule = getListChannels.linkedin.publishedPlan.schedule.concat(getValuePushLI)
        }
      })

      const getObjectItemscheduleChannel = {
        date: format((startDateTime), "dd-MM-yyyy"), 
        time: format((timeDate), "hh:mm a")
      }

      if(isAdvanceMode) {
        getListChannels.social.instagram.publishedPlan.schedule = getListChannels.social.instagram.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.social.twitter.publishedPlan.schedule = getListChannels.social.twitter.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.social.youtube.publishedPlan.schedule = getListChannels.social.youtube.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.social.google_my_business.publishedPlan.schedule = getListChannels.social.google_my_business.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.social.tumblr.publishedPlan.schedule = getListChannels.social.tumblr.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.social.medium.publishedPlan.schedule = getListChannels.social.medium.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
      } else {
        getListChannels.instagram.publishedPlan.schedule = getListChannels.instagram.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.twitter.publishedPlan.schedule = getListChannels.twitter.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.youtube.publishedPlan.schedule = getListChannels.youtube.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.tumblr.publishedPlan.schedule = getListChannels.tumblr.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
        getListChannels.medium.publishedPlan.schedule = getListChannels.medium.publishedPlan.schedule.concat(getObjectItemscheduleChannel)
      }

    } else {
      if(isAdvanceMode) {
        getListChannels.social.facebook.publishedPlan.schedule = []
        getListChannels.social.linkedin.publishedPlan.schedule = []
        getListChannels.social.instagram.publishedPlan.schedule = []
        getListChannels.social.twitter.publishedPlan.schedule = []
        getListChannels.social.youtube.publishedPlan.schedule = []
        getListChannels.social.tumblr.publishedPlan.schedule = []
        getListChannels.social.medium.publishedPlan.schedule = []
      } else {
        getListChannels.facebook.publishedPlan.schedule = []
        getListChannels.linkedin.publishedPlan.schedule = []
        getListChannels.instagram.publishedPlan.schedule = []
        getListChannels.twitter.publishedPlan.schedule = []
        getListChannels.youtube.publishedPlan.schedule = []
        getListChannels.tumblr.publishedPlan.schedule = []
        getListChannels.medium.publishedPlan.schedule = []
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

    let getSelectedSchedulePageFB = isAdvanceMode ? 
      getListChannels.social.facebook.publishedPlan.schedule 
    : getListChannels.facebook.publishedPlan.schedule

    let getSelectedSchedulePageLi = isAdvanceMode ? 
      getListChannels.social.linkedin.publishedPlan.schedule 
    : getListChannels.linkedin.publishedPlan.schedule

    let getSelectedSchedulePageIN = isAdvanceMode ? 
      getListChannels.social.instagram.publishedPlan.schedule
    : getListChannels.instagram.publishedPlan.schedule

    let getSelectedSchedulePageTT = isAdvanceMode ? 
      getListChannels.social.twitter.publishedPlan.schedule
    : getListChannels.twitter.publishedPlan.schedule

    let getSelectedSchedulePageYT = isAdvanceMode ? 
      getListChannels.social.youtube.publishedPlan.schedule
    : getListChannels.youtube.publishedPlan.schedule

    let getSelectedSchedulePageTB = isAdvanceMode ? 
      getListChannels.social.tumblr.publishedPlan.schedule
    : getListChannels.tumblr.publishedPlan.schedule

    let getSelectedSchedulePageMD = isAdvanceMode ? 
      getListChannels.social.medium.publishedPlan.schedule
    : getListChannels.medium.publishedPlan.schedule

    let getSelectedSchedulePageGGB = isAdvanceMode ? 
      getListChannels.social.google_my_business.publishedPlan.schedule
    : getListChannels.google_my_business.publishedPlan.schedule

    if(isChecked === "sschedule_post") {
      getSelectedSchedulePageFB && getSelectedSchedulePageFB.map((value) => value.date = dateFormat)
      getSelectedSchedulePageLi && getSelectedSchedulePageLi.map((value) => value.date = dateFormat)

      getSelectedSchedulePageIN && getSelectedSchedulePageIN.map((value) => value.date = dateFormat)
      getSelectedSchedulePageTT && getSelectedSchedulePageTT.map((value) => value.date = dateFormat)
      getSelectedSchedulePageYT && getSelectedSchedulePageYT.map((value) => value.date = dateFormat)
      getSelectedSchedulePageTB && getSelectedSchedulePageTB.map((value) => value.date = dateFormat)
      getSelectedSchedulePageMD && getSelectedSchedulePageMD.map((value) => value.date = dateFormat)
      getSelectedSchedulePageGGB && getSelectedSchedulePageGGB.map((value) => value.date = dateFormat)
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

    let getSelectedSchedulePageFB = isAdvanceMode ? 
      getListChannels.social.facebook.publishedPlan.schedule 
    : getListChannels.facebook.publishedPlan.schedule

    let getSelectedSchedulePageLi = isAdvanceMode ? 
      getListChannels.social.linkedin.publishedPlan.schedule 
    : getListChannels.linkedin.publishedPlan.schedule

    let getSelectedSchedulePageIN = isAdvanceMode ? 
      getListChannels.social.instagram.publishedPlan.schedule
    : getListChannels.instagram.publishedPlan.schedule

    let getSelectedSchedulePageTT = isAdvanceMode ? 
      getListChannels.social.twitter.publishedPlan.schedule
    : getListChannels.twitter.publishedPlan.schedule

    let getSelectedSchedulePageYT = isAdvanceMode ? 
      getListChannels.social.youtube.publishedPlan.schedule
    : getListChannels.youtube.publishedPlan.schedule

    let getSelectedSchedulePageTB = isAdvanceMode ? 
      getListChannels.social.tumblr.publishedPlan.schedule
    : getListChannels.tumblr.publishedPlan.schedule

    let getSelectedSchedulePageMD = isAdvanceMode ? 
      getListChannels.social.medium.publishedPlan.schedule
    : getListChannels.medium.publishedPlan.schedule

    let getSelectedSchedulePageGGB = isAdvanceMode ? 
      getListChannels.social.google_my_business.publishedPlan.schedule
    : getListChannels.google_my_business.publishedPlan.schedule

    if(isChecked === "sschedule_post") {
      getSelectedSchedulePageFB && getSelectedSchedulePageFB.map((value) => value.time = timeFormat)
      getSelectedSchedulePageLi && getSelectedSchedulePageLi.map((value) => value.time = timeFormat)

      getSelectedSchedulePageIN && getSelectedSchedulePageIN.map((value) => value.time = timeFormat)
      getSelectedSchedulePageTT && getSelectedSchedulePageTT.map((value) => value.time = timeFormat)
      getSelectedSchedulePageYT && getSelectedSchedulePageYT.map((value) => value.time = timeFormat)
      getSelectedSchedulePageTB && getSelectedSchedulePageTB.map((value) => value.time = timeFormat)
      getSelectedSchedulePageMD && getSelectedSchedulePageMD.map((value) => value.time = timeFormat)
      getSelectedSchedulePageGGB && getSelectedSchedulePageGGB.map((value) => value.time = timeFormat)
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
          {isChecked === 'sschedule_post' && (
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
