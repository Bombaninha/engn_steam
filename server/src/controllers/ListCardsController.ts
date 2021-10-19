import { Request, Response } from 'express';
import { ListCardsService } from '../services/ListCardsService';

class ListCardsController {
    async handle(request: Request, response: Response) {
        const listCardsService = new ListCardsService();

        const cards = await listCardsService.execute();

        return response.json(cards);
    }
}

export { ListCardsController }