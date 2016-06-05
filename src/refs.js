import union from 'lodash.union';
import remove from 'lodash.remove';
import trim from 'lodash.trim';
import merge from 'lodash.merge';
import keys from 'lodash.keys';
import pull from 'lodash.pull';

import query from './query';
import queue from './queue';

import requestWithTypeAndId from './requestWithTypeAndId';

const notify = (ids,sobjs,compactLayout,defaultLayout,doRefs) => {
  if( compactLayout && defaultLayout ){
    if(!!!doRefs){
      return;
    }
    const refs = pull(compactLayout.refs, 'OwnerId');
    sobjs.forEach((sobj)=>{
      keys(refs).forEach(fieldName => {
        const type = refs[fieldName];
        const id = sobj[fieldName];
        requestWithTypeAndId(type,id);
      });
    });
  }

};

query.addListener(notify);

module.exports = {

};