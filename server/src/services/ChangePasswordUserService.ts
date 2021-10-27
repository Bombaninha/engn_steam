import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { hash } from "bcryptjs";

interface IChangePasswordUserRequest {
    email: string;
    password: string;
    redefine_password_token: string;
}

class ChangePasswordUserService {
    async execute({ email, password, redefine_password_token } : IChangePasswordUserRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Invalid Email");
        }

        if(!password) {
            throw new Error("Invalid Password"); 
        }

        if(!redefine_password_token) {
            throw new Error("Invalid redefine_password_token"); 
        }

        const userExists = await usersRepositories.findOne({
            email
        });

        if(!userExists) {
            throw new Error("user email doesnt exists");
        }

        if(userExists.redefine_password_token === null) {
            throw new Error('Usuário não possui token de redefinição de senha');
        } 
        
        if(userExists.redefine_password_token !== redefine_password_token) {
            throw new Error('Token para email inválido')
        }

        const passwordHash = await hash(password, 8);
        
        if(userExists.password === passwordHash) {
            throw new Error('Same password');
        }

        const user = usersRepositories.update({ 
            id: userExists.id
        }, {
            password: passwordHash,
            redefine_password_token: null
        });

        return classToPlain(userExists);
    } 
}

export { ChangePasswordUserService }