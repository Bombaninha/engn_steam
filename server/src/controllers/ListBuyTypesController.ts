import { Request, Response } from 'express';
import { ListBuyTypesService } from '../services/ListBuyTypesService';

class ListBuyTypesController {
    async handle(request: Request, response: Response) {
        const listBuyTypes = new ListBuyTypesService();

        const buyTypes = await listBuyTypes.execute();

        return response.json(buyTypes);
    }
}

export { ListBuyTypesController }