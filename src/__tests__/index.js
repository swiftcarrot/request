import { Request } from '..';

test('base', () => {
  const req = new Request();
  expect(req._base).toBe('');
  req.base('https://example.com').timeout(200);
  expect(req._base).toBe('https://example.com');
  expect(req._timeout).toBe(200);
});

test('token', () => {
  const req = new Request();
  req.token('1');

  expect(req.getHeaders()).toEqual({
    Authorization: 'Bearer 1'
  });

  req.token(() => '2');
  expect(req.getHeaders()).toEqual({
    Authorization: 'Bearer 2'
  });
});

test('headers', () => {
  const req = new Request();
  req.headers(() => ({
    locale: 'zh'
  }));

  expect(req.getHeaders()).toEqual({
    locale: 'zh'
  });

  req.headers({ locale: 'en' });
  expect(req.getHeaders()).toEqual({
    locale: 'en'
  });
});
