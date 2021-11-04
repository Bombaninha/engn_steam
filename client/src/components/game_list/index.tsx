import React, { useEffect, useState } from 'react'
import SearchBar from '../search_bar'
import GameItem from '../GameItem'
import { TGame, TGameArrayFromJSON } from '../../types/TGame'
import './styles.css'
import axios from 'axios'
import { API_URL } from '../../constant/api'

// const getGamesBought = () => {
//     const gamesBought = localStorage.getItem('games-bought')
//     return gamesBought ? JSON.parse(gamesBought) : []
// }

interface GameListProps {
    onClick: (value: TGame | null) => void
}

const GameList: React.FC<GameListProps> = ({ onClick }) => {
    const [searchText, setSearchText] = useState<string>('')
    // const gamesBought: string[] = getGamesBought()
    const [games, setGames] = useState<TGame[]>([]); // gamesListPopulate.filter(game => !gamesBought.includes(game.name)

    async function loadGamesFromBackend() {
        let games: TGame[] = []
        try {
            const res = await axios.get(API_URL + '/v1/games');
            console.log(res);
            games = TGameArrayFromJSON(res.data as Array<any>);
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            alert("Erro " + status + "\n" + errorMsg);
        }
        setGames(games);
    }

    useEffect(() => {
        loadGamesFromBackend();
    }, [])

    const handleClick = (gameInfo: TGame | null) => {
        onClick(gameInfo)
    }

    return (
        <div className="game-list-box">
            <div className="header-wrapper">
                <h1 className="page-title">Loja</h1>
                <SearchBar placeholder="Busque jogos..." onChange={value => setSearchText(value.toLowerCase())} />
            </div>
            <div>
                {games.filter(game => game.name.toLowerCase().includes(searchText)).map(game => <GameItem key={game.id} game={game} withButton onClick={handleClick} />)}
            </div>
        </div >
    )
}
export default GameList