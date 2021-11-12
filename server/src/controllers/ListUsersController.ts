import { Request, Response } from 'express';
import { ListUsersService } from '../services/ListUsersService';

class ListUsersController {
    async handle(request: Request, response: Response) {
        const { email } = request.query;

        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute({ email });

        return response.json(users);
    }
}

export { ListUsersController }