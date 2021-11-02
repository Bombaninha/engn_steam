import { Request, Response } from 'express';
import { CreateRoleService } from '../services/CreateRoleService';

class CreateRoleController {
    async handle(request: Request, response: Response) {
        const { name, label } = request.body

        const createRoleService = new CreateRoleService();

        const result = await createRoleService.execute({ name, label });

        return response.json(result);
    }
}

export { CreateRoleController }