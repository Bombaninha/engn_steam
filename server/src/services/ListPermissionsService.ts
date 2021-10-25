import { getCustomRepository } from 'typeorm';
import { PermissionsRepositories } from '../repositories/PermissionsRepositories';
import { classToPlain } from 'class-transformer';

class ListPermissionsService {

    async execute() {
        const permissionsRepositories = getCustomRepository(PermissionsRepositories);

        const permissions = await permissionsRepositories.find();

        return classToPlain(permissions);
    }
}

export { ListPermissionsService }