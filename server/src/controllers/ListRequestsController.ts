import { Request, Response } from 'express';

import { ListRequestsService } from '../services/ListRequestsService';

class ListRequestsController {
    async handle(request: Request, response: Response) {
        const listRequestsService = new ListRequestsService();

        const requests = await listRequestsService.execute();
        
        return response.json(requests);
    }
}

export { ListRequestsController }