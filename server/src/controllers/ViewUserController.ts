import { Request, Response } from 'express';

import { ViewUserService } from '../services/ViewUserService';

class ViewUserController {
    async handle(request: Request, response: Response) {
        const { user_id } = request.body

        const viewUserService = new ViewUserService();

        const roles = await viewUserService.execute({ user_id });
        
        return response.json(roles);
    }
}

export { ViewUserController }