import React from 'react';
import styles from './styles.module.css';

const Comment = ({comment}) => {
    return (
        <div className={styles.comment}>
            <p className={styles.author}>{comment.author}</p>
            <p className={styles.date}>{comment.date}</p>

        <p className={styles.comment_content}>{comment.comment}</p>
        </div>
    )
}

export default Comment;