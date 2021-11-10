import { Request, Response } from 'express';

import { UpdateGameService } from '../services/UpdateGameService';

class UpdateGameController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const { is_pending, delete_request } = request.body;

        const updateGameService = new UpdateGameService();

        const game = await updateGameService.execute({ id, is_pending, delete_request });
        
        return response.json(game);
    }
}

export { UpdateGameController }