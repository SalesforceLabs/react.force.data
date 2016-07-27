import {forceClient} from 'react.force';

const listeners = [];

const broadcast = (records) => {
  const ids = records.map((record)=>{
    return record.id;
  });
  listeners.forEach((listener)=>{
    listener(ids, records);
  });
}

module.exports = (opts) => {
	return new Promise(
		(resolve, reject) => {
			forceClient.dashboardData(opts.id, (response)=>{
				if(response){
					response.id = response.attributes.dashboardId;
					broadcast([response]);
				}
				resolve(opts);
			},
			(error)=>{
				reject('Error: dashboard response was not received');
			})
		}
	);
};

module.exports.addListener = (listener) => {
	listeners.push(listener);
};

