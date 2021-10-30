export type TGame = {
    name: string;
    categories: string[],
    description: string;
    price: number;
    developer: string;
}

export type TPurchasedGame = {
    game: TGame;
    purchasedAt: Date;
}