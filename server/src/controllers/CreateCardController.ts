import { Request, Response } from 'express';
import { CreateCardService } from '../services/CreateCardService';

class CreateCardController {
    async handle(request: Request, response: Response) {
        const { name, number, security_code, validity_month, validity_year, is_credit_card, user_id } = request.body

        const createCardService = new CreateCardService();

        const role = await createCardService.execute({ name, number, security_code, validity_month, validity_year, is_credit_card, user_id });

        return response.json(role);
    }
}

export { CreateCardController }