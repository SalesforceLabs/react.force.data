// import reportQuery
import query from './reportQuery';

const notify = (id,sobjs) => {
  //store report in cache
  for (var sobj in sobjs) {
  	set(sobj);
  }
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
