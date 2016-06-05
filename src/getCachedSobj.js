import { AsyncStorage } from 'react-native';

import cache from './cache';

import storage from './storage';

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      const id = opts.id;
      const item = cache.get(id);
      if(item){
        opts.cachedSobj = item;
        resolve(opts);
        return;
      }

      storage.getItem(id, (item)=>{
        if(item){
          opts.cachedSobj = item;
          resolve(opts);
        }
      });
/*
      AsyncStorage.getItem(id, (err, item)=>{
        opts.cachedSobj = JSON.parse(item);
        resolve(opts);
      });
*/
    }
  );
};