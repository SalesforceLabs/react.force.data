import getCachedChatterData from './getCachedChatterData';
import addToChatterQueue from './addToChatterQueue';


module.exports = (id, noCache) => {
  return getCachedChatterData({id:id, noCache:!!noCache})
    .then(addToChatterQueue);
};
