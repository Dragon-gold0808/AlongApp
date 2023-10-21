import {
  INITIALSTATE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_PRE,
  LOGIN_UPDATE_SUCCESS,
  DRIVER_UPDATE_SUCCESS,
  DRIVER_UPDATE_STATE,
  DRIVER_OUT,
} from '../types';

const initialState = {
  isAutherized: false,
  user: null,
  driver: {
    driverEnabled: true,
  },
  initialState: true,
};

export default function rootReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case INITIALSTATE:
      return {...state, initialState: false};
    case LOGIN_SUCCESS:
      return {...state, isAutherized: true, user: payload};
    case LOGIN_FAILURE:
      return {...state, isAutherized: false, user: null};
    case LOGOUT:
      return {...state, isAutherized: false, user: null};
    case REGISTER_PRE:
      return {...state, user: payload};
    case LOGIN_UPDATE_SUCCESS:
      return {...state, user: payload};
    case DRIVER_UPDATE_SUCCESS:
      return {...state, driver: payload};
    case DRIVER_UPDATE_STATE:
      return {...state, driver: {...state.driver, driverEnabled: payload}};
    case DRIVER_OUT:
      return {...state, driver: null};
    default:
      return state;
  }
}
