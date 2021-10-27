import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import NotFound from '../../view//not_found'
import UserLateralMenu from '../../components/lateral_menu/user_lateral_menu'
import GameManagement from '../../view/game_management'
import Support from '../../view/support'
import PermissionsEnum from '../../types/PermissionEnum'
import Account from '../../view/account'
import Login from '../../view/login'
const DeveloperPath: React.FC = () => {
	return (
		<>
			<UserLateralMenu role={PermissionsEnum.DEVELOPER} />
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.LOGIN} component={Login} />
					<Route exact path={Path.MENU} component={GameManagement} />
					<Route exact path={Path.ACCOUNT} component={Account} />
					<Route exact path={Path.SUPPORT} component={Support} />
					<Route path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</>
	)
}
export default DeveloperPath