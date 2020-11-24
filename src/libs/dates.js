import moment from "moment-jalaali";
moment.locale("fa");

export const formatDate = (value, format) => moment(value).format(format);

export const localTimeFull = value => moment(value).format("jYYYY/jM/jD HH:MM");

export const localDate = value => moment(value).format("jYYYY/jM/jD");
