import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToPlain } from 'class-transformer';

class ListUsersService {

    async execute() {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //const questions = await questionRepository.find({ relations: ["categories"] });
        //const users = await usersRepositories.find( { relations: ["role"] });
        const users = await usersRepositories.find();

        return classToPlain(users);
    }
}

export { ListUsersService }