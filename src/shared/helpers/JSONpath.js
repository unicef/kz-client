/**
 *  get data from json files with some static data
 *  from "static/data" folder
 *
 */
export const JSONpath = function () { // eslint-disable-line
  let hostName = window.location.hostname;
  const httpType = window.location.href.split('//')[0];

  if (hostName === 'localhost') {
    hostName = `${hostName}:8080`;
  }

  return `${httpType}//${hostName}/static/data`;
};
