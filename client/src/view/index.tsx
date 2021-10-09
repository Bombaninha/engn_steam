import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Path from '../constant/Path'
import HistoryService from '../services/history/HistoryService'
import Library from './library'
import Store from './store'
import Support from './support'
import Friends from './friends'
import NotFound from './not_found'
import LateralMenu from '../components/lateral_menu'

const Main: React.FC = () => {
	return (
		<div className="app">
			<LateralMenu />
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.MENU} component={Store} />
					<Route exact path={Path.LIBRARY} component={Library} />
					<Route exact path={Path.FRIENDS} component={Friends} />
					<Route exact path={Path.SUPPORT} component={Support} />
					<Route path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</div>
	)
}
export default Main

// <Route exact path={Path.LOGIN} component={Login} />
// <Route exact path={Path.REGISTER} component={Register} />