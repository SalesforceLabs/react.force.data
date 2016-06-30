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