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

function getCategoriesFromGames(games: TPurchasedGame[]): string[] {
    let categories = new Set<string>();
    for (let game of games)
        game.game.categories.forEach(c => categories.add(c));
    return Array.from(categories);
}

const Library: React.FC = () => {
    const [games] = useState<TPurchasedGame[]>(loadGamesBoughtFromLocalStorage());
    const [categories] = useState<string[]>(getCategoriesFromGames(games))
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    function filterCategories(categories: string[], games: TPurchasedGame[]) {
        if (categories.length === 0)
            return games;
        return games.filter(g => g.game.categories.some(c => categories.includes(c)))
    }

    return (
        <div>
            <h1 className="page-title">Library</h1>

            <FilterByCategory
                categories={categories}
                onChange={newList => setSelectedCategories(newList)}
            />

            <div className="game-list-box">
                {filterCategories(selectedCategories, games)
                    .map(game =>
                        <GameItem
                            key={game.game.name}
                            game={game.game}
                            purchasedAt={game.purchasedAt}
                        />)}
            </div>
        </div>
    )
}

export default Library