import { Request, Response } from 'express';

import { ListGamesService } from '../services/ListGamesService';

class ListGamesController {
    async handle(request: Request, response: Response) {
        const listGamesService = new ListGamesService();

        const game = await listGamesService.execute();
        
        return response.json(game);
    }
}

export { ListGamesController }