import {forceClient} from 'react.force';
import union from 'lodash.union';
import remove from 'lodash.remove';
import trim from 'lodash.trim';

let queryCount = 0;

const listeners = [];

const broadcast = (reportResponse) => {
  const reportId = response.attributes.reportId;
  listeners.forEach((listener)=>{
    listener(reportId, reportResponse);
  });
}

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(!opts.noCache && opts.cachedReportData ){
        console.log('skipping report request for cached data');
        opts.reportData = opts.cachedReportData;
        resolve(opts);
        return;
      }

      queryCount++;
      forceClient.reportData(opts.id,
        (response)=>{
          broadcast(response);
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
