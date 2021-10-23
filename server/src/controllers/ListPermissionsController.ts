import { Request, Response } from 'express';

import { ListPermissionsService } from '../services/ListPermissionsService';

class ListPermissionsController {
    async handle(request: Request, response: Response) {
        const listPermissionsService = new ListPermissionsService();

        const roles = await listPermissionsService.execute();
        
        return response.json(roles);
    }
}

export { ListPermissionsController }