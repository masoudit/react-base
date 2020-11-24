export const APP_INVOKE_API = "APP_INVOKE_API";
export const APP_FETCHING_DATA = "APP_FETCHING_DATA";
export const APP_DATA_FETCHED = "APP_DATA_FETCHED";
export const APP_FETCHING_ERROR = "APP_FETCHING_ERROR";

export const APP_LOGIN = "APP_LOGIN";
export const APP_LOGOUT = "APP_LOGOUT";
export const APP_CLEAR_USER = "APP_CLEAR_USER";
export const APP_REMOVING_ERROR = "APP_REMOVING_ERROR";

export const APP_RESET_PASS = "APP_RESET_PASS";
export const APP_REMOVE_RESET_PASS_DATA = "APP_RESET_PASS";

function action(type, data = {}) {
  return { type, ...data };
}

export const invokeAPI = options => action(APP_INVOKE_API, options);
export const fetchingData = () => action(APP_FETCHING_DATA);
export const dataFethed = () => action(APP_DATA_FETCHED);
export const fetchingError = retry => action(APP_FETCHING_ERROR, retry);
export const removeError = () => action(APP_REMOVING_ERRORVING_ERROR);

export const appLogin = data => action(APP_LOGIN, data);
export const appLogout = () => action(APP_LOGOUT);

export const appResetPass = data => action(APP_RESET_PASS, data);
export const removeResetData = () => action(APP_REMOVE_RESET_PASS_DATA);
