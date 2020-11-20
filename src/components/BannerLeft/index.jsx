import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import './index.scss';

class BannerLeft extends React.Component {
    render() {
        let { text } = this.props;
        return (
            <div className="wrapper_banner_left">
                <div className="contenct_banner_left">
                    <div className="wrapper_logo">
                        <a href="/" className="link_logo">
                            <img src="../../images/logo/logo-white.svg" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BannerLeft;