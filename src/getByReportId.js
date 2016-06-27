import getCachedReportData from './getCachedReportData';
import addToReportQueue from './addToReportQueue';
import doReportQuery from './reportQuery';


module.exports = (id, noCache) => {
  return getCachedReportData({id:id, noCache:!!noCache})
    //.then(addToReportQueue);
    .then(doReportQuery);
};
