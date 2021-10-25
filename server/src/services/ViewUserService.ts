import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToPlain } from 'class-transformer';

interface IViewUserRequest {
    user_id: string;
}

class ViewUserService {

    async execute({ user_id } : IViewUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            id: user_id
        }, { relations: ["role"] });

        return classToPlain(user);
    }
}

export { ViewUserService }