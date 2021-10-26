import { Request, Response } from 'express';

import { ListBuysService } from '../services/ListBuysService';

class ListBuysController {
    async handle(request: Request, response: Response) {
        const listBuysService = new ListBuysService();

        const buys = await listBuysService.execute();
        
        return response.json(buys);
    }
}

export { ListBuysController }