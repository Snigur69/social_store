import React from 'react';
import styles from './styles.module.css';

import img from '../../assets/img/airpods.jpeg';

const ProductCard = ({image, name}) => {
    return(
        <div className={styles.product_card}>
            <img src={image} alt=""/>
            <p className={styles.title}>{name}</p>
        </div>
    )
}
export default ProductCard;