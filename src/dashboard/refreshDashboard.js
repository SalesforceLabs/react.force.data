import {forceClient} from 'react.force';
import Interval from '../utils/interval';
import waitForDashboardRefresh from './waitForDashboardRefresh';


module.exports = (opts) => {
	return new Promise(
		(resolve, reject)=> {
			if(!opts.autoRefresh){
				resolve(opts);
				return;
			}
			opts.dbRefreshLoop = new Interval(function(time){
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

			// ,1800000);

			opts.dbRefreshLoop.start();

		}
	);
}
