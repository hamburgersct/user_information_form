const URL = "https://frontend-take-home.fetchrewards.com/form";
const STATUS_OK = 201;

// GET request
async function getData(url) {
  const res = await fetch(url, { method: "GET" });
  return res.json();
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

export { URL, STATUS_OK, getData, postData };
