import React from "react";

class ComponentLinkChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          icon: "assets/images/ic-facebook.svg",
          link: "#"
        },
        {
          icon: "assets/images/ic-facebook.svg",
          link: "#"
        },
        {
          icon: "assets/images/ic-facebook.svg",
          link: "#"
        },
        {
          icon: "assets/images/ic-facebook.svg",
          link: "#"
        }
      ]
    };
  }

  render() {
    let { data } = this.state;

    return (
      <ul className="list-unstyled d-flex align-items-center">
        {
          data.map((value, key) => {
            return (
              <li key={key}>
                <a href={void(0)} href={value.link}>
                  <img src={value.icon} alt="" />
                </a>
              </li>
            )
          })
        }
        
      </ul>
    );
  }
}

export default ComponentLinkChannels;
