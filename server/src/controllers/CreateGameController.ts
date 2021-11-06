import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { CreateGameService } from '../services/CreateGameService';

import { CreateRequestService } from '../services/CreateRequestService';

import { RequestTypesRepositories } from '../repositories/RequestTypesRepositories';

class CreateGameController {
    async handle(request: Request, response: Response) {
        const { name, price, description, release, categories, developers, is_pending } = request.body

        const createGameService = new CreateGameService();
        const createRequestService = new CreateRequestService();

        const requestTypesRepositories = getCustomRepository(RequestTypesRepositories);

        const game = await createGameService.execute({ name, price, description, release, categories, developers, is_pending });

        const requestType = await requestTypesRepositories.findOne({
            name: 'Adição'
        });

        const requestGame = await createRequestService.execute({ game_id: game.id, request_type_id: requestType.id });

        return response.json(game);
    }
}

export { CreateGameController }