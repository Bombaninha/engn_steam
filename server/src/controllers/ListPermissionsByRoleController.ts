// NAO SEI SE É UMA BOA IDEIA
import { Request, Response } from 'express';

import { ViewRoleService } from '../services/ViewRoleService';

class ViewRoleController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        const viewRoleService = new ViewRoleService();

        const roles = await viewRoleService.execute({ id });
        
        return response.json(roles);
    }
}

export { ViewRoleController }