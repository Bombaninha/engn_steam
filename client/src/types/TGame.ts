export type TGame = {
    id: string,
    name: string;
    categories: string[],
    description: string;
    price: number;
    developer: string;
}

export function TGameArrayFromJSON(gamesJSON: Array<any>): TGame[] {
    gamesJSON.map(g => (g.categories as Array<any>).forEach((c, i) => g.categories[i] = c.name));
    return (gamesJSON as TGame[]);
}

export type TPurchasedGame = {
    game: TGame;
    purchasedAt: Date;
}

export function TPurchasedGameArrayFromJSON(gamesJSON: Array<any>, purchJSON: Array<any>): TPurchasedGame[] {
    const purchasedGames: TPurchasedGame[] = [];

    const purchGamesID: string[] = purchJSON.filter(g => !(g.receiver_id)).map(g => g.game_id);
    gamesJSON = gamesJSON.filter(g => purchGamesID.includes(g.id));

    gamesJSON.forEach(g => {
        const game: TGame = { name: g.name, categories: g.categories, id: g.id, description: g.description, developer: g.developer, price: g.price };
        const purchasedGame: TPurchasedGame = { game: game, purchasedAt: g.created_at } // wrong purchasedAt
        purchasedGames.push(purchasedGame);
    });

    console.log(purchasedGames);
    return purchasedGames;
}
