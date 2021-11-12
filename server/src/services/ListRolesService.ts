import { getCustomRepository } from 'typeorm';
import { RolesRepositories } from '../repositories/RolesRepositories';
import { classToPlain } from 'class-transformer';

type QueryParamsRoleRequest = {
    label?: string | any;
}

class ListRolesService {

    async execute({ label } : QueryParamsRoleRequest) {
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const roles = await rolesRepositories.find();

        const rolesFilteredByLabel = label 
            ? roles.filter(role => role.label.includes(label))
            : roles;

        return classToPlain(rolesFilteredByLabel);
    }
}

export { ListRolesService }