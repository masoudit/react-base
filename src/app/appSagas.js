import { takeEvery, put, fork, all, call, select } from "redux-saga/effects";
import { isArray } from "lodash";
import { invokeAPI } from "./api";
import { clearUserToken, setUserToken } from "libs/userToken";
import {
  APP_INVOKE_API,
  APP_LOGOUT,
  APP_LOGIN,
  fetchingData,
  dataFethed,
  fetchingError
} from "./appActions";

export function* invokingAPI(action) {
  const { done, error, ...apiOptions } = action;
  try {
    apiOptions.token = yield select(state => state.app.token);
    // if (!token) {
    //   yield put(appClearUser());
    // } else {
    yield put(fetchingData());
    const data = yield call(invokeAPI, apiOptions);
    yield put(dataFethed());
    if (done) {
      if (isArray(done)) {
        for (var doneItem of done) {
          yield put(doneItem({ data: data.data }));
        }
      } else {
        yield put(done({ data: data.data }));
      }
    }
    // }
  } catch (e) {
    //TODO : check for 403 unauthorize and then: yield put(appClearUser());
    const r = "response" in e && e.response;
    const message = r && r.data && r.data.message;
    if (error) {
      yield put(error({ error }));
    } else {
      yield put(fetchingError({ prevAction: action, errorMessage: message }));
    }
  }
}

export function* logout() {
  yield clearUserToken();
}

export function* login(action) {
  yield setUserToken(`${action.data.tokenType} ${action.data.accessToken}`);
}

export function* loginWatcher() {
  yield takeEvery(APP_LOGIN, login);
}

export function* logoutWatcher() {
  yield takeEvery(APP_LOGOUT, logout);
}

export function* watchAPIInvoke() {
  yield takeEvery(APP_INVOKE_API, invokingAPI);
}

export default function* root() {
  yield all([fork(watchAPIInvoke), fork(logoutWatcher), fork(loginWatcher)]);
}
