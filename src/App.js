import React from "react";

import './scss/app.scss';

class App extends React.Component {
    render() {
        return (
            <div className="wrapper_all_page">
                {this.props.children}
            </div>
        );
    }
}

export default App;
