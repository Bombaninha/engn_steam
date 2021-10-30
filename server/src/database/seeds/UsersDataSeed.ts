import { getCustomRepository } from 'typeorm';
import { RolesRepositories } from '../../repositories/RolesRepositories';

const rolesRepositories = getCustomRepository(RolesRepositories);

async function getUserData() {
    const role = rolesRepositories.findOne({
        label: "admin"
    });

    return role;
}