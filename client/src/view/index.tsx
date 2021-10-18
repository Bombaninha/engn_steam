import React, { useState } from 'react'
import AdministratorPath from '../paths/administrator'
import StaffPath from '../paths/staff'
import DeveloperPath from '../paths/developer'
import UserPath from '../paths/user'
import PermissionsEnum from '../types/PermissionEnum'

const Main: React.FC = () => {
	const [role] = useState<PermissionsEnum>(PermissionsEnum.ADMINISTRATOR)
	return (
		<div className="app">
			{role === PermissionsEnum.ADMINISTRATOR ? 
				<AdministratorPath />
			: role === PermissionsEnum.STAFF ?
				<StaffPath />
			: role === PermissionsEnum.DEVELOPER ?
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