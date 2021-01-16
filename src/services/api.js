import firebase from "firebase";

export const getProducts = async (category) => {
    try {
        return await firebase.database().ref(category).once('value').then((response) => {
            return response.val();
        }).catch((error) => {
            throw new Error(error)
        });

    } catch (error) {
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        return await firebase.database().ref(id).once('value').then((response) => {
            return response.val();
        }).catch((error) => {
            throw new Error(error)
        });

    } catch (error) {
        throw error;
    }
}

export const editProductById = async (product, id) => {
    return await firebase.database().ref(id).update(product).then(function(){
        return 200;
    }).catch(function(error) {
        throw error;
    });
}