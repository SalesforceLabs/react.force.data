// import reportQuery
import query from './reportQuery';

//let CACHE = {};

const notify = (id,sobjs) => {
  for (var sobj in sobjs) {
  	set(sobj);
  }
  //set(sobj);
  /*sobjs.forEach((sobj)=>{
    set(sobj);
  });*/
};

query.addListener(notify);

let cache = {};

const get = (id)=>{
  return cache[id];
};

const set = (sobj)=>{
  cache[sobj.Id] = sobj;
};

module.exports = {
  get:get,
  set:set
};
