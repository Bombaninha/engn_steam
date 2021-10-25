import React, { useState } from 'react'
import InfoPage from '../info_page'
import './styles.css'

interface DeleteGameProps {
    gameTitle: string
    onCancel: () => void
    onDelete: () => void
    onReturn: () => void
}

const DeleteGame: React.FC<DeleteGameProps> = ({ gameTitle, onCancel, onDelete, onReturn }) => {
    const [gameDeleted, setGameDeleted] = useState(false)

    const handleConfirmDelete = () => {
        setGameDeleted(true)
        onDelete()
    }

    return (
        <>
            {gameDeleted ?
                <InfoPage infoText='Sua solicitação foi enviada com sucesso' buttonText='Voltar ao menu principal' onClick={onReturn} />
                :
                <InfoPage infoText={`Você tem certeza que deseja excluir o jogo "${gameTitle}"? Essa ação é irreversível.`} buttonText='Excluir jogo' onClick={() => handleConfirmDelete()} cancelButton onCancel={onCancel} />
            }
        </>
    )
}
export default DeleteGame