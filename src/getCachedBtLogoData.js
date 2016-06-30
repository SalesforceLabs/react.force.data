import cacheBtLogoData from './cacheBtLogoData';

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      const id = opts.id;
      const item = cacheBtLogoData.get(id);
      opts.cachedBtLogoData = item;
      resolve(opts);
    })
}
