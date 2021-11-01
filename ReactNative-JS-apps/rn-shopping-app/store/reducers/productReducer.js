import PRODUCTS from '../../data/dummy-data';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/productActions';
import Product from '../../data/models/productConstructor';


const initialState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts,
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerID,
                action.productData.title,
                action.productData.imageURL,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pID);
            const updatedProduct = new Product(
                action.pID,
                state.userProducts[productIndex].ownerID,
                action.productData.title,
                action.productData.imageURL,
                action.productData.description,
                state.userProducts[productIndex].price
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const availableProdIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pID);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProdIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pID
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pID
                )
            };
    }
    return state;
}