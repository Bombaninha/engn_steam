import { Request, Response } from 'express';
import { CreateBuyTypeService } from '../services/CreateBuyTypeService';

class CreateBuyTypeController {
    async handle(request: Request, response: Response) {
        const { name } = request.body

        const createBuyTypeService = new CreateBuyTypeService();

        const buyType = await createBuyTypeService.execute({ name });

        return response.json(buyType);
    }
}

export { CreateBuyTypeController }