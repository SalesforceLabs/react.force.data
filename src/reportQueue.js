let reportQueue = [];
import keys from 'lodash.keys';
import reportQuery from './reportQuery';

const get = () => {
  return reportQueue.splice(0, reportQueue.length);
}
const add = (id) => {
  if(!id){
    return;
  }
  if(reportQueue.indexOf(id) < 0){
    reportQueue.push(id);
  }
  if(reportQueue && reportQueue.length !== 0){
    console.log('TRIGGER QUERY !!!');
    const ids = get();
    return reportQuery({ids:ids});
  }
};

module.exports = {
  add:add,
  get:get
};
