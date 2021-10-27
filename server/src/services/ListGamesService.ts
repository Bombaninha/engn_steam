import { getCustomRepository } from 'typeorm';
import { GamesRepositories } from '../repositories/GamesRepositories';
import { classToPlain } from 'class-transformer';

interface IQueryParamsGameRequest {
    name?: string | any;
    category?: string[] | any;
}

class ListGamesService {

    async execute({ name, category } : IQueryParamsGameRequest) {

        const gamesRepositories = getCustomRepository(GamesRepositories);

        const games = await gamesRepositories.find({ relations: ["categories", "users"]});

        const gamesFilteredByName = name 
            ? games.filter(game => game.name.includes(name))
            : games;

        // Somente uma categoria foi fornecida
        if(typeof category === 'string') {
            category = [category];
        }

        const gamesFilteredByCategory = category
            ? gamesFilteredByName.filter(game => game.categories.length === category.length && game.categories.every(v => category.includes(v.id)))
            : gamesFilteredByName;



        return classToPlain(gamesFilteredByCategory);
    }
}

export { ListGamesService }