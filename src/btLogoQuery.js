import {btClient} from 'react.force';
import union from 'lodash.union';
import remove from 'lodash.remove';
import trim from 'lodash.trim';

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
      if(!opts.noCache && opts.cachedBtLogoData ){
        opts.btLogoData = opts.cachedBtLogoData;
        resolve(opts);
        return;
      }

      queryCount++;
      btClient.btLogoBatchRequest(opts.ids, (response)=>{
        if(!response.hasErrors && response.companyLogoResponseItems.length){
          const records = response.companyLogoResponseItems.map((r, index) => {
            let result = r;
            result.id = opts.ids[index];
            return result;
          });
          broadcast(records);
        }
        resolve(opts);
      },
      (error)=>{
        reject('Error: bluetail query');
      })
    }
  );
};

module.exports.addListener = (listener) => {
  listeners.push(listener);
};

module.exports.getQueryCount = () => {
  return queryCount;
};
