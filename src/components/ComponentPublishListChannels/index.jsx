import React, { Component } from 'react';

class ComponentPublishListChannels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
  };

  render() {
    let { 
      handleDeselectAllSocial, 
      handleSelectAllSocial,
      listFacebookFanpageConnected, 
      isAdvanceMode, 
      contentConnectedChannelsByOrganisationViewModel,
      listLinkedinFanpageConnected,
      isDeselectAllSocial
    } = this.props;

    console.log('isDeselectAllSocialrender123');
    console.log(isDeselectAllSocial);

    console.log('listFacebookFanpageConnectedrender123');
    console.log(listFacebookFanpageConnected);

    console.log('listLinkedinFanpageConnectedrender123');
    console.log(listLinkedinFanpageConnected);

    if(isDeselectAllSocial === true) {
      contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.selectedPage = [];
      contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.linkedin.selectedPage = [];
      contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.selectedPage = [];
      contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.linkedin.selectedPage = [];
    } else {
      if(isAdvanceMode === true) {
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.selectedPage = listFacebookFanpageConnected;
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.linkedin.selectedPage = listLinkedinFanpageConnected;
      } else {
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.selectedPage = listFacebookFanpageConnected;
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.linkedin.selectedPage = listLinkedinFanpageConnected;
      }
    }

    // let converListLinkedinFanpageConnected = '';

    // if(listLinkedinFanpageConnected) {
    //   if(typeof listLinkedinFanpageConnected  == 'object') {
    //     converListLinkedinFanpageConnected = Object.values(listLinkedinFanpageConnected)
    //   } else {
    //     converListLinkedinFanpageConnected = listLinkedinFanpageConnected
    //   }
    // }

    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-blue mb-0">Social Media</h6>
          {
            isDeselectAllSocial ? (
              <a
                href={void 0}
                className="fs-sm text-black opacity-75 text-decoration-none cursor-pointer"
                onClick={handleSelectAllSocial}
              >
                Select all
              </a>
            ) : (
              <a
                href={void 0}
                className="fs-sm text-black opacity-75 text-decoration-none cursor-pointer"
                onClick={handleDeselectAllSocial}
              >
                Deselect all
              </a>
            )
          }
        </div>
        <div>
          <ul className={`list-unstyled d-flex align-items-center mb-0 flex-wrap ${isDeselectAllSocial ? 'opacity-50' : ''}`}>
            {listFacebookFanpageConnected && listFacebookFanpageConnected.map((i) => {
              return (
                <li key={i} className="me-2 mb-2">
                  <a href={void 0} className="d-block">
                    <span className="position-relative d-block">
                      <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                      <img
                        src={'/assets/images/facebook.png'}
                        alt=""
                        width={20}
                        className="position-absolute bottom-0 end-0"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
            {listLinkedinFanpageConnected && listLinkedinFanpageConnected.map((i) => {
              return (
                <li key={i} className="me-2 mb-2 cursor-pointer">
                  <a href={void 0} className="d-block">
                    <span className="position-relative d-block ">
                      <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                      <img
                        src={'/assets/images/linkedin.png'}
                        alt=""
                        width={20}
                        className="position-absolute bottom-0 end-0"
                      />
                    </span>
                  </a>
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
