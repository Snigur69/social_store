import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useHistory} from "react-router";
import ProductCard from "../../components/ProductCard";
import firebase from 'firebase/app'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {getProducts} from "../../services/api";
import {productsTransform} from "./helper";

const CategoryPage = () => {
    const history = useHistory();
    const [products, setProducts] = useState();

    useEffect( () =>  {
        getProducts(history.location.pathname.slice(1)).then((response) => {
            setProducts(productsTransform(response));
        }).catch((error) => {
            throw new Error(error)
        });
    }, [])

    return(
        <div className={styles.category_page}>
            <h1>CategoryPage</h1>
            <h2>{history.location.pathname.slice(1)}</h2>
            <div className={styles.products_wrap}>

                {products && (
                    products.map((el, index) => {
                        return (
                            <Link key={index} to={`${history.location.pathname}/${el.id}`} className={styles.product}>
                                <ProductCard image={el.image} name={el.name} />
                            </Link>
                        )
                    })
                )}
                {/*<Link to={`${history.location.pathname}/product1`} className={styles.product}>*/}
                {/*    <ProductCard />*/}
                {/*</Link>*/}

                {/*<Link to={`${history.location.pathname}/product2`} className={styles.product}>*/}
                {/*    <ProductCard />*/}
                {/*</Link>*/}

                {/*<Link to={`${history.location.pathname}/product3`} className={styles.product}>*/}
                {/*    <ProductCard />*/}
                {/*</Link>*/}

                {/*<Link to={`${history.location.pathname}/product4`} className={styles.product}>*/}
                {/*    <ProductCard />*/}
                {/*</Link>*/}
            </div>
        </div>
    )
}

export default CategoryPage;