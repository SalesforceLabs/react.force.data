import reportQueue from './reportQueue';

module.exports = (opts) => {
  return new Promise (
    (resolve, reject) => {
      if(!opts.cachedReportData || opts.nocache){
        reportQueue.add(opts.id);
      } else {
        console.log('skipping: already cached');
      }
      resolve(opts);
    })
}
