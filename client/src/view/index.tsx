import React, { useState, useContext, useEffect } from 'react'

import AdministratorPath from '../paths/administrator'
import StaffPath from '../paths/staff'
import DeveloperPath from '../paths/developer'
import UserPath from '../paths/user'
import PermissionsEnum from '../types/PermissionEnum'

import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext';
import HistoryService from '../services/history/HistoryService'
import Path from '../constant/Path'
import Login from '../view/login'
import Statistics from '../view/statistics'

const Main: React.FC = () => {

	return (
		<AuthProvider>
			<Router history={HistoryService}>
				<Switch>
					<Route exact path={Path.LOGIN} component={ Login } />
					<Route exact path={Path.MENU} component={Statistics} />
				</Switch>
			</Router>
		</AuthProvider>
		/*
		<div className="app">
			{ user.role.label === PermissionsEnum.ADMINISTRATOR ? 
				<AdministratorPath />
			: user.role.label === PermissionsEnum.STAFF ?
				<StaffPath />
			: user.role.label === PermissionsEnum.DEVELOPER ?
				<DeveloperPath />
			:
				<UserPath />
			}
		</div>
		*/
	)
}
export default Main

// <Route exact path={Path.LOGIN} component={Login} />
// <Route exact path={Path.REGISTER} component={Register} />