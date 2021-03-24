import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';
import { TimeoutError } from './errors';

export const timeout = (ms: number) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new TimeoutError('Request timeout')), ms)
  );
};

export const compactParams = (params: any) => {
  return pickBy(params, (x) => !isNil(x));
};
