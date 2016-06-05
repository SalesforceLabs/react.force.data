import { AsyncStorage } from 'react-native';

import query from './query';

import cache from './cache';


const notify = (ids,sobjs) => {
  sobjs.forEach((sobj)=>{
    set(sobj);
  });
};

const populateCache = ()=>{
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.forEach((result, i, store) => {
        const sobj = JSON.parse(store[i][1]);
        cache.set(sobj);
      });
    });

  });
};

const set = (sobj)=>{
  if(sobj && sobj.attributes && sobj.attributes.shortId){
    setItem(sobj.attributes.shortId,sobj);
  }
};

const getShotId = (id)=>{
  if(id && id.length>=15){
    return id.substring(0,15);
  }
};

const setItem = (id,sobj,callback)=>{
  const shortId = getShotId(id);
  return AsyncStorage.setItem(shortId,JSON.stringify(sobj),callback);
};

const getItem = (id,callback)=>{
  const shortId = getShotId(id);
  return AsyncStorage.getItem(shortId,(err, result)=>{
    if(callback){
      if(err || !result){
        return callback();
      }
      const sobj = JSON.parse(result);
      return callback(sobj);
    }
  });
};

populateCache();
query.addListener(notify);

module.exports = {
  getItem:getItem,
  setItem:setItem,
  set:set
};