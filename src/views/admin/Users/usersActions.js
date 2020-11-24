export const USERS_DATA_FETCHED = "USERS_DATA_FETCHED";

function action(type, data = {}) {
  return { type, ...data };
}

export const usersDataFetched = data => action(USERS_DATA_FETCHED, data);
