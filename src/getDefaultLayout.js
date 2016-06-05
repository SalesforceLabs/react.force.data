import {forceClient} from 'react.force';

import pull from 'lodash.pull';

const requested = [];

const listeners = [];

const broadcast = (type,defaultLayout)=>{
  listeners.forEach((listener)=>{
    listener(type,defaultLayout);
  });
};

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(opts.cachedDefaultLayout){
        opts.defaultLayout = opts.cachedDefaultLayout;
        resolve(opts);
        return;
      }
      if(requested.indexOf(opts.type)>-1){
        resolve(opts);
        return;
      }
      requested.push(opts.type);
      forceClient.defaultLayout(opts.type, 
        (response) => {
          opts.defaultLayout = response;
          pull(requested,opts.type);
          broadcast(opts.type,opts.defaultLayout);
          resolve(opts);
        }
      );
    }
  );
};

module.exports.addListener = (listener) => {
  listeners.push(listener);
};