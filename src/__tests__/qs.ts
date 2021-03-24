import { encode } from '../qs';

test('encode', () => {
  expect(encode({ a: 12 })).toBe('a=12');
});
