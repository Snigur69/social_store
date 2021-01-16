export const getLikesByString = (string, id = 0) => {
    let count = 0;
    let isLiked = false;
    if (string) {
        count = string.split(',').length;
        isLiked = string.split(',').includes(id);
    }
    return [count, isLiked];
}
