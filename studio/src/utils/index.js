/* eslint-disable import/prefer-default-export */

// export const fetchJSON = (url, options = {}) =>
//   fetch(url, options).then(response => response.json());

export const fetchJSON = (url, options = {}) =>
  new Promise((resolve, reject) =>
    fetch(url, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error)));
