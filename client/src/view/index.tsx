import React, { useContext } from 'react'

import PermissionsEnum from '../types/PermissionEnum'
import StaffLateralMenu from '../components/lateral_menu/staff_lateral_menu'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider, Context } from '../contexts/AuthContext';
import HistoryService from '../services/history/HistoryService'
import Path from '../constant/Path'
import Login from '../view/login'
import Statistics from '../view/statistics'
import GameManagement from '../view/game_management'
import Tickets from '../view/tickets'
import Requests from '../view/requests'
import NotFound from '../view/not_found'

import Account from '../view/account'
import Support from '../view/support'

import Friends from '../view/friends'
import Library from '../view/library'

import Store from '../view/store'
import ForgetPassword from '../view/forget_password'
import ChangePassword from '../view/change_password'
import SignUp from './sign_up';
//import GameManagement from '../../view/game_management'

type CustomRouteType = {
	isPrivate?: boolean;
	isUser?: boolean;
	isDev?: boolean;
	isStaff?: boolean;
	isAdmin?: boolean;
	exact?: boolean;
	path: string;
	component: React.FC
}

function CustomRoute({ isPrivate, isUser, isDev, isStaff, isAdmin, ...rest }: CustomRouteType) {
	const { loading, authenticated } = useContext(Context);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (isPrivate && !authenticated) {
		return <Redirect to="/" />
	}

	if (isPrivate && authenticated) {
		const user = JSON.parse(localStorage.getItem('user') || '{}');
		const role = user.role.label;

		if (isUser && role === 'user') {
			return <Route {...rest} />
		}

		if (isDev && role === 'dev') {
			return <Route {...rest} />
		}

		if (isStaff && role === 'staff') {
			return <Route {...rest} />
		}

		if (isAdmin && role === 'admin') {
			return <Route {...rest} />
		}

		return <Redirect to={'/'} />
	}

	return <Route {...rest} />
}

const Main: React.FC = () => {
	// const { loading, authenticated } = useContext(Context);
	// const user = JSON.parse(localStorage.getItem('user') || '{}');

	return (
		<AuthProvider>
			<Router history={HistoryService}>
				<Switch>
					<CustomRoute exact path={Path.LOGIN} component={Login} />
					<CustomRoute exact path={Path.REGISTER} component={SignUp} />
					<CustomRoute exact path={Path.FORGET_PASSWORD} component={ForgetPassword} />
					<CustomRoute path={Path.CHANGE_PASSWORD} component={ChangePassword} />
					<CustomRoute isPrivate isStaff isAdmin exact path={Path.STATISTICS} component={Statistics} />
					<CustomRoute isPrivate isStaff isAdmin exact path={Path.TICKETS} component={Tickets} />
					<CustomRoute isPrivate isStaff isAdmin exact path={Path.REQUEST} component={Requests} />

					<CustomRoute isPrivate isDev exact path={Path.GAME_MANAGEMENT} component={GameManagement} />
					<CustomRoute isPrivate isUser isDev exact path={Path.ACCOUNT} component={Account} />
					<CustomRoute isPrivate isUser isDev exact path={Path.SUPPORT} component={Support} />

					<CustomRoute isPrivate isUser exact path={Path.STORE} component={Store} />
					<CustomRoute isPrivate isUser exact path={Path.LIBRARY} component={Library} />
					<CustomRoute isPrivate isUser exact path={Path.FRIENDS} component={Friends} />
					<CustomRoute path={'/'} component={NotFound} />
				</Switch>
			</Router>
		</AuthProvider>
	)
}
export default Main