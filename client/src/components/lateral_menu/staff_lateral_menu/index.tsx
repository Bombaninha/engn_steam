import React from 'react'
import Path from '../../../constant/Path'
import HistoryService from '../../../services/history/HistoryService'
import { suspend } from '../../../util/AsyncUtils'
import PermissionsEnum from '../../../types/PermissionEnum'
import '../styles.css'

interface LateralMenuProps {
    role: PermissionsEnum
}

const StaffLateralMenu: React.FC<LateralMenuProps> = ({role}) => {
    const handleClick = async (path: string) => {
		await suspend(200)
		HistoryService.push(path)
	}
    
    return (
        <div className="lateral-menu">
            <button onClick={() => handleClick(Path.STATISTICS)}>
                Estatísticas
            </button>
            <button onClick={() => handleClick(Path.TICKETS)}>
                Tickets
            </button>
            {role === PermissionsEnum.ADMINISTRATOR ?
                <button onClick={() => handleClick(Path.REQUEST)}>
                    Pedidos
                </button>
            :
                <></>
            }
        </div>
    )
}
export default StaffLateralMenu