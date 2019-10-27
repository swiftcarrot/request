import pickBy from 'lodash/pickBy';

export { encodeQueryString } from 'frontend-fns';

export isFunction from 'lodash/isFunction';

export const timeout = ms => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  );
};

export const compactParams = params => {
  return pickBy(params);
};

