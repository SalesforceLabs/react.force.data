import {forceClient} from 'react.force';
import Interval from '../utils/interval';
import getDashboardData from './getDashboardData';

let _dbStatusLoop;

module.exports = (opts)=>{
	_dbStatusLoop = new Interval(function(time){
		console.log('dbstatuscheck@'+time);
		forceClient.dashboardStatus(opts.id,
			(response)=>{
				let isDbRefreshed = response.componentStatus.every((component)=>{
					return component.refreshStatus == 'IDLE';
				})
				if(isDbRefreshed){
					_dbStatusLoop.stop();
					getDashboardData(opts);
				}
			},
			(error)=>{
				reject('Error: there was an error in the dashboard refresh');
			}
		)
	},30000);

	_dbStatusLoop.start();
}

module.exports.stop = ()=>{
	_dbStatusLoop && _dbStatusLoop.stop();
}
