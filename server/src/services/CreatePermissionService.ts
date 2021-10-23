import { getCustomRepository } from "typeorm";
import { PermissionsRepositories } from "../repositories/PermissionsRepositories";

interface ICreatePermissionRequest {
    name: string;
}

class CreatePermissionService {
    async execute({ name } : ICreatePermissionRequest) {
        const permissionsRepository = getCustomRepository(PermissionsRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        // Validação: Verificando se existe alguma role com o mesmo nome
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