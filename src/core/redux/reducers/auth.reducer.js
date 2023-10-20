/* eslint-disable prettier/prettier */
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../types";

const initialState = {
    user: null,
};

export default function rootReducer(state = initialState, action) {
    // console.log(action);
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
        case LOGIN_SUCCESS:
            return { ...state, user: payload };
        case LOGIN_FAILURE:
            return { ...state, user: null };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}