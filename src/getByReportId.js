import getCachedReportData from './getCachedReportData';
import doReportQuery from './reportQuery';
import addToReportQueue from './addToReportQueue';


module.exports = (id, noCache) => {
  return getCachedReportData({id:id, noCache:!!noCache})
    //.then(doReportQuery);
    .then(addToReportQueue);
};
