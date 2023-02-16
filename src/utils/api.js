const URL = "https://frontend-take-home.fetchrewards.com/form";

// GET request
async function getData(url) {
  const res = await fetch(url, { method: "GET" });
  // check network error
  return res;
}

// POST request
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
}

export { URL, getData, postData };
