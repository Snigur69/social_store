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
import {getProductById, editProductById} from "../../services/api";
import {useHistory} from "react-router";
import {getLikesByString, addIdToString, removeIdFromString, formatDate} from './helper';

const ProductPage = (props) => {
    const user = useSelector(state => state.user);
    const history = useHistory();

    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState('');
    // const [likesList, setLikesList] = useState('');
    // const [dislikesList, setDislikesList] = useState('');
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    useEffect(() => {
        getProductById(history.location.pathname.slice(1)).then((response) => {
            setProduct(response);
            if(response.comments) {
                setComments(JSON.parse(response.comments))
            }
            if(user) {
                // setLikesList(response.likes);
                setLike(getLikesByString(response.likes, user.user.uid)[0]);
                setIsLiked(getLikesByString(response.likes, user.user.uid)[1]);
                // setDislikesList(response.dislikes);
                setDislike(getLikesByString(response.dislikes, user.user.uid)[0]);
                setIsDisliked(getLikesByString(response.dislikes, user.user.uid)[1]);
            } else {
                // setLikesList(response.likes);
                setLike(getLikesByString(response.likes)[0]);
                setIsLiked(getLikesByString(response.likes)[1]);
                // setDislikesList(response.dislikes);
                setDislike(getLikesByString(response.dislikes)[0]);
                setIsDisliked(getLikesByString(response.dislikes)[1]);
            }
        }).catch((error) => {
            throw new Error(error);
        })
    }, [isLiked, isDisliked])

    const toggleLike = () => {
        if (isLiked) {
            let likes = removeIdFromString(user.user.uid, product.likes);
            editProductById({likes}, history.location.pathname.slice(1));
        } else {
            let likes = addIdToString(user.user.uid, product.likes);
            editProductById({likes}, history.location.pathname.slice(1));
        }
        setIsLiked(!isLiked);
    }

    const toggleDislike = () => {
        if (isDisliked) {
            let dislikes = removeIdFromString(user.user.uid, product.dislikes);
            editProductById({dislikes}, history.location.pathname.slice(1));
        } else {
            let dislikes = addIdToString(user.user.uid, product.dislikes);
            editProductById({dislikes}, history.location.pathname.slice(1));
        }
        setIsDisliked(!isDisliked);
    }

    const commentHandleChangle = (e) => {
        setComment(e.target.value);
    }

    const addComment = () => {
        let now = new Date();
        let singleComment = {
            id: `comment_${+now}`,
            authorId: user.user.uid,
            author: 'Anton',
            comment: comment, 
            date: formatDate(now)
        }
        let commentsList = [singleComment];
        editProductById({comments: JSON.stringify(commentsList)}, history.location.pathname.slice(1));
        // console.log(JSON.stringify(commentsList));
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
                {
                    comments.length ? (
                        <div className={styles.comments_list}>
                            {comments.map((el, index) => {
                                return <Comment key={index} comment={el} />
                            })}
                        </div>
                    ) : (
                        <></>
                    )
                }
                
                {user && (
                <div className={styles.comment_inputs}>
                    <textarea onChange={commentHandleChangle} value={comment} name="" id="" cols="30" rows="10"></textarea>
                    <Button onClick={addComment} variant="contained" color="primary">Send</Button>
                </div>
                )}
               
            </div>
        </div>
    )
}
export default ProductPage;
