
export type TGame = {
    title: string;
    categories: string[],
    description: string;
    price: number;
    developer: string;
}

export type TPurchasedGame = {
    game: TGame;
    purchasedAt: Date;
}