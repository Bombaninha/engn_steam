import { Request, NextFunction, Response } from 'express';

import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '../repositories/UsersRepositories';
import { RolesRepositories } from '../repositories/RolesRepositories';

export function can(permissionRoutes: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const usersRepositories = getCustomRepository(UsersRepositories);
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const { user_id } = request;

        const user = await usersRepositories.findOne({
            where: { id: user_id },
            relations: [ "role" ]
        });

        if(!user) {
            throw new Error("User does not exists");
        }

        const role = await rolesRepositories.findOne({
            id: user.role.id,
        }, { relations: ['permissions'] });

        if(!role) {
            throw new Error("Role does not exists");
        }

        const hasPermission = role.permissions.find(permission => permission.name === permissionRoutes);

        if(!hasPermission) {
            throw new Error("Your role doesnt have permission");
        } 

        return next();
    }
}

export function is(roleRoutes: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const usersRepositories = getCustomRepository(UsersRepositories);
        const rolesRepositories = getCustomRepository(RolesRepositories);

        const { user_id } = request;

        const user = await usersRepositories.findOne({
            where: { id: user_id },
            relations: [ "role" ]
        });

        if(!user) {
            throw new Error("User does not exists");
        }
        
        if(user.role.label !== roleRoutes) {
            throw new Error("Your role doesnt have permission");
        } 

        return next();
    }
}

/*
export function can(permissionsRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const { user_id } = request;

        const user = await usersRepositories.findOne({
            where: { id: user_id },
            relations: [ "permissions" ]
        });

        if(!user) {
            throw new Error("User does not exists");
        }

        const permissionExists = user.permissions
        .map(permission => permission.name)
        .some(permission => permissionsRoutes.includes(permission));

        if(!permissionExists) {
            return response.status(401).end();
        }

        return next();
    }
}

export function is(rolesRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const { user_id } = request;

        const user = await usersRepositories.findOne({
            where: { id: user_id },
            relations: [ "roles" ]
        });

        if(!user) {
            throw new Error("User does not exists");
        }

        const permissionExists = user.roles
        .map(role => role.name)
        .some(role => rolesRoutes.includes(role));

        if(!permissionExists) {
            return response.status(401).end();
        }

        return next();
    }
}
*/