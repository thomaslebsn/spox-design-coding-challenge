import React, { Component } from 'react';

class ComponentPublishListChannels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    let { value, handleDeselectAll, listFacebookFanpageConnected, isAdvanceMode, contentConnectedChannelsByOrganisationViewModel } = this.props;

    if(isAdvanceMode === true) {
      contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.publishedPlan.selectedPage = listFacebookFanpageConnected
    } else {
      contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.publishedPlan.selectedPage = listFacebookFanpageConnected
    }

    console.log('this.contentConnectedChannelsByOrganisationViewModel23423535r2343');
    console.log(contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.publishedPlan.selectedPage);
    console.log(contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.publishedPlan.selectedPage);

    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-blue mb-0">Social Media</h6>
          <a
            href={void 0}
            className="fs-sm text-black opacity-75 text-decoration-none cursor-pointer"
            onClick={handleDeselectAll}
          >
            Deselect all
          </a>
        </div>
        <div>
          <ul className="list-unstyled d-flex align-items-center mb-0 flex-wrap">
            {listFacebookFanpageConnected && listFacebookFanpageConnected.map((i) => {
              return (
                <li key={i} className="me-2 mb-2">
                  <span className="position-relative d-block">
                    <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                    <img
                      src={'/assets/images/facebook.png'}
                      alt=""
                      width={20}
                      className="position-absolute bottom-0 end-0"
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default ComponentPublishListChannels;
