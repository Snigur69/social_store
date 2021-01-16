import React from 'react';
import styles from './styles.module.css';

const Comment = ({author, content}) => {
    return (
        <div className={styles.comment}>
            <p className={styles.author}>{author}</p>
        <p className={styles.comment_content}>{content}</p>
        </div>
    )
}

export default Comment;