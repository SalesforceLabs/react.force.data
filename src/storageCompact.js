import { AsyncStorage } from 'react-native';

import getCompactLayout from './getCompactLayout';


import cacheCompact from './cacheCompact';

const notify = (type, compactLayout) => {
  if(type, compactLayout){
    set(type,compactLayout);
  }
};

const populateCache = ()=>{
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.forEach((result, i, store) => {
        const key = store[i][0];
        if(key && key.indexOf('compactLayout_')===0){
          const compact = JSON.parse(store[i][1]);
          if(compact && compact.objectType){
            cacheCompact.set(compact.objectType,compact);
          }
        }
      });
    });

  });
};

const set = (type,compactLayout)=>{
  if(type && compactLayout){
    setItem(type,compactLayout);
  }
};

const getLayoutKey = (type)=>{
  return 'compactLayout_'+type;
};

const setItem = (type,compactLayout,callback)=>{
  const key = getLayoutKey(type);
  return AsyncStorage.setItem(key,JSON.stringify(compactLayout),callback);
};

const getItem = (type,callback)=>{
  const key = getLayoutKey(type);
  return AsyncStorage.getItem(key,(err, result)=>{
    if(callback){
      if(err || !result){
        return callback();
      }
      const compactLayout = JSON.parse(result);
      return callback(compactLayout);
    }
  });
};

populateCache();
getCompactLayout.addListener(notify);

module.exports = {
  getItem:getItem,
  setItem:setItem,
  set:set
};