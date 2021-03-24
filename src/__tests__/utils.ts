import { compactParams } from '../utils';

test('compactParams', () => {
  expect(compactParams({ a: null, b: 0, c: true, d: 'test' })).toEqual({
    b: 0,
    d: 'test',
    c: true,
  });
});
