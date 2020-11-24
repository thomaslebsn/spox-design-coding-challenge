import React from "react";
import Header from "../../containers/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                                  
        }
    }

    render() {
        return (
            <div className="padding_page_top wrapper_home_page">
                <div className="container">
                    <h2>Hello Home</h2>
                    <i><FontAwesomeIcon icon={faCoffee} /></i>
                    <Header />
                </div>
            </div>
        )
    }
}

export default HomePage;