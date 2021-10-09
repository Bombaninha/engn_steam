import React from 'react'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import { suspend } from '../../util/AsyncUtils'
import './styles.css'

const LateralMenu: React.FC = () => {
    const handleClick = async (path: string) => {
		await suspend(200)
		HistoryService.push(path)
	}
    
    return (
        <div className="lateral-menu">
            <button onClick={() => handleClick(Path.MENU)}>
                Loja
            </button>
            <button onClick={() => handleClick(Path.LIBRARY)}>
                Biblioteca
            </button>
            <button onClick={() => handleClick(Path.FRIENDS)}>
                Amigos
            </button>
            <button onClick={() => handleClick(Path.SUPPORT)}>
                Suporte
            </button>
        </div>
    )
}

export default LateralMenu