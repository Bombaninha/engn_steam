import { getCustomRepository } from "typeorm";
import { PermissionsRepositories } from "../repositories/PermissionsRepositories";

import { Permission } from "../entities/Permission";

type PermissionRequest = {
    name: string;
}

class CreatePermissionService {
    async execute({ name } : PermissionRequest): Promise<Permission | Error> {
        const permissionsRepository = getCustomRepository(PermissionsRepositories)

        // Verificando se foi recebido o campo: Name
        if(!name) {
            throw new Error("Incorrect Name");
        }

        // Verificando se existe alguma permissão com o mesmo nome
        const permissionAlreadyExists = await permissionsRepository.findOne({
            name
        });

        if(permissionAlreadyExists) {
            throw new Error("Permission already exists");
        }

        const permission = permissionsRepository.create({
            name
        });

        await permissionsRepository.save(permission);

        return permission;
    }
}

export { CreatePermissionService }