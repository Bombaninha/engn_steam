import { Request, Response } from 'express';

import { DeleteGameService } from '../services/DeleteGameService';

class DeleteGameController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        const deleteGameService = new DeleteGameService();

        const game = await deleteGameService.execute({ id });
        
        return response.json(game);
    }
}

export { DeleteGameController }