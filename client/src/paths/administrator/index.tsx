import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import StaffLateralMenu from '../../components/lateral_menu/staff_lateral_menu'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import NotFound from '../../view//not_found'
import PermissionsEnum from '../../types/PermissionEnum'
import Statistics from '../../view/statistics'
import Tickets from '../../view/tickets'
import Requests from '../../view/requests'

const AdministratorPath: React.FC = () => {
	return (
		<>
			<StaffLateralMenu role={PermissionsEnum.ADMINISTRATOR}/>
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.MENU} component={Statistics} />
					<Route exact path={Path.TICKETS} component={Tickets} />
					<Route exact path={Path.REQUEST} component={Requests} />
					<Route path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</>
	)
}
export default AdministratorPath