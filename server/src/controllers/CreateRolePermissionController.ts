import { Request, Response } from 'express';
import { CreateRolePermissionService } from '../services/CreateRolePermissionService';

class CreateRolePermissionController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { permissions } = request.body;

        const createRolePermissionService = new CreateRolePermissionService();

        const permission = await createRolePermissionService.execute({ id, permissions });

        return response.json(permission);
    }
}

export { CreateRolePermissionController }