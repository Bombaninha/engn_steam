import React, { useState } from 'react'
import FilterByCategory from '../../components/filter_by_category'
import GameItem from '../../components/GameItem';
import { TPurchasedGame } from '../../types/TGame';

function loadGamesBoughtFromLocalStorage(): TPurchasedGame[] {
    const gamesBoughtFromStorage = localStorage.getItem('games-bought')
    let gamesBought = [];
    if (gamesBoughtFromStorage)
        gamesBought = JSON.parse(gamesBoughtFromStorage);
    return gamesBought;
}

const Library: React.FC = () => {
    const [games] = useState<TPurchasedGame[]>(loadGamesBoughtFromLocalStorage());
    const [currentCategories, setCurrentCategories] = useState<string[]>([])

    return (
        <div>
            <h1 className="page-title">Library</h1>

            <FilterByCategory categories={[{ id: 'c1', label: 'categoria 1' }, { id: 'c2', label: 'categoria 2' }]} onChange={newList => { console.log(currentCategories); setCurrentCategories(newList) }} />

            <div className="game-list-box">
                {games.map(game => <GameItem game={game.game} purchasedAt={game.purchasedAt} />)}
            </div>
        </div>
    )
}

export default Library