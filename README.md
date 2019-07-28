# request

request

```javascript
import request from '@swiftcarrot/request';

const req = request.timeout(5000).base('https://api.swiftcarrot.com');

req.get('/articles', { page: 1 });
req
  .post('/login', { name: 'test', password: '123' })
  .then(({ token }) => req.token(token));
req.post('/articles', { title: 'test' });
req.delete('/logout').then(() => req.token(null));
```

### License

MIT
