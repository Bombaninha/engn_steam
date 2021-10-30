import React, { useState } from 'react'
import FilterByCategory from '../../components/filter_by_category'
import GameItem from '../../components/GameItem';
import Sorter from '../../components/sort_by';
import SortEnum from '../../types/SortByEnum';
import { TPurchasedGame } from '../../types/TGame';
import { LibraryContainer, ToolsContainer } from './styles';

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
    const [sort, setSelectedSort] = useState<SortEnum>(SortEnum.ALPHABETICAL_ASC)

    function filterCategories(categories: string[], games: TPurchasedGame[]) {
        if (categories.length === 0)
            return games;
        return games.filter(g => g.game.categories.some(c => categories.includes(c)))
    }

    function compareDate(d1: Date, d2: Date): number {
        return (new Date(d1).getTime() - new Date(d2).getTime());
    }

    function SortBy(sort: SortEnum, games: TPurchasedGame[]): TPurchasedGame[] {
        console.log("SortBy= " + sort)
        if (sort === SortEnum.ALPHABETICAL_ASC)
            return games.sort((a, b) => a.game.name.localeCompare(b.game.name));
        if (sort === SortEnum.ALPHABETICAL_DESC)
            return games.sort((a, b) => b.game.description.localeCompare(a.game.description))
        if (sort === SortEnum.DATE_DESC)
            return games.sort((a, b) => compareDate(a.purchasedAt, b.purchasedAt));
        // if (sort === SortEnum.DATE_ASC)
        return games.sort((a, b) => compareDate(b.purchasedAt, a.purchasedAt));
    }

    return (
        <div>
            <h1 className="page-title">Library</h1>

            <LibraryContainer>
                <ToolsContainer>
                    <FilterByCategory
                        categories={categories}
                        onChange={newList => setSelectedCategories(newList)}
                    />

                    <Sorter
                        onChange={sort => setSelectedSort(sort)}
                    />
                </ToolsContainer>

                <div className="game-list-box">
                    {SortBy(sort,
                        filterCategories(selectedCategories, games))
                        .map(game =>
                            <GameItem
                                key={game.game.name}
                                game={game.game}
                                purchasedAt={game.purchasedAt}
                            />)}
                </div>
            </LibraryContainer>
        </div>
    )
}

export default Library