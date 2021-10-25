import React, { useState } from 'react'
import DefaultButton from '../../components/default_button'
import DeleteGame from '../../components/delete_game'
import DevGameCard from '../../components/dev_game_card'
import TextInput from '../../components/textInput'
import { gamesListPopulate } from '../../constant/content'
import './styles.css'

const GameManagement: React.FC = () => {
    const [beginPeriodValue, setBeginPediodValue] = useState('')
    const [endPediodValue, setEndPeriodValue] = useState('')
    const [deleteGame, setDeleteGame] = useState(false)
    const [gameToDelete, setGameToDelete] = useState('')
    const [gamesOnRequest, setGamesOnRequest] = useState<string[]>([])

    const handleEditGame = () => {
        console.log('Editar jogo')
    }

    const handleDeleteGame = (gameTitle: string) => {
        setGameToDelete(gameTitle)
        setDeleteGame(true)
    }

    const onRequestOpen = (gameTitle: string) => {
        setGamesOnRequest([...gamesOnRequest, gameTitle])
    }

    const returnToMainPage = () => {
        setDeleteGame(false)
        setGameToDelete('')
    }

    const handleRenovateGame = () => {
        console.log('Renovar jogo')
    }

    return (
        <div className="page dev_game_management">
            {deleteGame ?
                <DeleteGame gameTitle={gameToDelete} onCancel={() => setDeleteGame(false)} onDelete={() => onRequestOpen(gameToDelete)} onReturn={() => returnToMainPage()} />
                :
                <>
                    <h1 className="page-title">Jogos</h1>
                    <h2 className="page-subtitle">Estatísticas</h2>
                    <div className="dev_game_management__statistics">
                        <TextInput text="Início do período" value={beginPeriodValue} onChange={newBeginPeriod => setBeginPediodValue(newBeginPeriod)} hasLabel />
                        <TextInput text="Fim do período" value={endPediodValue} onChange={newEndPeriod => setEndPeriodValue(newEndPeriod)} hasLabel />
                        <DefaultButton text="Gerar relatório de vendas" colorClass="primary" onClick={() => console.log('gerar relatorio')} />
                    </div>
                    <h2 className="page-subtitle">Meus Jogos</h2>
                    <div className="dev_game_management__game_list">
                        {gamesListPopulate.map((game, index) => <DevGameCard key={index} game={game} handleEditGame={() => handleEditGame()} handleDeleteGame={() => handleDeleteGame(game.title)} handleRenovateGame={() => handleRenovateGame()} onRequest={gamesOnRequest.includes(game.title)} />)}
                        <DefaultButton text="Adicionar jogo" colorClass="primary" onClick={() => console.log('adicionar jogo')} />
                    </div>
                </>
            }
        </div>
    )
}
export default GameManagement