import request from '..';

test('request', () => {
  expect(request._base).toBe('');
  request
    .base('https://example.com')
    .token('token')
    .timeout(200);
  expect(request._base).toBe('https://example.com');
  expect(request._timeout).toBe(200);
  expect(request.getHeaders()).toEqual({
    Authorization: 'Bearer token'
  });
});
