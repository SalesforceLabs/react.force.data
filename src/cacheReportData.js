// import reportQuery
import query from './reportQuery';

const notify = (id,sobj) => {
  set(sobj);
};

query.addListener(notify);

let cache = {};

const get = (id)=>{
  return cache[id];
};

const set = (sobj)=>{
  let reportId = sobj.attributes.reportId;
  cache[reportId] = sobj;
};

module.exports = {
  get:get,
  set:set
};
