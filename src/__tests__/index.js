import request from '..';

test('base', () => {
  expect(request._base).toBe('');
  request.base('https://example.com');
  expect(request._base).toBe('https://example.com');
});
