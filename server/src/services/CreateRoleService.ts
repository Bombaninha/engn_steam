import { getCustomRepository } from "typeorm";
import { RolesRepositories } from "../repositories/RolesRepositories";

interface ICreateRoleRequest {
    name: string;
    label: string;
}

class CreateRoleService {
    async execute({ name, label } : ICreateRoleRequest) {
        const rolesRepository = getCustomRepository(RolesRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        if(!label) {
            throw new Error("Incorrect Label");
        }

        // Validação: Verificando se existe alguma role com o mesmo nome
        const roleAlreadyExists = await rolesRepository.findOne({
            name
        });

        if(roleAlreadyExists) {
            throw new Error("Role already exists");
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