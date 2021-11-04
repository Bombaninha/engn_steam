import React, { useContext } from 'react'
import DefaultButton from '../../components/default_button'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'

import { Context } from '../../contexts/AuthContext'

const NotFound: React.FC = () => {
	const { userEmail, setUserEmail, userPassword, setUserPassword, authenticated, handleLogin, handleLogout } = useContext(Context);
	//const handleClick = () => {
	//	HistoryService.push(Path.MENU)
	//}
	// <DefaultButton text='Voltar ao menu principal' colorClass='primary'/>
	return (
		<div>
			<h1>NOT FOUND</h1>
			<button>Voltar ao menu principal</button>
			<button onClick={handleLogout}>Sair</button>
		</div>
	)
}

export default NotFound