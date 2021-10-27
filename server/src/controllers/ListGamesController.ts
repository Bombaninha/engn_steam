import { Request, Response } from 'express';

import { ListGamesService } from '../services/ListGamesService';

class ListGamesController {
    async handle(request: Request, response: Response) {
        const { name } = request.query;

        const listGamesService = new ListGamesService();

        const game = await listGamesService.execute({ name });
        
        return response.json(game);
    }
}

export { ListGamesController }