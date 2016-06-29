import cacheReportData from './cacheReportData';

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      const id = opts.id;
      const item = cacheReportData.get(id);
      opts.cachedReportData = item;
      debugger;
      resolve(opts);
    })
}
