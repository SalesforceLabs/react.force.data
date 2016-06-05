import queue from './queue';
import cache from './cache';

module.exports = (type,id,nocache)=>{
  if(!!!nocache && !cache.get(id)){
    queue.add(type,id,true);
  }
};