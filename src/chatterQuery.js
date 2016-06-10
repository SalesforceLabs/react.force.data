import {forceClient} from 'react.force';
import union from 'lodash.union';
import remove from 'lodash.remove';
import trim from 'lodash.trim';

import utils from './utils';

let queryCount = 0;

const listeners = [];

const broadcast = (records) => {
  const ids = records.map((record)=>{
    return record.id;
  });
  listeners.forEach((listener)=>{
    listener(ids, records);
  });
}

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(!opts.noCache && opts.cachedChatterData ){
        opts.chatterData = opts.cachedChatterData;
        resolve(opts);
        return;
      }

      queryCount++;
      forceClient.bulkChatterUserPics(opts.ids,
        (response)=>{
          if(!response.hasErrors && response.results.length){
            const records = response.results.map((r, index) => {
              let result = r.result;
              result.id = opts.ids[index];
              return result;
            });
            broadcast(records);
          }
          resolve(opts);
        },
        (error) => {
        reject('Error: query');
        }
      );
    }
  );
};

module.exports.addListener = (listener) => {
  listeners.push(listener);
};

module.exports.getQueryCount = () => {
  return queryCount;
};
