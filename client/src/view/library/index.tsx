import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FilterByCategory from '../../components/filter_by_category'
import GameItem from '../../components/GameItem';
import Sorter from '../../components/sort_by';
import { API_URL } from '../../constant/api';
import SortEnum from '../../types/SortByEnum';
import { TGameArrayFromJSON, TPurchasedGame, TPurchasedGameArrayFromJSON } from '../../types/TGame';
import { LibraryContainer, ToolsContainer } from './styles';

// function loadGamesBoughtFromLocalStorage(): TPurchasedGame[] {
//     const gamesBoughtFromStorage = localStorage.getItem('games-bought')
//     let gamesBought = [];
//     if (gamesBoughtFromStorage)
//         gamesBought = JSON.parse(gamesBoughtFromStorage);
//     return gamesBought;
// }

function getCategoriesFromGames(games: TPurchasedGame[]): string[] {
    let categories = new Set<string>();
    for (let game of games)
        game.game.categories.forEach(c => categories.add(c));
    return Array.from(categories);
}

const Library: React.FC = () => {
    const [games, setGames] = useState<TPurchasedGame[]>([]);
    const [categories, setCategories] = useState<string[]>(getCategoriesFromGames(games))
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [sort, setSelectedSort] = useState<SortEnum>(SortEnum.ALPHABETICAL_ASC)

    async function loadGamesBoughtFromBackend() {
        let games: TPurchasedGame[] = []
        try {
            const gamesJSON = await axios.get(API_URL + '/v1/games');
            console.log(gamesJSON);
            const gamesArray = TGameArrayFromJSON(gamesJSON.data as Array<any>);

            const res = await axios.get(API_URL + '/v1/buys');
            console.log(res);
            const purchasedGames = TPurchasedGameArrayFromJSON(gamesArray, res.data as Array<any>);
            setCategories(getCategoriesFromGames(purchasedGames));
            games = purchasedGames;
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            alert("Erro " + status + "\n" + errorMsg);
        }
        setGames(games);
    }

    useEffect(() => {
        loadGamesBoughtFromBackend();
    }, [])

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
            <h1 className="page-title">Biblioteca</h1>

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