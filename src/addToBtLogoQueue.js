import btLogoQueue from './btLogoQueue';

module.exports = (opts) => {
  return new Promise (
    (resolve, reject) => {
      if(!opts.cachedBtLogoData || opts.nocache){
        btLogoQueue.add(opts.id);
      } else {
        console.log('skipping: already cached');
      }
      resolve(opts);
    })
}
