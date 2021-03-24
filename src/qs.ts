export function encode(obj: any, prefix?: string): string {
  var pairs = [];
  for (var key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];
    const enkey = encodeURIComponent(key);
    let pair;
    if (typeof value === 'object') {
      pair = encode(value, prefix ? prefix + '[' + enkey + ']' : enkey);
    } else {
      pair =
        (prefix ? prefix + '[' + enkey + ']' : enkey) +
        '=' +
        encodeURIComponent(value);
    }
    pairs.push(pair);
  }
  return pairs.join('&');
}
