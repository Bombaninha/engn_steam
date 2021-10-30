import React, { useState, useContext, useEffect } from 'react'
import AdministratorPath from '../paths/administrator'
import StaffPath from '../paths/staff'
import DeveloperPath from '../paths/developer'
import UserPath from '../paths/user'
import PermissionsEnum from '../types/PermissionEnum'

import { Context } from '../contexts/AuthContext';

const Main: React.FC = () => {
	const [userRole, setUserRole] = useState<PermissionsEnum>(PermissionsEnum.ADMINISTRATOR);

	//const { authenticated, handleLogin, handleLogout } = useContext(Context);
	//const userRole = JSON.parse(localStorage.getItem('role') || '{}');

	return (
		<div className="app">
			{ userRole === PermissionsEnum.ADMINISTRATOR ? 
				<AdministratorPath />
			: userRole === PermissionsEnum.STAFF ?
				<StaffPath />
			: userRole === PermissionsEnum.DEVELOPER ?
				<DeveloperPath />
			:
				<UserPath />
			}
		</div>
	)
}
export default Main

// <Route exact path={Path.LOGIN} component={Login} />
// <Route exact path={Path.REGISTER} component={Register} />