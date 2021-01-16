import React from 'react';
import styles from './styles.module.css';
import Category from "../../components/Category";

import iphone from '../../assets/img/iphone12.jpg';
import iwatch from '../../assets/img/iwatch.jpg';
import macbook from '../../assets/img/macbook.jpg';
import mac from '../../assets/img/mac.jpg';
import airpods from '../../assets/img/airpods.jpeg';
import ipad from '../../assets/img/ipad.webp';

const Catalog = () => {
    return(
        <div className={styles.catalog}>
            <Category title="iPhone" image={iphone} link='iphones' />
            <Category title="iWatch" image={iwatch} link='iwatches' />
            <Category title="MacBook" image={macbook} link='macbooks' />
            <Category title="Mac" image={mac} link='macs' />
            <Category title="AirPods" image={airpods} link='airpods' />
            <Category title="iPad" image={ipad} link='ipads' />
        </div>
    )
}

export default Catalog;