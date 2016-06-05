import {forceClient} from 'react.force';

import pull from 'lodash.pull';

const requested = [];

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
        reject(opts);
        return;
      }
      requested.push(opts.type);
      forceClient.compactLayout(opts.type, 
        (response) => {
          opts.compactLayout = response;
          pull(requested,opts.type);
          resolve(opts);
        }
      );
    }
  );
};