import React, { useState } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import NotFound from '../../view//not_found'
import LateralMenu from '../../components/lateral_menu'
import Statistics from '../../view/statistics'

const AdministratorPath: React.FC = () => {
	return (
		<>
			<LateralMenu />
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.MENU} component={Statistics} />
					<Route path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</>
	)
}
export default AdministratorPath