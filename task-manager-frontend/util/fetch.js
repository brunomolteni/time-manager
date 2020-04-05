const acceptOnly200 = (response) => {
  if (response.ok) {
    return response.json();
  } else return Promise.reject(response.statusText);
};

const bypass = (res) => res;

const request = (...args) => fetch(...args).then(acceptOnly200);

export const get = (url) => request(url);

export const post = (url, data) =>
  request(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const put = (url, data) =>
  request(url, {
    method: "put",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const del = (url) => request(url, { method: "delete" });
