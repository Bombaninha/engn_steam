import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api, { isDevMode } from '../../api'
import AddEditGame from '../../components/add_edit_game'
import DefaultButton from '../../components/default_button'
import DeleteGame from '../../components/delete_game'
import DevGameCard from '../../components/dev_game_card'
import TextInput from '../../components/textInput'
import { gamesListPopulate } from '../../constant/content'
import { TGame, TGameArrayFromJSON, TGameCreateFromGame } from '../../types/TGame'
import './styles.css'

enum GameAction {
    LIST_VIEW,
    DELETE,
    ADD,
    EDIT
}

const GameManagement: React.FC = () => {
    const [beginPeriodValue, setBeginPediodValue] = useState('')
    const [endPeriodValue, setEndPeriodValue] = useState('')
    const [games, setGames] = useState<TGame[]>([]);
    const [gameAction, setGameAction] = useState(GameAction.LIST_VIEW)
    const [gameToHandle, setGameToHandle] = useState<TGame | undefined>(undefined)
    const [gamesOnRequest, setGamesOnRequest] = useState<string[]>([])

    useEffect(() => {
        if (isDevMode) setGames(gamesListPopulate);
        else loadGamesFromBackend();
    }, []);

    async function loadGamesFromBackend() {
        let games: TGame[] = []
        try {
            const res = await api.get('/games');
            let gamesJSON = res.data as Array<any>;
            setGamesOnRequest(gamesJSON.filter(g => g.is_pending).map(g => g.name));
            games = TGameArrayFromJSON(gamesJSON);
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            toast.error("Erro " + status + "\n" + errorMsg);
        }
        setGames(games);
    }

    const handleEditGame = (game: TGame) => {
        setGameToHandle(game)
        setGameAction(GameAction.EDIT)
    }

    const handleDeleteGame = (game: TGame) => {
        setGameToHandle(game)
        setGameAction(GameAction.DELETE)
    }

    const onRequestOpen = async (game: TGame) => {
        try {
            let res;
            const userID = JSON.parse(localStorage.getItem('user') || '{}').id;
            if (gameAction === GameAction.ADD) {
                const gameCreate = TGameCreateFromGame(game, new Date(), userID)
                res = await api.post('/games', gameCreate);
            }
            else {
                res = await api.put('/games/' + game.id, game);
            }
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            toast.error("Erro " + status + "\n" + errorMsg);
        }

        setGamesOnRequest([...gamesOnRequest, game.name])
    }

    const deleteGame = async () => {
        try {
            const res = await api.delete('/games/' + gameToHandle?.id);
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            toast.error("Erro " + status + "\n" + errorMsg);
        }
        setGames(games.filter(g => g.id !== gameToHandle?.id));
    }

    const returnToMainPage = () => {
        setGameAction(GameAction.LIST_VIEW)
        setGameToHandle(undefined)
    }

    const handleRenovateGame = () => {
        
    }

    return (
        <div className="page dev_game_management">

            {gameAction === GameAction.DELETE ?
                <DeleteGame gameTitle={gameToHandle!.name}
                    onCancel={() => setGameAction(GameAction.LIST_VIEW)}
                    onDelete={() => deleteGame()}
                    onReturn={() => returnToMainPage()}
                />
                :
                gameAction === GameAction.EDIT ?
                    <AddEditGame gameItem={gameToHandle}
                        addRequest={onRequestOpen}
                        onReturn={() => returnToMainPage()}
                    />
                    :
                    gameAction === GameAction.ADD ?
                        <AddEditGame
                            addRequest={onRequestOpen}
                            onReturn={() => returnToMainPage()}
                        />
                        :
                        <>
                            <h1 className="page-title">Jogos</h1>

                            <h2 className="page-subtitle">Estatísticas</h2>

                            <div className="dev_game_management__statistics">

                                <TextInput text="Início do período" value={beginPeriodValue}
                                    onChange={newBeginPeriod => setBeginPediodValue(newBeginPeriod)} hasLabel
                                />

                                <TextInput text="Fim do período" value={endPeriodValue}
                                    onChange={newEndPeriod => setEndPeriodValue(newEndPeriod)} hasLabel
                                />

                                <DefaultButton text="Gerar relatório de vendas" colorClass="primary"
                                    onClick={() => console.log('gerar relatorio')}
                                />
                            </div>

                            <h2 className="page-subtitle">Meus Jogos</h2>

                            <div className="dev_game_management__game_list">

                                {games.map((game, index) =>

                                    <DevGameCard key={index} game={game}
                                        handleEditGame={() => handleEditGame(game)}
                                        handleDeleteGame={() => handleDeleteGame(game)}
                                        handleRenovateGame={() => handleRenovateGame()}
                                        onRequest={gamesOnRequest.includes(game.name)}
                                    />
                                )}

                                <DefaultButton
                                    text="Adicionar jogo"
                                    colorClass="primary"
                                    onClick={() => setGameAction(GameAction.ADD)}
                                />

                            </div>

                        </>
            }
        </div>
    )
}
export default GameManagement