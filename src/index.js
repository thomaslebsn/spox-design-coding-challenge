import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
    BrowserRouter,
    Router,
    Route,
    Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";

const history = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter>
        <Router history={history}>
            <App>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route  path="/login" component={LoginPage} />
                </Switch>
            </App>
        </Router>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
