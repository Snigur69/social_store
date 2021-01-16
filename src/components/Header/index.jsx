import React from 'react';
import styles from './style.module.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = ({logOut}) => {
    const user = useSelector(state => state.user);

    return (
        <div className={styles.header}>
            <Link to="/">Catalog</Link>
            {user ? (
                <div>
                    <Link to="/account">{user.user.displayName}</Link>
                    <a href="#" onClick={logOut}>Выйти</a>
                </div>
            ) : (
                <Link to="/login">Sign In</Link>
            )}

        </div>
    )
}

export default Header;