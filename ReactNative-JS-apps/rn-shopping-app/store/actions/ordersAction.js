export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import Order from '../../data/models/ordersConstructor';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userID = getState().auth.userID;
        try {
            const response = await fetch(
                `https://rn-shopping-app-a8f13.firebaseio.com/orders/${userID}.json`);

            if (!response.ok) {
                throw new Error('The was an unidentified error')
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)))
            }

            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            //send to custom analytics server
            throw err;
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userID = getState().auth.userID;
        const date = new Date();
        const response = await fetch(`https://rn-shopping-app-a8f13.firebaseio.com/orders/${userID}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    }
}