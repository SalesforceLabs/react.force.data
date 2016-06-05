/*
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
 
import {forceClient} from 'react.force';
import union from 'lodash.union';
import remove from 'lodash.remove';
import trim from 'lodash.trim';
import pull from 'lodash.pull';

import utils from './utils';


let queryCount = 0;

const listeners = [];

const buildQuery = (type, ids, fields) => {
  const where = ids.map((id)=>{
    return 'Id=\''+id+'\'';
  }).join(' OR ');
  return 'SELECT ' +
  fields.join(',') +
  ' FROM '+type +
  ' WHERE '+ where +
  ' LIMIT '+ 200;
};

const broadcast = (records,compactLayout,defaultLayout,doRefs)=>{
  const ids = records.map((record)=>{
    return record.Id;
  });
  listeners.forEach((listener)=>{
    listener(ids,records,compactLayout,defaultLayout,doRefs);
  });
};



module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(!opts.noCache && opts.cachedSobj && opts.cachedSobj.attributes){
        opts.sobj = opts.cachedSobj;
        resolve(opts);
        return;
      }

      const fields = remove(union(opts.compactLayoutFieldNames, opts.defaultLayoutFieldNames, ['Id']), (name)=>{
        return trim(name,', _-\n\t').length>0;
      });

      const query = buildQuery(opts.type,opts.ids,fields);
      queryCount++;
      forceClient.query(query,
        (response) => {
          if(response.records && response.records.length){
            const records = response.records.map((r)=>{
                r.attributes.compactTitle = utils.getCompactTitle(r, opts.compactTitleFieldNames);
                r.attributes.shortId = utils.getShortId(r);
              return r;
            });
            broadcast(records, opts.compactLayout, opts.defaultLayout, opts.doRefs);
          }

          resolve(opts);
        },
        (error)=>{
          reject('Error: query');
        }
      );
    }
  );
};
module.exports.addListener = (listener) => {
  listeners.push(listener);
};
module.exports.getQueryCount = () => {
  return queryCount;
};