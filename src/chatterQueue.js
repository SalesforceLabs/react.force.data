let chatterQueue = [];
import keys from 'lodash.keys';
import chatterQuery from './chatterQuery';

const get = () => {
  return chatterQueue.splice(0, chatterQueue.length);
}
const add = (id) => {
  if(!id){
    return;
  }
  if(chatterQueue.indexOf(id) < 0){
    chatterQueue.push(id);
  }
  setTimeout(()=>{
    if(chatterQueue && chatterQueue.length !== 0){
      console.log('TRIGGER QUERY !!!');
      const ids = get();
      return chatterQuery({ids:ids});
    }
  },300);
};

module.exports = {
  add:add,
  get:get
};
