export const PANEL_DATA_FETCHED = "PANEL_DATA_FETCHED";
export const PANEL_USER_DATA_CHANGED = "PANEL_USER_DATA_CHANGED";

function action(type, data = {}) {
  return { type, ...data };
}

export const panelDataFetched = data => action(PANEL_DATA_FETCHED, data);
export const panelUserDataChanged = data =>
  action(PANEL_USER_DATA_CHANGED, data);
