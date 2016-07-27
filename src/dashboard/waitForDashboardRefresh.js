import {forceClient} from 'react.force';
import Interval from '../utils/interval';
import getDashboardData from './getDashboardData';

module.exports = (opts)=>{
	opts.dbStatusLoop = new Interval(function(time){
		console.log('dbstatuscheck@'+time);
		forceClient.dashboardStatus(opts.id,
			(response)=>{
				let isDbRefreshed = response.componentStatus.every((component)=>{
					return component.refreshStatus == 'IDLE';
				})
				if(isDbRefreshed){
					opts.dbStatusLoop.stop();
					opts.dbRefreshLoop.stop();
					getDashboardData(opts);
				}
			},
			(error)=>{
				reject('Error: there was an error in the dashboard refresh');
			}
		)
	},10000);

	opts.dbStatusLoop.start();
}
