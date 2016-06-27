import {forceClient} from 'react.force';
import union from 'lodash.union';
import remove from 'lodash.remove';
import trim from 'lodash.trim';

let queryCount = 0;

const listeners = [];

/*const broadcast = (records) => {
  const ids = records.map((record)=>{
    return record.id;
  });
  listeners.forEach((listener)=>{
    listener(ids, records);
  });
}*/

const broadcast = (reportResponse) => {
  const reportId = reportResponse.attributes.reportId;
  listeners.forEach((listener)=>{
    listener(reportId, reportResponse);
  });
}

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      if(!opts.noCache && opts.cachedReportData ){
        console.log('skipping report request for cached data');
        opts.reportData = opts.cachedReportData;
        resolve(opts);
        return;
      }

      queryCount++;

      forceClient.reportData(opts.id,
        (response)=>{
          //if(response){
            broadcast(response);
            resolve(opts);
            /*let groupings = response.groupingsDown.groupings,
                factMap = response.factMap,
                dataSource,
                sumOfEntities;

            //console.log("****REPORTRESPONSE: " + JSON.stringify(response));
            dataSource = groupings.map(function(grouping, index){
              let mappedObject = Object.assign(grouping, factMap[grouping.key + '!T']);
              mappedObject.position = grouping.key;
              return mappedObject;
            }).find(function(dataBlob){
              return dataBlob.value === this.props.entityId;
            }.bind(this));*/

            /*this.setState({
              reportApiResponse: response,
              detailColumnMap : response.reportMetadata.detailColumns,
              dataSource: this.getDataSource(dataSource.rows)
            });*/
          //}
        },
        (error)=> {
          reject('Error: query');
          ///console.warn(error);
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
