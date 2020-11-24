import { PANEL_DATA_FETCHED, PANEL_USER_DATA_CHANGED } from "./panelActions";
import { APP_CLEAR_USER } from "app/appActions";

export default (state = "", action) => {
  switch (action.type) {
    case PANEL_DATA_FETCHED:
      var userData = Object.assign({}, action.data);
      userData.roles.forEach(role => {
        switch (role.name) {
          case "ROLE_ADMIN":
            userData.isAdmin = true;
            userData.accountType = "ADMIN";
            break;
          case "ROLE_SUPPORT":
            userData.accountType = "SUPPORT";
            break;
          case "ROLE_USER": //TODO: remove this when publisher apis is ready
            userData.accountType = "ADVERTISER";
            break;
          default:
            return
        }
      });
      return Object.assign({}, { loaded: true }, { user: userData });
    case PANEL_USER_DATA_CHANGED:
      return Object.assign({}, state, { user: action.data });
    case APP_CLEAR_USER:
      return { loaded: false };
    default:
      return state;
  }
};
