import React, { useState, useContext, useEffect } from 'react'
import AdministratorPath from '../paths/administrator'
import StaffPath from '../paths/staff'
import DeveloperPath from '../paths/developer'
import UserPath from '../paths/user'
import PermissionsEnum from '../types/PermissionEnum'

import { Context } from '../contexts/AuthContext';

const Main: React.FC = () => {
	const [role] = useState<PermissionsEnum>(PermissionsEnum.DEVELOPER)
	//const { authenticated, handleLogin, handleLogout } = useContext(Context);
	
	/*
	const roleStorage = localStorage.getItem('role');
	if(roleStorage === 'admin') {
		setRole(PermissionsEnum.ADMINISTRATOR);
	} else {
		setRole(PermissionsEnum.USER);
	} 
	*/
	return (
		<div className="app">
			{localStorage.getItem('role') === '"admin"' ? 
				<AdministratorPath />
			: localStorage.getItem('role') === 'staff' ?
				<StaffPath />
			: localStorage.getItem('role') === 'dev' ?
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