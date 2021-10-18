import React from 'react'
import Path from '../../../constant/Path'
import HistoryService from '../../../services/history/HistoryService'
import { suspend } from '../../../util/AsyncUtils'
import PermissionsEnum from '../../../types/PermissionEnum'
import '../styles.css'

interface LateralMenuProps {
    role: PermissionsEnum
}

const UserLateralMenu: React.FC<LateralMenuProps> = ({role}) => {
    const handleClick = async (path: string) => {
		await suspend(200)
		HistoryService.push(path)
	}
    
    return (
        <div className="lateral-menu">
            {role === PermissionsEnum.USER ?
            <>
                <button onClick={() => handleClick(Path.MENU)}>
                    Loja
                </button>
                <button onClick={() => handleClick(Path.LIBRARY)}>
                    Biblioteca
                </button>
                <button onClick={() => handleClick(Path.FRIENDS)}>
                    Amigos
                </button>
            </>
            :
            <>
                <button onClick={() => handleClick(Path.MENU)}>
                    Meus jogos
                </button>
            </>
            }
            <button onClick={() => handleClick(Path.ACCOUNT)}>
                Conta
            </button>
            <button onClick={() => handleClick(Path.SUPPORT)}>
                Suporte
            </button>
        </div>
    )
}

export default UserLateralMenu