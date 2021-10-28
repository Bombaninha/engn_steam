import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { hash } from "bcryptjs";

interface IUpdateUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}

class UpdateUserService {
    async execute({ id, name, email, password } : IUpdateUserRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        if(!id) {
            throw new Error("Incorrect Id");
        }

        // nenhuma alteração
        if(!name && !email && !password) {
            throw new Error('Nenhuma alteração identificada');
        }

        const userExists = await usersRepositories.findOne({
            id
        });

        if(!userExists) {
            throw new Error("User doesnt exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepositories.update({
            id: userExists.id
        }, {
            name: name ? name : userExists.name,
            email: email ? email : userExists.email,
            password: password ? passwordHash : userExists.password,
        });

        const userUpdated = await usersRepositories.find({
            id
        });

        return classToPlain(userUpdated);
    }
}

export { UpdateUserService }