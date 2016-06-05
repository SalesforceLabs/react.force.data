import { AsyncStorage } from 'react-native';

import query from './query';

const notify = (ids,sobjs) => {
  sobjs.forEach((sobj)=>{
    set(sobj);
  });
};

query.addListener(notify);

set = (sobj)=>{
  if(sobj && sobj.attributes && sobj.attributes.shortId){
    setItem(sobj.attributes.shortId,sobj);
  }
};

getShotId = (id)=>{
  if(id && id.length>=15){
    return id.substring(0,15);
  }
};

setItem = (id,sobj,callback)=>{
  const shortId = getShotId(id);
  return AsyncStorage.setItem(shortId,sobj,callback);
};

getItem = (id,callback)=>{
  const shortId = getShotId(id);
  return AsyncStorage.getItem(shortId,callback);
};

module.exports = {
  getItem:getItem,
  setItem:setItem,
  set:set
};