import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'


import Comment from '../../components/Comment/index';
import Button from '@material-ui/core/Button';

import img from '../../assets/img/mac.jpg';
import likeImg from '../../assets/img/like.png';
import dislikeImg from '../../assets/img/disike.png';

import {useSelector} from 'react-redux';
import {getProductById} from "../../services/api";
import {useHistory} from "react-router";
import {getLikesByString} from './helper';

const ProductPage = (props) => {
    const user = useSelector(state => state.user);
    const history = useHistory();

    const [product, setProduct] = useState(null);

    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    useEffect(() => {
        getProductById(history.location.pathname.slice(1)).then((response) => {
            setProduct(response);
            if(user) {
                setLike(getLikesByString(response.likes, user.user.uid)[0]);
                setIsLiked(getLikesByString(response.likes, user.user.uid)[1]);
            } else {
                console.log(getLikesByString(response.likes)[0])
                setLike(getLikesByString(response.likes)[0]);
                setIsLiked(getLikesByString(response.likes)[1]);
            }

        }).catch((error) => {
            throw new Error(error);
        })
    }, [])

    const toggleLike = () => {

        setLike(Number(!like));
    }

    const toggleDislike = () => {
        setDislike(Number(!dislike));
    }

    return product && (
        <div className={styles.wrap}>
            <div className={styles.product_wrap}>
                <div className={styles.image_wrap}>
                    <img src={product.image} alt=""/>
                </div>
                <div className={styles.product_info_wrap}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.description}>{product.description}</p>
                    <h3 className={styles.price}>{product.price}</h3>
                    <div className={styles.likes_wrap}>
                        <div className={styles.likes}>
                            <p>{like}</p>
                            {user ? (
                                <button className={styles[isLiked]} onClick={toggleLike}><FontAwesomeIcon icon={faThumbsUp}/></button>
                            ) : (
                                <button className={styles[isLiked]} disabled onClick={toggleLike}><FontAwesomeIcon icon={faThumbsUp}/></button>
                            )}
                        </div>
                        <div className={styles.dislikes}>
                            <p>{dislike}</p>
                            {user ? (
                                <button className={styles[isDisliked]} onClick={toggleDislike}><FontAwesomeIcon icon={faThumbsDown}/></button>
                            ) : (
                                <button className={styles[isDisliked]} disabled onClick={toggleDislike}><FontAwesomeIcon icon={faThumbsDown}/></button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.comments}>
                <div className={styles.comments_list}>
                    <Comment author={'admin'} content={'Test comment! 100% '} />
                    <Comment author={'admin'} content={'Test comment! 100% '} />
                </div>
                {user && (
                <div className={styles.comment_inputs}>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <Button variant="contained" color="primary">Send</Button>
                </div>
                )}
               
            </div>
        </div>
    )
}
export default ProductPage;
