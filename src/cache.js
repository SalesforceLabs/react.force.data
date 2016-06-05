import query from './query';

//let CACHE = {};

const notify = (ids,sobjs) => {
  sobjs.forEach((sobj)=>{
    set(sobj);
  });
};

query.addListener(notify);

let cache = {};

const get = (id)=>{
  if(id && id.length>=15){
    const shortId = id.substring(0,15);
    return cache[shortId];
  }
};

const set = (sobj)=>{
  if(sobj && sobj.attributes && sobj.attributes.shortId){
    cache[sobj.attributes.shortId] = sobj;
  }
};

module.exports = {
  get:get,
  set:set
};