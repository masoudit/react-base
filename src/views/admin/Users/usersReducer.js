import { USERS_DATA_FETCHED } from "./usersActions";

//NOTE: add this to "app/appReducer"
export default (state = "", action) => {
  switch (action.type) {
    case USERS_DATA_FETCHED:
      return Object.assign({}, { loaded: true }, action.data);
    default:
      return state;
  }
};
