import React, { Component } from 'react';

class ComponentPublishListChannelsCms extends Component {
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
          <h6 className="text-blue mb-0">Content Management System</h6>
        </div>
        <div>
          <ul className={`list-unstyled d-flex align-items-center mb-0 flex-wrap`}>
            {
              labelsConnectedChannels.includes("wordpress") && (
                <li className={`me-2 mb-2`}>
                  <a href={void 0} className="d-block cursor-pointer" >
                    <span className="position-relative d-block">
                      <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                      <img
                        src={'/assets/images/wordpress.png'}
                        alt=""
                        width={20}
                        className="position-absolute bottom-0 end-0"
                      />
                    </span>
                  </a>
                </li>
              )
            }
            {
              labelsConnectedChannels.includes("drupal") && (
                <li className={`me-2 mb-2`}>
                  <a href={void 0} className="d-block cursor-pointer" >
                    <span className="position-relative d-block">
                      <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                      <img
                        src={'/assets/images/drupal.png'}
                        alt=""
                        width={20}
                        className="position-absolute bottom-0 end-0"
                      />
                    </span>
                  </a>
                </li>
              )
            }
            {
              labelsConnectedChannels.includes("joomla") && (
                <li className={`me-2 mb-2`}>
                  <a href={void 0} className="d-block cursor-pointer" >
                    <span className="position-relative d-block">
                      <img className="img-avatar" src={"/assets/images/avatar-1.png"} alt="" />
                      <img
                        src={'/assets/images/joomla.png'}
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

export default ComponentPublishListChannelsCms;
