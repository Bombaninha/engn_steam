import { Request, Response } from 'express';
import { CreateBuyService } from '../services/CreateBuyService';

class CreateBuyController {
    async handle(request: Request, response: Response) {
        const { buy_type_id, buyer_id, receiver_id, card_id, game_id } = request.body

        const createBuyService = new CreateBuyService();

        const buy = await createBuyService.execute({ buy_type_id, buyer_id, receiver_id, card_id, game_id });

        return response.json(buy);
    }
}

export { CreateBuyController }