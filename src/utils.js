export const timeout = ms => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  );
};
