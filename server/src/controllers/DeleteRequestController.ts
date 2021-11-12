import { Request, Response } from 'express';

import { DeleteRequestService } from '../services/DeleteRequestService';

class DeleteRequestController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        
        const deleteRequestService = new DeleteRequestService();

        const requestReturn = await deleteRequestService.execute({ id });
        
        return response.json(requestReturn);
    }
}

export { DeleteRequestController }