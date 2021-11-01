import { AUTHENTICATE, LOG_OUT } from "../actions/authAction";

const initialState = {
    token: null,
    userID: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userID: action.userID
            }
        /*    case SIGN_UP:
               return {
                   token: action.token,
                   userID: action.userID
               } */
        case LOG_OUT:
            return initialState;

        default:
            return state;
    }
}