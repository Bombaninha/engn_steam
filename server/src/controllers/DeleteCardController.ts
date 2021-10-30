import { Request, Response } from 'express';

import { DeleteCardService } from '../services/DeleteCardService';

class DeleteCardController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        const deleteCardService = new DeleteCardService();

        const card = await deleteCardService.execute({ id });
        
        return response.json(card);
    }
}

export { DeleteCardController }