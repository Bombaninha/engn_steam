import { Request, Response } from 'express';

import { ListTicketsService } from '../services/ListTicketsService';

class ListTicketsController {
    async handle(request: Request, response: Response) {
        const listTicketsService = new ListTicketsService();

        const tickets = await listTicketsService.execute();
        
        return response.json(tickets);
    }
}

export { ListTicketsController }