import { Request, Response } from 'express';

import { ListRolesService } from '../services/ListRolesService';

class ListRolesController {
    async handle(request: Request, response: Response) {
        const { label } = request.query;
        //console.log(request.user_id);

        const listRolesService = new ListRolesService();

        const roles = await listRolesService.execute({ label });
        
        return response.json(roles);
    }
}

export { ListRolesController }