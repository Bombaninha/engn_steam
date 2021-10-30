import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import Library from '../../view/library'
import Store from '../../view/store'
import Support from '../../view//support'
import Account from '../../view//account'
import Friends from '../../view//friends'
import NotFound from '../../view//not_found'
import UserLateralMenu from '../../components/lateral_menu/user_lateral_menu'
import PermissionsEnum from '../../types/PermissionEnum'
import Login from '../../view/login'
const UserPath: React.FC = () => {
	return (
		<>
			<UserLateralMenu role={PermissionsEnum.USER} />
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.LOGIN} component={Login} />
					<Route exact path={Path.MENU} component={Store} />
					<Route exact path={Path.LIBRARY} component={Library} />
					<Route exact path={Path.FRIENDS} component={Friends} />
					<Route exact path={Path.ACCOUNT} component={Account} />
					<Route exact path={Path.SUPPORT} component={Support} />
					<Route path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</>
	)
}
export default UserPath