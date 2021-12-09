# request

[![npm](https://img.shields.io/npm/v/@swiftcarrot/request.svg)](https://www.npmjs.com/package/@swiftcarrot/request)
[![npm](https://img.shields.io/npm/dm/@swiftcarrot/request.svg)](https://www.npmjs.com/package/@swiftcarrot/request)
[![Build Status](https://travis-ci.org/swiftcarrot/request.svg?branch=master)](https://travis-ci.org/swiftcarrot/request)
[![codecov](https://codecov.io/gh/swiftcarrot/request/branch/master/graph/badge.svg)](https://codecov.io/gh/swiftcarrot/request)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

request

### Usage

```javascript
import Request from "@swiftcarrot/request";

const request = new Request("https://api.example.com/v1")
  .timeout(5000)
  .bearerToken(() => {
    token: window.localStorage.getItem("token");
  });

request.get("/articles", { json: { page: 1 } });
request
  .post("/login", { json: { name: "test", password: "123" } })
  .then(({ json }) => {
    window.localStorage.setItem("token", json.token);
  });
request.post("/articles", { json: { title: "test" } });
request.delete("/logout").then(() => {
  window.localStoarge.removeItem("token");
  request.bearerToken(null);
});
```

### JSON request

```javascript
import Request from "@swiftcarrot/request";

const request = new Request("/api/v1");

request.get("/articles", { json: { page: 1 } }).then((resp) => {
  console.log(resp.json);
});
```

### Custom headers

```javascript
request.headers({
  "content-type": "application/json",
});

request.headers(() => ({
  "content-type": "application/json",
}));
```

### Authentication with bearer token

```javascript
import Request from "@swiftcarrot/request";

const request = new Request("/api").bearerToken({
  token: "<token>",
  prefix: "Bearer",
});

const request = new Request("/api").bearerToken(() => ({
  token: window.localStorage.getItem("token"),
  prefix: "Bearer",
}));
```

### Error handling

```javascript
const request = new Request("/api");
```

### add fetch Polyfill

```javascript
// yarn add cross-fetch
import "cross-fetch/polyfill";
```

### License

MIT
