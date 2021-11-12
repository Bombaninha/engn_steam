import React, { useContext } from 'react'

import PermissionsEnum from '../types/PermissionEnum'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider, Context } from '../contexts/AuthContext';
import HistoryService from '../services/history/HistoryService'
import Path from '../constant/Path'
import Login from '../view/login'
import Statistics from '../view/statistics'
import GameManagement from '../view/game_management'
import Tickets from '../view/tickets'
import Request from './request'
import NotFound from '../view/not_found'

import Account from '../view/account'
import Support from '../view/support'

import Friends from '../view/friends'
import Library from '../view/library'

import Store from '../view/store'
import ForgetPassword from '../view/forget_password'
import ChangePassword from '../view/change_password'
import SignUp from './sign_up';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './styles';
import LateralMenu from '../components/lateral_menu';

type CustomRouteType = {
	isPrivate?: boolean
	allowed?: Array<PermissionsEnum>;
	exact?: boolean;
	path: string;
	component: React.FC
}

function CustomRoute({ isPrivate, allowed, ...rest }: CustomRouteType) {
	const { loading, authenticated } = useContext(Context);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (isPrivate && !authenticated) {
		return <Redirect to="/" />
	}

	if (isPrivate && authenticated) {
		const user = JSON.parse(localStorage.getItem('user') || '{}');
		const role: PermissionsEnum = user.role.label as PermissionsEnum;

		if (allowed?.includes(role))
			return (
				<AppContainer>
					<LateralMenu role={role} />
					<Route {...rest} />
				</AppContainer>);

		return <Redirect to={'/'} />
	}

	return <Route {...rest} />
}

const Main: React.FC = () => {

	return (
		<AuthProvider>
			<Router history={HistoryService}>
				<Switch>
					<CustomRoute exact path={Path.LOGIN} component={Login} />
					<CustomRoute exact path={Path.REGISTER} component={SignUp} />
					<CustomRoute exact path={Path.FORGET_PASSWORD} component={ForgetPassword} />
					<CustomRoute path={Path.CHANGE_PASSWORD} component={ChangePassword} />

					<CustomRoute exact path={Path.STATISTICS}
						isPrivate allowed={[PermissionsEnum.STAFF, PermissionsEnum.ADMINISTRATOR]}
						component={Statistics}
					/>
					<CustomRoute exact path={Path.TICKETS}
						isPrivate allowed={[PermissionsEnum.STAFF, PermissionsEnum.ADMINISTRATOR]}
						component={Tickets}
					/>
					<CustomRoute exact path={Path.REQUEST}
						isPrivate allowed={[PermissionsEnum.STAFF, PermissionsEnum.ADMINISTRATOR]}
						component={Request}
					/>

					<CustomRoute exact path={Path.GAME_MANAGEMENT}
						isPrivate allowed={[PermissionsEnum.DEVELOPER]}
						component={GameManagement}
					/>
					<CustomRoute exact path={Path.ACCOUNT}
						isPrivate allowed={[PermissionsEnum.USER]}
						component={Account}
					/>
					<CustomRoute exact path={Path.SUPPORT}
						isPrivate allowed={[PermissionsEnum.USER, PermissionsEnum.DEVELOPER]}
						component={Support}
					/>

					<CustomRoute exact path={Path.STORE}
						isPrivate allowed={[PermissionsEnum.USER]}
						component={Store}
					/>
					<CustomRoute exact path={Path.LIBRARY}
						isPrivate allowed={[PermissionsEnum.USER]}
						component={Library}
					/>
					<CustomRoute exact path={Path.FRIENDS}
						isPrivate allowed={[PermissionsEnum.USER]}
						component={Friends}
					/>
					<CustomRoute path={'/'} component={NotFound} />
				</Switch>
			</Router>
			<ToastContainer />
		</AuthProvider>
	)
}
export default Main