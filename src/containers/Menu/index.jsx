import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMagic } from '@fortawesome/free-solid-svg-icons';

import "./index.scss";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActive: 'home',
            dataMenu: [
                {
                    name: 'home',
                    text: 'Home',
                    link: '/',
                    icons: faCoffee
                },
                {
                    name: 'wizard',
                    text: 'Wizard',
                    link: '/wizard',
                    icons: faMagic
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
                                            <i><FontAwesomeIcon icon={value.icons} /></i>
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