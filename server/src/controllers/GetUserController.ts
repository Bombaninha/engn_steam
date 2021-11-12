import { Request, Response } from 'express';

import { GetUserService } from '../services/GetUserService';

class GetUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        const getUserService = new GetUserService();

        const roles = await getUserService.execute({ id });
        
        return response.json(roles);
    }
}

export { GetUserController }