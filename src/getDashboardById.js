import getDashboardData from './dashboard/getDashboardData';
import refreshDashboard from './dashboard/refreshDashboard';

module.exports = (id, autoRefresh, refreshInterval, dbRefreshLoop, dbStatusLoop) => {
	return getDashboardData({id: id, autoRefresh:autoRefresh, refreshInterval: refreshInterval, dbRefreshLoop:dbRefreshLoop, dbStatusLoop:dbStatusLoop})
	.then(refreshDashboard)
}
