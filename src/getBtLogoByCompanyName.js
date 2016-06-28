import getCachedBtLogoData from './getCachedBtLogoData';
import addToBtLogoQueue from './addToBtLogoQueue';

module.exports = (id, noCache) => {
  return getCachedBtLogoData({id:id, noCache:!!noCache})
    .then(addToBtLogoQueue);
};
