import {forceClient} from 'react.force';

import pull from 'lodash.pull';

const requested = [];

const listeners = [];

const broadcast = (type,compactLayout)=>{
  listeners.forEach((listener)=>{
    listener(type,compactLayout);
  });
};

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(opts.cachedCompactLayout){
        opts.compactLayout = opts.cachedCompactLayout;
        resolve(opts);
        return;
      }
      if(opts.type === 'Group'){
        console.log('GROUP: OPTS: ',opts);
        resolve(opts);
        return;
      }
      if(requested.indexOf(opts.type)>-1){
        resolve(opts);
        return;
      }
      requested.push(opts.type);
      forceClient.compactLayout(opts.type, 
        (response) => {
          opts.compactLayout = response;
          pull(requested,opts.type);
          broadcast(opts.type,opts.compactLayout);
          resolve(opts);
        }
      );
    }
  );
};

module.exports.addListener = (listener) => {
  listeners.push(listener);
};