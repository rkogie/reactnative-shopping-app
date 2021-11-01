import { AsyncStorage } from 'react-native';
import { set } from 'react-native-reanimated';

/* export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN'; */
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

let timer;

export const authenticate = (token, userID, expiryTime) => {
    return dispatch => {
        dispatch(setLogOutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            token: token,
            userID: userID
        })
    }
}

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const errorData = await response.json();
            const errorID = errorData.error.message;
            let message = 'Something went wrong...';

            if (errorID === 'EMAIL_EXISTS') {
                message = 'Email address already in use by another account'
            }

            throw new Error(message);
        }

        const resData = await response.json();
        //console.log(resData);
        dispatch(authenticate(
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn) * 1000));

        //Store session upon app restart
        const sessionExpiry = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000);

        storeLoginData(resData.idToken, resData.localId, sessionExpiry);
    }
}
export const logIn = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const errorData = await response.json();
            const errorID = errorData.error.message;
            let message = 'Something went wrong...';

            if (errorID === 'EMAIL_NOT_FOUND') {
                message = 'Email address not found. Try again or sign up'

            } else if (errorID === 'INVALID_PASSWORD') {
                message = 'Invalid Password. Try again'
            }

            throw new Error(message);
        }

        const resData = await response.json();
        //console.log(resData);
        dispatch(authenticate(
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn) * 1000));

        //Store session upon app restart
        const sessionExpiry = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000);

        storeLoginData(resData.idToken, resData.localId, sessionExpiry);
    }
}

export const logOut = () => {
    clearTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOG_OUT
    }
}

const clearTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}

const setLogOutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut());
        }, expirationTime);
    }
}

const storeLoginData = (token, userID, sessionExpiry) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userID: userID,
            sessionExpiry: sessionExpiry.toISOString()
        }))
}
