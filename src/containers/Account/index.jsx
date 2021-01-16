import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector} from "react-redux";
import {useHistory} from "react-router";

const Account = () => {
    const user = useSelector(state => state.user);
    const history = useHistory();

    useEffect(() => {
        if(!user) {
            history.push('/login');
        }
    }, [user])
    

    return user && (
        <div className={styles.account}>
            <h1>{user.user.displayName}</h1>
            <img src={user.user.photoURL} alt=""/>
        </div>
    )
}

export default Account;