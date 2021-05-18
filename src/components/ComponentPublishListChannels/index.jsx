import React, { Component } from 'react';

class ComponentPublishListChannels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    let { value, handleDeselectAll } = this.props;
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-blue mb-0">{value.name}</h6>
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
            {value.media.map((i) => {
              return (
                <li key={i} className="me-2 mb-2">
                  <span className="position-relative d-block">
                    <img className="img-avatar" src={i.avatar} alt="" />
                    <img
                      src={i.images}
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
