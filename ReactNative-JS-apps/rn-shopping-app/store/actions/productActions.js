export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
import Product from '../../data/models/productConstructor';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        //console.log(getState());
        const userID = getState().auth.userID;

        try {
            const response = await fetch(`https://rn-shopping-app-a8f13.firebaseio.com/products.json`);

            if (!response.ok) {
                throw new Error('The was an unidentified error')
            }

            const resData = await response.json();

            //console.log(resData);
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    resData[key].ownerID,
                    resData[key].title,
                    resData[key].imageURL,
                    resData[key].description,
                    resData[key].price))
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerID === userID)
            });
        } catch (err) {
            //send to custom analytics server
            throw err;
        }
    }
}

export const deleteProduct = productID => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        //http request string with 'backticks to allow dynamic data injection' 
        //DO NOT copy paste this string as regular network request protocols
        const response = await fetch(`https://rn-shopping-app-a8f13.firebaseio.com/products/${productID}.json?auth=${token}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('An error occured');
        }

        dispatch({ type: DELETE_PRODUCT, pID: productID });
    }
}

export const createProduct = (title, description, imageURL, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userID = getState().auth.userID;
        const response = await fetch(`https://rn-shopping-app-a8f13.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, description, imageURL, price, ownerID: userID
            })
        });

        const resData = await response.json();
        //console.log(resData);

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageURL,
                price,
                ownerID: userID
            }
        })
    };
}
export const updateProduct = (id, title, description, imageURL) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        console.log(getState());
        //http request string with 'backticks to allow dynamic data injection' 
        //DO NOT copy paste this string as regular network request protocols
        const response = await fetch(`https://rn-shopping-app-a8f13.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, description, imageURL
            })
        });

        if (!response.ok) {
            throw new Error('An error occured');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pID: id,
            productData: {
                id,
                title,
                description,
                imageURL,
            }
        })
    };

}