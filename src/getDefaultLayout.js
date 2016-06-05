import {forceClient} from 'react.force';

import pull from 'lodash.pull';

const requested = [];

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(opts.cachedDefaultLayout){
        opts.defaultLayout = opts.cachedDefaultLayout;
        resolve(opts);
        return;
      }
      if(requested.indexOf(opts.type)>-1){
        reject(opts);
        return;
      }
      requested.push(opts.type);
      forceClient.defaultLayout(opts.type, 
        (response) => {
          opts.defaultLayout = response;
          pull(requested,opts.type);
          resolve(opts);
        }
      );
    }
  );
};