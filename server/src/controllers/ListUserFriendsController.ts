import { Request, Response } from 'express';
import { ListUserFriendsService } from '../services/ListUserFriendsService';

class ListUserFriendsController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const { name } = request.query;

        const listUserFriends = new ListUserFriendsService();

        const userFriends = await listUserFriends.execute({ id, name });

        return response.json(userFriends);
    }
}

export { ListUserFriendsController }