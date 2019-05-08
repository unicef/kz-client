/**
 *  get Base URL
 *
 */
export const baseUrl = function () { // eslint-disable-line
  let hostName = window.location.hostname;
  const httpType = window.location.href.split('//')[0];

  if (hostName === 'localhost') {
    hostName = `${hostName}:8080`;
  }

  return `${httpType}//${hostName}`;
};
