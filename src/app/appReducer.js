import { combineReducers } from "redux";
import panel from "layouts/Panel/panelReducer";
import dashboard from "views/customer/Dashboard/dashboardReducer";
import userProfile from "views/customer/UserProfile/userProfileReducer";

import {
  APP_FETCHING_DATA,
  APP_DATA_FETCHED,
  APP_FETCHING_ERROR,
  APP_REMOVING_ERROR,
  APP_RESET_PASS,
  APP_REMOVE_RESET_PASS_DATA,
  APP_LOGIN,
  APP_LOGOUT
} from "./appActions";

const app = (state = {}, action) => {
  switch (action.type) {
    case APP_FETCHING_DATA:
      return Object.assign({}, state, { loading: true, fetchConts:state.fetchConts ? state.fetchConts +1: 1 });
    case APP_DATA_FETCHED:
      let fetchConts = state.fetchConts ? state.fetchConts - 1: 0;
      return Object.assign({}, state, { loading: fetchConts !== 0,fetchConts : fetchConts });
    case APP_REMOVING_ERROR:
      return Object.assign({}, state, { error: false });
    case APP_RESET_PASS:
      return Object.assign({}, state, { auth: action.data });
    case APP_REMOVE_RESET_PASS_DATA:
      return Object.assign({}, state, { auth: null });
    case APP_FETCHING_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        errorMessage: action.errorMessage || null,
        prevAction: action.prevAction
      });
    case APP_LOGIN:
      return Object.assign({}, state, {
        token: `${action.data.tokenType} ${action.data.accessToken}`
      });
    case APP_LOGOUT:
      return { loading: false };
    default:
      return state;
  }
};

const combinedReducer = combineReducers({
  app,
  dashboard,
  panel,
  userProfile,
});

const rootReducer = (state = {}, action) => {
  if (action.type === APP_LOGOUT) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
