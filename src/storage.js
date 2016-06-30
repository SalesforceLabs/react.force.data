/*
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
 
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