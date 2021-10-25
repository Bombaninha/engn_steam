import { Request, NextFunction, Response } from 'express';

import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '../repositories/UsersRepositories';
import { RolesRepositories } from '../repositories/RolesRepositories';

class CheckPermission {
    static ensureHasPermission(permission: string) {
        return async (request: Request, response: Response, next: NextFunction) => {
                const usersRepositories = getCustomRepository(UsersRepositories);
                const rolesRepositories = getCustomRepository(RolesRepositories);

                //const questions = await questionRepository.find({ relations: ["categories"] });
                //const users = await usersRepositories.find( { relations: ["role"] });
                const user = await usersRepositories.findOne({
                    id: request.user_id
                }, { relations: ['role'] });

                const role = await rolesRepositories.findOne({
                    id: user.role.id,
                }, { relations: ['permissions'] });

                const permissions = role.permissions.find(perm => perm.name === permission);
                
                if(!permissions) {
                    throw new Error("Your role doesnt have permission");
                } 

                return next();
        }
    }
}

export { CheckPermission }