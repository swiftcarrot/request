import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';
import { TimeoutError } from './errors';

export { encodeQueryString } from 'frontend-fns';

export isFunction from 'lodash/isFunction';

export const timeout = ms => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new TimeoutError('Request timeout')), ms)
  );
};

export const compactParams = params => {
  return pickBy(params, x => !isNil(x));
};
