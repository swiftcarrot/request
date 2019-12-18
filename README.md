# request

[![npm](https://img.shields.io/npm/v/@swiftcarrot/request.svg)](https://www.npmjs.com/package/@swiftcarrot/request)
[![npm](https://img.shields.io/npm/dm/@swiftcarrot/request.svg)](https://www.npmjs.com/package/@swiftcarrot/request)
[![Build Status](https://travis-ci.org/swiftcarrot/request.svg?branch=master)](https://travis-ci.org/swiftcarrot/request)
[![codecov](https://codecov.io/gh/swiftcarrot/request/branch/master/graph/badge.svg)](https://codecov.io/gh/swiftcarrot/request)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

request

### Usage

```javascript
import Request from '@swiftcarrot/request';

const req = new Request('https://api.example.com/v1').timeout(5000);

req.get('/articles', { page: 1 });
req
  .post('/login', { name: 'test', password: '123' })
  .then(({ token }) => req.token(token));
req.post('/articles', { title: 'test' });
req.delete('/logout').then(() => req.token(null));
```

### onError

```javascript
const request = new Request();

request.onError(err => {
  console.warn(err);
});
```

### add fetch Polyfill

```javascript
// yarn add cross-fetch
import 'cross-fetch/polyfill';
```

### License

MIT
