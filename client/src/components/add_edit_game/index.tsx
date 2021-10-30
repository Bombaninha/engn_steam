import { useState } from 'react'
import { TGame } from "../../types/TGame"
import DefaultButton from "../default_button"
import InfoPage from '../info_page'
import TextInput from "../textInput"
import TextArea from '../text_area'
import './styles.css'

interface AddEditGameProps {
    gameItem?: TGame
    onEdit?: () => void
    onReturn: () => void
}

const AddEditGame: React.FC<AddEditGameProps> = ({gameItem, onEdit, onReturn}) => {
    const [game, setGame] = useState(gameItem? gameItem : {
        title: '',
        description: '',
        developer: '',
        price: 0.00,
        categories: []
    })
    const [isOperationFinnished, setIsOperationFinnished] = useState(false)

    const handleAddEditGame = () => {
        setIsOperationFinnished(true)
        onEdit && onEdit()
    }
    
    return (
        <>
            {isOperationFinnished ?
                <InfoPage infoText='Sua solicitação foi enviada com sucesso' buttonText='Voltar ao menu principal' onClick={onReturn} />
                :
                <div className="add-edit-game page">
                    <h1 className="page-title">Adicionar jogo</h1>
                    <h2 className="page-subtitle">Informações do jogo</h2>
                    <TextInput hasLabel text="Nome" value={game.title} onChange={newTitle => setGame({...game, title: newTitle})} />
                    <TextInput hasLabel text="Preço" value={game.price.toString()} onChange={newPrice => setGame({...game, price: parseInt(newPrice)})} />
                    <TextInput hasLabel text="Desenvolvedor" value={game.developer} onChange={newDeveloper => setGame({...game, developer: newDeveloper})} />
                    <TextArea labelText="Descrição" value={game.description} onChange={newDescription => setGame({...game, description: newDescription})}/>
                    <DefaultButton text="Fazer pedido de adição" colorClass="primary" onClick={() => handleAddEditGame()}/>
                </div>
            }
        </>
    )
}
export default AddEditGame