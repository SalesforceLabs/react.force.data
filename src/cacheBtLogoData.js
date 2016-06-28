import query from './btLogoQuery';

const notify = (companyName,blueTailBlobs) => {
  blueTailBlobs.forEach((blueTailBlob)=>{
    set(blueTailBlob, companyName);
  });
};

query.addListener(notify);

let cache = {};

const get = (companyName)=>{
  return cache[companyName];
};

const set = (blueTailBlob, companyName)=>{
  cache[companyName] = blueTailBlob;
};

module.exports = {
  get:get,
  set:set
};
