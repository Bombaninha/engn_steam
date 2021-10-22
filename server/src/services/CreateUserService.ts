import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../repositories/UsersRepositories";
import { RolesRepositories } from "../repositories/RolesRepositories";

import { hash } from "bcryptjs";

interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
    roleId: string;
}

class CreateUserService {
    
    async execute({ name, email, password, roleId } : ICreateUserRequest) {
        const rolesRepositories = getCustomRepository(RolesRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        if(!email) {
            throw new Error("Incorrect Email");
        }

        if(!password) {
            throw new Error("Incorrect Password");
        }

        if(!roleId) {
            throw new Error("Incorrect RoleId");
        }

        // Validação: Verificando se existe algum usuário com o mesmo email
        const userEmailAlreadyExists = await usersRepositories.findOne({
            email
        });

        if(userEmailAlreadyExists) {
            throw new Error("UserEmail already exists");
        }

        // Validação: Verificando se a role indicada existe
        const userRoleExists = await rolesRepositories.findOne(roleId);

        if(!userRoleExists) {
            throw new Error("User Role does not exists!");
        }

        const passwordHash = await hash(password, 8);
        
        const user = usersRepositories.create({
            name, 
            email, 
            password: passwordHash, 
            role: userRoleExists
        });

        await usersRepositories.save(user);

        return user;

    }
}

export { CreateUserService }