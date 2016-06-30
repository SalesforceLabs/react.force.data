import reportQuery from './reportQuery';

module.exports = (opts) => {
  return new Promise (
    (resolve, reject) => {
      if(!opts.cachedReportData || opts.nocache){
        reportQuery({id:opts.id})
      } else {
        console.log('skipping: already cached');
      }
      resolve(opts);
    })
}
