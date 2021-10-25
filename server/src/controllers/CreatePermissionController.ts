import { Request, Response } from 'express';
import { CreatePermissionService } from '../services/CreatePermissionService';

class CreatePermissionController {
    async handle(request: Request, response: Response) {
        const { name } = request.body

        const createPermissionService = new CreatePermissionService();

        const permission = await createPermissionService.execute({ name });

        return response.json(permission);
    }
}

export { CreatePermissionController }