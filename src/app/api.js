import axios from "axios";
import { get } from "config";
const configs = get();
const API_ADDRESS = configs.API;

export const invokeAPI = options => {
  // TODO : remove this
  if (options.path === "dashboard") {
    return { dashboardData: "nothing" };
  }

  return axios({
    method: options.method || "POST",
    url: API_ADDRESS + options.path,
    data: options.params,
    headers: {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      Authorization: options.token
      // 'Cache-Control': 'no-cache'
    }
  });
};
