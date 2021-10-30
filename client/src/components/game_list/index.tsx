import React, { useState } from 'react'
import SearchBar from '../search_bar'
import GameItem from '../GameItem'
import { TGame } from '../../types/TGame'
import { gamesListPopulate } from '../../constant/content'
import './styles.css'

const getGamesBought = () => {
    const gamesBought = localStorage.getItem('games-bought')
    return gamesBought ? JSON.parse(gamesBought) : []
}

interface GameListProps {
    onClick: (value: TGame | null) => void
}

const GameList: React.FC<GameListProps> = ({onClick}) => {
    const [searchText, setSearchText] = useState<string>('')
    const gamesBought:string[] = getGamesBought()  
    const [games] = useState<TGame[]>(gamesListPopulate.filter(game => !gamesBought.includes(game.name)));

    const handleClick = (
		gameInfo: TGame | null
	) => {
        onClick(gameInfo)
	}

    return (
        <div className="game-list-box">
            <div className="header-wrapper">
                <h1 className="page-title">Loja</h1>
                <SearchBar placeholder="Busque jogos..." onChange={value => setSearchText(value.toLowerCase())} />
            </div>
            <div>
                {games.filter(game => game.name.toLowerCase().includes(searchText)).map(game => <GameItem game={game} withButton onClick={handleClick} />)}
            </div>
        </div >
    )
}
export default GameList