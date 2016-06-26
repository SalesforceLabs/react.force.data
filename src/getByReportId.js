import getCachedReportData from './getCachedReportData';
import doReportQuery from './reportQuery';

module.exports = (id, noCache) => {
  return getCachedReportData({id:id, noCache:!!noCache})
    .then(doReportQuery);
};
