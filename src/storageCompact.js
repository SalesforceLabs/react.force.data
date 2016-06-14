import {smartstore} from 'react.force';

import getCompactLayout from './getCompactLayout';

import cacheCompact from './cacheCompact';

const PREFIX = 'compactLayout_';

const SOUP_NAME = PREFIX+'Soup';

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
    (cursor)=>{
      const items = cursor.currentPageOrderedEntries;
      if(items && items.length){
        items.forEach((compactLayout)=>{
          if(compactLayout.id){
            const type = compactLayout.id.substring(PREFIX.length);
            if(type){
              cacheCompact.set(type,compactLayout);
            }
          }
        });
      }

    },
    (err)=>{
      console.log('ERR: ',err);
    });
};

init = ()=>{
  smartstore.registerSoup(false,
    SOUP_NAME, 
    [ 
      {path:"id", type:"string"}
    ],
    () => {
      populateCache();
      getCompactLayout.addListener(notify);
    }
  );
};

clearAll = ()=>{
  smartstore.clearSoup(false,SOUP_NAME);
};

const set = (type,compactLayout)=>{
  if(type && compactLayout){
    setItem(type,compactLayout);
  }
};

const getLayoutKey = (type)=>{
  return PREFIX+type;
};

const setItem = (type,compactLayout,callback)=>{
  const key = getLayoutKey(type);
  compactLayout.id = key;
  smartstore.upsertSoupEntriesWithExternalId(false, 
    SOUP_NAME, [ compactLayout ],'id',
    (compactLayouts) => {
      console.log('DONE UPSERTING!');
      if(callback){
        callback(compactLayouts);
      }
    },
    (err) => {
      console.log('ERROR!');
      if(callback){
        callback();
      }
    }
  );
};


init();

module.exports = {
  set:set,
  clearAll:clearAll
};