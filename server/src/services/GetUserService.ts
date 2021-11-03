import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToPlain } from 'class-transformer';

interface UserRequest {
    id: string;
}

class GetUserService {

    async execute({ id } : UserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            id
        }, { relations: ["role"] });

        return classToPlain(user);
    }
}

export { GetUserService }