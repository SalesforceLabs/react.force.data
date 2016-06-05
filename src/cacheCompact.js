import getCompactLayout from './getCompactLayout';

const notify = (type, compactLayout) => {
  if(type, compactLayout){
    set(type,compactLayout);
  }
};


let cache = {};

const get = (type)=>{
  return cache[type];
};

const set = (type, compactLayout)=>{
  cache[type] = compactLayout;
};

getCompactLayout.addListener(notify);

module.exports = {
  get:get,
  set:set
};