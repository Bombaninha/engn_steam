import { getCustomRepository } from 'typeorm';
import { RolesRepositories } from '../repositories/RolesRepositories';
import { classToPlain } from 'class-transformer';

interface IViewRoleRequest {
    id: string;
}

class ViewRoleService {

    async execute({ id } : IViewRoleRequest) {
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const role = await rolesRepositories.findOne({
            id
        }, { relations: ["permissions"] });

        return classToPlain(role);
    }
}

export { ViewRoleService }