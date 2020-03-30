const fetchFn = typeof window !== "undefined" ? fetch : require("node-fetch");

const acceptOnly200 = res => {
  if (res.status !== 200) {
    // make the promise be rejected if we didn't get a 200 response
    throw new Error(res.status);
  } else return res.json();
};

export const get = url => {
  return fetchFn(url).then(acceptOnly200);
};

export const post = (url, data) => {
  return fetchFn(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then(acceptOnly200);
};
