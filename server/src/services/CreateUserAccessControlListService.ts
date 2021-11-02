/*
import { getCustomRepository } from "typeorm";
import { UsersRepositories} from "../repositories/UsersRepositories";
import { PermissionsRepositories } from "../repositories/PermissionsRepositories";
import { RolesRepositories } from "../repositories/RolesRepositories";

import { User } from "../entities/User";

type UserACLRequest = {
    user_id: string;
    roles: string[];
    permissions: string[];
}

class CreateUserAccessControlListService {
    async execute({ user_id, roles, permissions } : UserACLRequest): Promise<User | Error>{
        const usersRepositories = getCustomRepository(UsersRepositories)
        const permissionsRepositories = getCustomRepository(PermissionsRepositories);
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const user = await usersRepositories.findOne(user_id);

        if(!user) {
            throw new Error("User does not exists!");
        }

        const permissionsExists = await permissionsRepositories.findByIds(permissions);

        const rolesExists = await permissionsRepositories.findByIds(roles);

        //user.permissions
    }
}

export { CreateUserAccessControlListService }
*/