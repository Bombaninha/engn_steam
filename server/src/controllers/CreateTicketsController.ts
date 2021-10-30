import { Request, Response } from 'express';
import { CreateTicketService } from '../services/CreateTicketService';

class CreateTicketsController {
    async handle(request: Request, response: Response) {
        const { description, user_id } = request.body

        const createTicketService = new CreateTicketService();

        const ticket = await createTicketService.execute({ description, user_id });

        return response.json(ticket);
    }
}

export { CreateTicketsController }