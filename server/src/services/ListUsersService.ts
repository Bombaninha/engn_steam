import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToPlain } from 'class-transformer';

type QueryParamsUserRequest = {
    email?: string | any;
}

class ListUsersService {

    async execute({ email } : QueryParamsUserRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const users = await usersRepositories.find();

        const usersFilteredByEmail = email 
            ? users.filter(user => user.email.includes(email))
            : users;

        return classToPlain(usersFilteredByEmail);
    }
}

export { ListUsersService }