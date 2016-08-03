import {forceClient} from 'react.force';
import Interval from '../utils/interval';
import waitForDashboardRefresh from './waitForDashboardRefresh';

let _dbRefreshLoop;

module.exports = (opts) => {
	return new Promise(
		(resolve, reject)=> {
			if(!opts.autoRefresh){
				resolve(opts);
				return;
			}
			_dbRefreshLoop = new Interval(function(time){
				console.log('dbrefreshed@'+time);
				forceClient.dashboardRefresh(opts.id,
					(response)=>{
						if(response && response.statusUrl){
							resolve(opts);
							waitForDashboardRefresh(opts);
							return;
						} else {
							reject('Error: dashboard did not refresh properly');
						}
					},
					(error)=>{
						reject('Error: dashboard refresh did not receive data');
					}
				);
			}
			,opts.refreshInterval);

			_dbRefreshLoop.start();
		}
	);
}

module.exports.stop = ()=>{
	_dbRefreshLoop && _dbRefreshLoop.stop();
}
