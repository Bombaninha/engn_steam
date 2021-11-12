import React, { useContext } from 'react'
import { Context } from '../../contexts/AuthContext'

const NotFound: React.FC = () => {
	const { handleLogout } = useContext(Context);
	return (
		<div>
			<h1>NOT FOUND</h1>
			<button>Voltar ao menu principal</button>
			<button onClick={handleLogout}>Sair</button>
		</div>
	)
}

export default NotFound