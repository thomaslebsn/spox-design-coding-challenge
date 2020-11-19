import React from "react";
import Menu from "../Menu";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                                  
        }
    }

    render() {
        return (
            <div className="wrapper_header">
                <Menu />
            </div>
        )
    }
}


export default Header;