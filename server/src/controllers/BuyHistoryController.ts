import { Request, Response } from 'express';
import { BuyHistoryService } from '../services/BuyHistoryService';

class BuyHistoryController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        const buyHistory = new BuyHistoryService();

        const buysHistory = await buyHistory.execute({ id });

        return response.json(buysHistory);
    }
}

export { BuyHistoryController }