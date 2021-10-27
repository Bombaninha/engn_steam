import { getCustomRepository } from 'typeorm';
import { GamesRepositories } from '../repositories/GamesRepositories';
import { classToPlain } from 'class-transformer';

interface IQueryParamsGameRequest {
    name?: string | any;
}

class ListGamesService {

    async execute({ name } : IQueryParamsGameRequest) {
        const gamesRepositories = getCustomRepository(GamesRepositories);

        const games = await gamesRepositories.find({ relations: ["categories", "users"]});

        const results = name 
            ? games.filter(game => game.name.includes(name))
            : games;
        
        return classToPlain(results);
    }
}

export { ListGamesService }