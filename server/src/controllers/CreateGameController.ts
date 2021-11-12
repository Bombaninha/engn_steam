import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { CreateGameService } from '../services/CreateGameService';

import { CreateRequestService } from '../services/CreateRequestService';

import { RequestTypesRepositories } from '../repositories/RequestTypesRepositories';
import { GamesRepositories } from '../repositories/GamesRepositories';

class CreateGameController {
    async handle(request: Request, response: Response) {
        const { name, price, description, release, categories, developers, is_pending } = request.body

        const createGameService = new CreateGameService();
        const createRequestService = new CreateRequestService();

        const gamesRepositories = getCustomRepository(GamesRepositories);
        const requestTypesRepositories = getCustomRepository(RequestTypesRepositories);

        const game = await createGameService.execute({ name, price, description, release, categories, developers, is_pending });

        const newGame = await gamesRepositories.findOne({
            name 
        });

        const requestType = await requestTypesRepositories.findOne({
            name: 'Adição'
        });

        const requestGame = await createRequestService.execute({ game_id: newGame.id, request_type_id: requestType.id });

        return response.json(game);
    }
}

export { CreateGameController }