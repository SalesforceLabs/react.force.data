import {smartstore} from 'react.force';

import getDefaultLayout from './getDefaultLayout';

import cacheDefault from './cacheDefault';

const PREFIX = 'defaultLayout_';

const SOUP_NAME = PREFIX+'Soup';


const notify = (type, defaultLayout) => {
  if(type, defaultLayout){
    set(type,defaultLayout);
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
        items.forEach((defaultLayout)=>{
          if(defaultLayout.id){
            const type = defaultLayout.id.substring(PREFIX.length);
            if(type){
              cacheDefault.set(type,defaultLayout);
            }
          }
        });
      }

    },
    (err)=>{
      console.log('ERR: ',err);
    });
};

clearAll = ()=>{
  smartstore.clearSoup(false,SOUP_NAME);
};

init = ()=>{
  smartstore.registerSoup(false,
    SOUP_NAME, 
    [ 
      {path:"id", type:"string"}
    ],
    () => {
      populateCache();
      getDefaultLayout.addListener(notify);
    }
  );
};

const set = (type,defaultLayout)=>{
  if(type && defaultLayout){
    setItem(type,defaultLayout);
  }
};

const getLayoutKey = (type)=>{
  return PREFIX+type;
};

const setItem = (type,defaultLayout,callback)=>{
  const key = getLayoutKey(type);
  defaultLayout.id = key;
  smartstore.upsertSoupEntriesWithExternalId(false, 
    SOUP_NAME, [ defaultLayout ],'id',
    (defaultLayouts) => {
      console.log('DONE UPSERTING!');
      if(callback){
        callback(defaultLayouts);
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