let Queue = {};

import keys from 'lodash.keys';
import query from './query';

import batchRunByType from './batchRunByType';

const timeouts = {};

const get = (type) => {
  const result = Queue[type];
  Queue[type] = [];
  return result;
};

const add = (type, id, doRefs) => {
  if(!type || !id){
    return;
  }
  if(!Queue[type]){
    Queue[type] = [];
  }
  if(Queue[type].indexOf(id)<0){
    Queue[type].push(id);
  }
  if(!timeouts[type]){
    timeouts[type] = true;
    setTimeout(()=>{
      if(Queue[type] && Queue[type].length){
        const ids = get(type);
        batchRunByType(type,ids,doRefs);
      }
      timeouts[type] = false;
    },300);
  }
};

module.exports = {
  add:add,
  get:get
};