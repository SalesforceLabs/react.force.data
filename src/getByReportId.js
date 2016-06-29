import getCachedReportData from './getCachedReportData';
import addToReportQueue from './addToReportQueue';


module.exports = (id, noCache) => {
  return getCachedReportData({id:id, noCache:!!noCache})
    .then(addToReportQueue);
};
