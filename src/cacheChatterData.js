import query from './chatterQuery';

const notify = (ids,chatterObjs) => {
  chatterObjs.forEach((chatterObj)=>{
    set(chatterObj);
  });
};

query.addListener(notify);

let cache = {};

const get = (id)=>{
  return cache[id];
};

const set = (chatterObj)=>{
  cache[chatterObj.id] = chatterObj;
};

module.exports = {
  get:get,
  set:set
};
