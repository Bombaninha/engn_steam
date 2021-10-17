import React from 'react'
import DefaultButton from '../../components/default_button'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'

const NotFound: React.FC = () => {
	const handleClick = () => {
		HistoryService.push(Path.MENU)
	}

	return (
		<div>
			<h1>NOT FOUND</h1>
			<DefaultButton text='Voltar ao menu principal' colorClass='primary' onClick={handleClick}/>
		</div>
	)
}

export default NotFound