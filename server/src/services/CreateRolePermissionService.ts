import { getCustomRepository } from "typeorm";

import { PermissionsRepositories } from "../repositories/PermissionsRepositories";
import { RolesRepositories } from "../repositories/RolesRepositories";

import { Role } from "../entities/Role";

type RolePermissionRequest = {
    id: string;
    permissions: string[];
}

class CreateRolePermissionService {
    async execute({ id, permissions } : RolePermissionRequest): Promise<Role | Error> {
        const permissionsRepository = getCustomRepository(PermissionsRepositories)
        const rolesRepositories = getCustomRepository(RolesRepositories)

        const role = await rolesRepositories.findOne(id);

        if(!role) {
            throw new Error("Role does not exists");
        }

        const permissionsExists = await permissionsRepository.findByIds(permissions);

        role.permissions = permissionsExists;

        await rolesRepositories.save(role);

        return role;
    }
}

export { CreateRolePermissionService }