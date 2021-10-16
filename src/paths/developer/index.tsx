import React, { useState } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import NotFound from '../../view//not_found'
import LateralMenu from '../../components/lateral_menu'
import GameManagement from '../../view/game_management'
import Support from '../../view/support'

const DeveloperPath: React.FC = () => {
	return (
		<>
			<LateralMenu />
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.MENU} component={GameManagement} />
					<Route exact path={Path.SUPPORT} component={Support} />
					<Route path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</>
	)
}
export default DeveloperPath