import { AsyncStorage } from 'react-native';

import {smartstore} from 'react.force';

import getCompactLayout from './getCompactLayout';

import cacheCompact from './cacheCompact';

const SOUP_NAME = 'compactLayouts';

const notify = (type, compactLayout) => {
  if(type, compactLayout){
    set(type,compactLayout);
  }
};

const populateCache = ()=>{
  const querySpec = smartstore.buildAllQuerySpec('id', "ascending", 100);

  smartstore.querySoup(
    false,
    SOUP_NAME,
    querySpec,
    (cursor,more,more1)=>{
      const items = cursor.currentPageOrderedEntries;
      console.log('FOUND: ',items);

    },
    (err)=>{
      console.log('ERR: ',err);
    });
};

handleSoup = ()=>{
  console.log('SOUP IS DONE');
},

init = ()=>{
  smartstore.registerSoup(false,
    SOUP_NAME, 
    [ 
      {path:"type", type:"string"}
    ],
    () => {
      populateCache();
      getCompactLayout.addListener(notify);
    }
  );
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
  compactLayout.id = key;
  smartstore.upsertSoupEntries(false, 
      SOUP_NAME, [ compactLayout ],
      (compactLayouts) => {
        console.log('DONE UPSERTING!');
      },
      (err) => {
        console.log('ERROR!');
      });
  return AsyncStorage.setItem(key,JSON.stringify(compactLayout),callback);
};

const getItem = (type,callback)=>{
  const key = getLayoutKey(type);

  console.log('GET');

  smartstore.retrieveSoupEntries(
    false,
    SOUP_NAME,
    [key],
    (entries)=>{
      console.log('FOUND: ',entries);
    },
    (err)=>{
      console.log('ERR: ',err);
    }
  );

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


init();

module.exports = {
  getItem:getItem,
  setItem:setItem,
  set:set
};