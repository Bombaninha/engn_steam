import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToPlain } from 'class-transformer';

class ListUsersService {

    async execute() {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const users = await usersRepositories.find();
        // colocar info fora do banco
        //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}))

        return classToPlain(users);
    }
}

export { ListUsersService }