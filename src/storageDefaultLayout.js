import { AsyncStorage } from 'react-native';

import getDefaultLayout from './getDefaultLayout';


import cacheDefault from './cacheDefault';

const PREFIX = 'defaultLayout_';

const notify = (type, defaultLayout) => {
  if(type, defaultLayout){
    set(type,defaultLayout);
  }
};

const populateCache = ()=>{
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.forEach((result, i, store) => {
        const key = store[i][0];
        if(key && key.indexOf(PREFIX)===0){
          const defaultLayout = JSON.parse(store[i][1]);
          const type = key.substring(PREFIX.length);
          if(defaultLayout && type && type.length){
            cacheDefault.set(type,defaultLayout);
          }
        }
      });
    });

  });
};

const set = (type,defaultLayout)=>{
  if(type && defaultLayout){
    setItem(type,defaultLayout);
  }
};

const getLayoutKey = (type)=>{
  return PREFIX+type;
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
      const defaultLayout = JSON.parse(result);
      return callback(defaultLayout);
    }
  });
};

populateCache();
getDefaultLayout.addListener(notify);

module.exports = {
  getItem:getItem,
  setItem:setItem,
  set:set
};