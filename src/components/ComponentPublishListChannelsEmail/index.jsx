import React, { Component } from 'react';

class ComponentPublishListChannelsEmail extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount = () => {
  };

  render() {
    let { 
      labelsConnectedChannels
    } = this.props;

    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-blue mb-0">Email Marketing</h6>
        </div>
        <div>
          <ul className={`list-unstyled d-flex align-items-center mb-0 flex-wrap`}>
            {
              labelsConnectedChannels.includes("mailchimp") && (
                <li className={`me-2 mb-2`}>
                  <a href={void 0} className="d-block cursor-pointer" >
                    <span className="position-relative d-block">
                      <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                      <img
                        src={'/assets/images/mailchimp.png'}
                        alt=""
                        width={20}
                        className="position-absolute bottom-0 end-0"
                      />
                    </span>
                  </a>
                </li>
              )
            }
          </ul>
        </div>
      </>
    );
  }
}

export default ComponentPublishListChannelsEmail;
