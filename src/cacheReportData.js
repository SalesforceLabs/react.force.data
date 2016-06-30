// import reportQuery
import query from './reportQuery';

const notify = (id,report) => {
  set(report);
};

query.addListener(notify);

let cache = {};

const get = (id)=>{
  return cache[id];
};

const set = (report)=>{
  let reportId = report.attributes.reportId;
  cache[reportId] = report;
};

module.exports = {
  get:get,
  set:set
};
