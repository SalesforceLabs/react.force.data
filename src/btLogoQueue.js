let btLogoQueue = [];
import keys from 'lodash.keys';
import btLogoQuery from './btLogoQuery';

const get = () => {
  return btLogoQueue.splice(0, btLogoQueue.length);
}
const add = (id) => {
  if(!id){
    return;
  }
  if(btLogoQueue.indexOf(id) < 0){
    btLogoQueue.push(id);
  }
  setTimeout(()=>{
    if(btLogoQueue && btLogoQueue.length !== 0){
      const ids = get();
      return btLogoQuery({ids:ids});
    }
  },300);
};

module.exports = {
  add:add,
  get:get
};
