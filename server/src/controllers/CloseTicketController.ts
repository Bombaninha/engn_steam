import { Request, Response } from 'express';
import { CloseTicketService } from '../services/CloseTicketService';

class CloseTicketController {
    async handle(request: Request, response: Response) {
        const { id } = request.body

        const closeTicketService = new CloseTicketService();

        const ticket = await closeTicketService.execute({ id });

        return response.json(ticket);
    }
}

export { CloseTicketController }