import getCachedSobj from './getCachedSobj';
import getCachedCompactLayout from './getCachedCompactLayout';
import getCompactLayout from './getCompactLayout';
import doCacheCompactLayout from './doCacheCompactLayout';
import getCachedDefaultLayout from './getCachedDefaultLayout';

import addToQueue from './addToQueue';
import getMetaByType from './getMetaByType';

import queue from './queue';

module.exports = (type, id, noCache) => {
  return getCachedSobj({type:type,id:id, noCache:!!noCache})
    .then(getCachedCompactLayout)
    .then(getCompactLayout)
    .then(getCachedDefaultLayout)
    .then(addToQueue)
//    .then(getMetaByType);
};