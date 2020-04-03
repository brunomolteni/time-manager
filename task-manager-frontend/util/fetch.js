const fetchFn = typeof window !== "undefined" ? fetch : require("node-fetch");

const acceptOnly200 = (res) => {
  if (res.status !== 200) {
    // make the promise be rejected if we didn't get a 200 response
    throw new Error(res.status);
  } else return res.json();
};

export const get = (url) => {
  return fetchFn(url).then((res) => res.json());
};

export const post = (url, data) => {
  return fetchFn(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

export const put = (url, data) => {
  return fetchFn(url, {
    method: "put",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

export const del = (url) => {
  return fetchFn(url, {
    method: "delete",
  }).then((res) => res.json());
};
