import { getCustomRepository } from 'typeorm';
import { RolesRepositories } from '../repositories/RolesRepositories';
import { classToPlain } from 'class-transformer';

class ListRolesService {

    async execute() {
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const roles = await rolesRepositories.find();
        // colocar info fora do banco
        //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}))

        return classToPlain(roles);
    }
}

export { ListRolesService }