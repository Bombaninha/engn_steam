import { getCustomRepository } from 'typeorm';
import { RolesRepositories } from '../repositories/RolesRepositories';
import { classToPlain } from 'class-transformer';

class ListRolesService {

    async execute() {
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const roles = await rolesRepositories.find();

        return classToPlain(roles);
    }
}

export { ListRolesService }