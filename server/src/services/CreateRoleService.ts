import { getCustomRepository } from "typeorm";
import { RolesRepositories } from "../repositories/RolesRepositories";

import { Role } from "../entities/Role";

import { BlankFieldError } from "../exceptions/BlankFieldError";
import { DuplicatedRegisterError } from "../exceptions/DuplicatedRegisterError";

type RoleRequest = {
    name: string;
    label: string;
}

class CreateRoleService {
    async execute({ name, label } : RoleRequest): Promise<Role | Error>{
        const rolesRepository = getCustomRepository(RolesRepositories)

        // Verificando se foi recebido o campo: Name
        if(!name) {
            throw new BlankFieldError("Incorrect Name");
        }

        // Verificando se foi recebido o campo: Label
        if(!label) {
            throw new BlankFieldError("Incorrect Label");
        }

        // Verificando se existe alguma role com o mesmo nome
        const roleAlreadyExistsName = await rolesRepository.findOne({
            name
        });

        if(roleAlreadyExistsName) {
            throw new DuplicatedRegisterError("Role already exists");
        }

        // Verificando se existe alguma role com o mesmo label
        const roleAlreadyExistsLabel = await rolesRepository.findOne({
            label
        });

        if(roleAlreadyExistsLabel) {
            throw new DuplicatedRegisterError("Role already exists");
        }

        const role = rolesRepository.create({
            name,
            label
        });

        await rolesRepository.save(role);

        return role;
    }
}

export { CreateRoleService }