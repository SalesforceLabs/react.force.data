import chatterQueue from './chatterQueue';

module.exports = (opts) => {
  return new Promise (
    (resolve, reject) => {
      if(!opts.cachedChatterData || opts.nocache){
        chatterQueue.add(opts.id);
      } else {
        console.log('skipping: already cached');
      }
      resolve(opts);
    })
}
