import React from "react";

import { Link } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActive: 'home',
            dataMenu: [
                {
                    name: 'home',
                    text: 'Home',
                    link: '/'
                },
                {
                    name: 'login',
                    text: 'Login',
                    link: '/login'
                }
            ]                  
        }
    }

    render() {
        let { dataMenu, menuActive } = this.state;
        return (
            <div className="wrapper_menu">
                <div className="content_menu">
                    <ul className="list_menu">
                        {
                            dataMenu.map((value, key) => {
                                let pathName = window.location.pathname;
                                return (
                                    <li key={key} className={`item_menu`}>
                                        <Link to={value.link} className={`link_menu ${pathName === value.link ? 'active' : ''}`} >
                                            <span className="text_menu">{value.text}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


export default Menu;