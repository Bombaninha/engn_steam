import React from 'react'
import Path from '../../constant/Path'
import HistoryService from '../../services/history/HistoryService'
import PermissionsEnum from '../../types/PermissionEnum'
// import '../styles.css'
import { LateralMenuButton, LateralMenuContainer } from './styles'

interface LateralMenuProps {
    role: PermissionsEnum
}

const handleClick = async (path: string) => {
    // await suspend(200)
    HistoryService.push(path)
}

const StaffLateralMenu: React.FC = () => {
    return (
        <LateralMenuContainer>
            <LateralMenuButton onClick={() => handleClick(Path.STATISTICS)}>
                Estatísticas
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.TICKETS)}>
                Tickets
            </LateralMenuButton>
        </LateralMenuContainer>
    )
}

const AdmLateralMenu: React.FC = () => {
    return (
        <LateralMenuContainer>
            <LateralMenuButton onClick={() => handleClick(Path.STATISTICS)}>
                Estatísticas
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.TICKETS)}>
                Tickets
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.REQUEST)}>
                Pedidos
            </LateralMenuButton>
        </LateralMenuContainer>
    )
}

const UserLateralMenu: React.FC = () => {
    return (
        <LateralMenuContainer>
            <LateralMenuButton onClick={() => handleClick(Path.STORE)}>
                Loja
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.LIBRARY)}>
                Biblioteca
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.FRIENDS)}>
                Amigos
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.ACCOUNT)}>
                Conta
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.SUPPORT)}>
                Suporte
            </LateralMenuButton>
        </LateralMenuContainer>
    )
}

const DevLateralMenu: React.FC = () => {
    return (
        <LateralMenuContainer>
            <LateralMenuButton onClick={() => handleClick(Path.GAME_MANAGEMENT)}>
                Meus jogos
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.ACCOUNT)}>
                Conta
            </LateralMenuButton>
            <LateralMenuButton onClick={() => handleClick(Path.SUPPORT)}>
                Suporte
            </LateralMenuButton>
        </LateralMenuContainer>
    )
}

const LateralMenu: React.FC<LateralMenuProps> = ({ role }) => {
    switch (role) {
        case PermissionsEnum.USER:
            return <UserLateralMenu />
        case PermissionsEnum.DEVELOPER:
            return <DevLateralMenu />
        case PermissionsEnum.STAFF:
            return <StaffLateralMenu />
        case PermissionsEnum.ADMINISTRATOR:
            return <AdmLateralMenu />
    }
}

export default LateralMenu