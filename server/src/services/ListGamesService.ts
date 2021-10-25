import { getCustomRepository } from 'typeorm';
import { GamesRepositories } from '../repositories/GamesRepositories';
import { classToPlain } from 'class-transformer';

class ListGamesService {

    async execute() {
        const gamesRepositories = getCustomRepository(GamesRepositories);

        const games = await gamesRepositories.find({ relations: ["categories", "users"]});

        return classToPlain(games);
    }
}

export { ListGamesService }