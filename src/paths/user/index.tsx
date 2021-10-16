import React, { useState } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import Library from '../../view/library'
import Store from '../../view/store'
import Support from '../../view//support'
import Account from '../../view//account'
import Friends from '../../view//friends'
import NotFound from '../../view//not_found'
import LateralMenu from '../../components/lateral_menu'

const UserPath: React.FC = () => {
	return (
		<>
			<LateralMenu />
			<Router history={HistoryService}>
				<Switch>
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