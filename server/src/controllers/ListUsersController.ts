import { Request, Response } from 'express';
import { ListUsersService } from '../services/ListUsersService';

class ListUsersController {
    async handle(request: Request, response: Response) {
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute();

        console.log(users[0].refreshToken);
        return response.json(users);
    }
}

export { ListUsersController }