import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToPlain } from 'class-transformer';

interface IFriendsRequest {
    id: string;
    name?: string[] | any;
}

class ListUserFriendsService {

    async execute({ id, name } : IFriendsRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            relations: ["friends"],
            where: {
                id: id
            }
        });


        const friendsFilteredByName = name 
            ? user.friends.filter(friend => friend.name.includes(name))
            : user;

        return classToPlain(friendsFilteredByName);
    }
}

export { ListUserFriendsService }