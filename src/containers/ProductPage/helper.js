export const getLikesByString = (string, id = 0) => {
    let count = 0;
    let isLiked = false;
    if (string) {
        count = string.split(',').length;
        isLiked = string.split(',').includes(id);
    }
    return [count, isLiked];
}

export const addIdToString = (id, string) => {
    let temp_arr = [];
    if(string !== '') {
        temp_arr = string.split(',');
    }
    if(temp_arr.includes(id)) {
        return string;
    }
    temp_arr.push(id);
    return temp_arr.join(',');
}

export const removeIdFromString = (id, string) => {
    let temp_arr = string.split(',');
    let index = temp_arr.indexOf(id);
    if(index != -1) {
        temp_arr.splice(index, 1);
        return temp_arr.join(',');
    }
    return string;
}

export const formatDate = (date) => {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '-' + mm + '-' + yy;
}
