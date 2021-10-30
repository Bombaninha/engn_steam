import React, { useState } from 'react'
import AddEditGame from '../../components/add_edit_game'
import DefaultButton from '../../components/default_button'
import DeleteGame from '../../components/delete_game'
import DevGameCard from '../../components/dev_game_card'
import TextInput from '../../components/textInput'
import { gamesListPopulate } from '../../constant/content'
import { TGame } from '../../types/TGame'
import './styles.css'

enum GameAction {
    LIST_VIEW,
    DELETE,
    ADD,
    EDIT
}

const GameManagement: React.FC = () => {
    const [beginPeriodValue, setBeginPediodValue] = useState('')
    const [endPediodValue, setEndPeriodValue] = useState('')
    const [gameAction, setGameAction] = useState(GameAction.LIST_VIEW)
    const [gameToHandle, setGameToHandle] = useState<TGame | undefined >(undefined)
    const [gamesOnRequest, setGamesOnRequest] = useState<string[]>([])

    const handleEditGame = (game: TGame) => {
        setGameToHandle(game)
        setGameAction(GameAction.EDIT)
    }

    const handleDeleteGame = (game: TGame) => {
        setGameToHandle(game)
        setGameAction(GameAction.DELETE)
    }

    const onRequestOpen = (gameTitle: string) => {
        setGamesOnRequest([...gamesOnRequest, gameTitle])
    }

    const returnToMainPage = () => {
        setGameAction(GameAction.LIST_VIEW)
        setGameToHandle(undefined)
    }

    const handleRenovateGame = () => {
        console.log('Renovar jogo')
    }

    return (
        <div className="page dev_game_management">
            {gameAction == GameAction.DELETE ?
                <DeleteGame gameTitle={gameToHandle!.title} onCancel={() => setGameAction(GameAction.LIST_VIEW)} onDelete={() => onRequestOpen(gameToHandle!.title)} onReturn={() => returnToMainPage()} />
                :
                gameAction == GameAction.EDIT ?
                <AddEditGame gameItem={gameToHandle} onReturn={() => returnToMainPage()}/>
                :
                gameAction == GameAction.ADD ?
                <AddEditGame onReturn={() => returnToMainPage()}/>
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
                        {gamesListPopulate.map((game, index) => <DevGameCard key={index} game={game} handleEditGame={() => handleEditGame(game)} handleDeleteGame={() => handleDeleteGame(game)} handleRenovateGame={() => handleRenovateGame()} onRequest={gamesOnRequest.includes(game.title)} />)}
                        <DefaultButton text="Adicionar jogo" colorClass="primary" onClick={() => setGameAction(GameAction.ADD)} />
                    </div>
                </>
            }
        </div>
    )
}
export default GameManagement