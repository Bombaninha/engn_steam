import React, { useState } from 'react'
import SearchBar from '../search_bar'
import GameItem from '../GameItem'
import { TGame } from '../../types/TGame'
import './styles.css'
import { gamesListPopulate } from '../../constant/content'

const GameList: React.FC = () => {
    const [searchText, setSearchText] = useState<string | null>(null)
    const [games] = useState<TGame[]>(gamesListPopulate);

    return (
        <div className="game-list-box">
            <div className="header-wrapper">
                <h1 className="page-title">Loja</h1>
                <SearchBar placeholder="Busque jogos..." onChange={value => { console.log(searchText); setSearchText(value) }} />
            </div>

            <div>
                {games.map(game => <GameItem game={game} withButton={true}> </GameItem>)}
            </div>
        </div>
    )
}
export default GameList