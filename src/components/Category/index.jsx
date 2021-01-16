import React from 'react';
import styles from './styles.module.css';
import {Link} from "react-router-dom";

const Category = ({title, image, link}) => {
    return(
        <Link to={link} className={styles.category_link}>
            <div className={styles.category}>
                <div className={styles.image_wrap}>
                    <img src={image} alt=""/>
                </div>
                <p className={styles.title}>{title}</p>
            </div>
        </Link>
    )
}

export default Category;