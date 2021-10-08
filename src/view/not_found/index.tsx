import React from 'react'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'

const NotFound: React.FC = () => {
	const handleBackButton = () => {
		HistoryService.push(Path.MENU)
	}

	return (
		<div>
			<h1>NOT FOUND</h1>
		</div>
	)
}

export default NotFound