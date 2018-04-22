export const forEachAsync = (array, fn) =>
  array.reduce((promise, n) => promise.then(() => fn(n)), Promise.resolve());

export const mapAsync = (array, fn) => Promise.all(array.map(fn));

export const filterAsync = (array, fn) =>
  mapAsync(array, fn).then(_arr => array.filter((v, i) => !!_arr[i]));

export const reduceAsync = (array, fn, initial) =>
  Promise.resolve(initial).then(cur =>
    return forEachAsync(array, async (v, i) => {
      cur = await fn(cur, v, i);
    }).then(() => cur));
