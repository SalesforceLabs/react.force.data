import getCachedSobj from './getCachedSobj';
import getCachedCompactLayout from './getCachedCompactLayout';
import getCachedDefaultLayout from './getCachedDefaultLayout';

import addToQueue from './addToQueue';
import getMetaByType from './getMetaByType';

import queue from './queue';

module.exports = (type, id, noCache) => {
  return getCachedSobj({type:type,id:id, noCache:!!noCache})
    .then(getCachedCompactLayout)
    .then(getCachedDefaultLayout)
    .then(addToQueue)
//    .then(getMetaByType);
};