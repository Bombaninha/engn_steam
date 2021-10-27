import { Request, Response } from 'express';
import { CreateGameService } from '../services/CreateGameService';

class CreateGameController {
    async handle(request: Request, response: Response) {
        const { name, price } = request.body

        const createGameService = new CreateGameService();

        const game = await createGameService.execute({ name, price });

        return response.json(game);
    }
}

export { CreateGameController }