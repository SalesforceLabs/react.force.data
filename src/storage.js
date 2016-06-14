import {smartstore} from 'react.force';

import query from './query';

import cache from './cache';

const PREFIX = 'sobj_';

const SOUP_NAME = PREFIX+'Soup';

const externalID = '__shortId';

const notify = (ids,sobjs) => {
  sobjs.forEach((sobj)=>{
    set(sobj);
  });
};

const populateCache = ()=>{
  const querySpec = smartstore.buildAllQuerySpec('__shortId', "ascending", 100);

  smartstore.querySoup(
    false,
    SOUP_NAME,
    querySpec,
    (cursor)=>{
      const items = cursor.currentPageOrderedEntries;
      if(items && items.length){
        items.forEach((sobj)=>{
          if(sobj.attributes && sobj.attributes.shortId){
            cache.set(sobj);
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
      {path:externalID, type:"string"}
    ],
    () => {
      populateCache();
      query.addListener(notify);
    }
  );
};

clearAll = ()=>{
  smartstore.clearSoup(false,SOUP_NAME);
};

set = (sobj, callback)=>{
  if(sobj && sobj.attributes && sobj.attributes.shortId){
    sobj[externalID] = sobj.attributes.shortId;
    smartstore.upsertSoupEntriesWithExternalId(false, 
      SOUP_NAME, [ sobj ],externalID,
      (sobjs) => {
        console.log('DONE UPSERTING!');
        if(callback){
          callback(sobjs);
        }
      },
      (err) => {
        console.log('ERROR!');
        if(callback){
          callback();
        }
      }
    );
  }
};


init();

module.exports = {
  set:set,
  clearAll:clearAll
};