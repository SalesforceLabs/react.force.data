import getCachedReportData from './getCachedReportData';
import doReportQuery from './doReportQuery';

module.exports = (id, noCache) => {
  return getCachedReportData({id:id, noCache:!!noCache})
    .then(doReportQuery);
};
