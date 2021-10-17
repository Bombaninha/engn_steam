import { Request, Response } from 'express';
import { ListRolesService } from '../services/ListRolesService';

class ListRolesController {
    async handle(request: Request, response: Response) {
        const listRolesService = new ListRolesService();

        const roles = await listRolesService.execute();

        return response.json(roles);
    }
}

export { ListRolesController }