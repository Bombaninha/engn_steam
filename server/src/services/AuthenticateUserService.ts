import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from "../repositories/UsersRepositories";
import { RefreshTokenRepositories } from "../repositories/RefreshTokenRepositories";

import { compare } from 'bcryptjs';

import { GenerateRefreshTokenProvider } from '../providers/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../providers/GenerateTokenProvider';


interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password } : IAuthenticateUserRequest) {
        const refreshTokenRepository = getCustomRepository(RefreshTokenRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories)

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect"); 
        }

        // Gerar token
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(user.id);

        await refreshTokenRepository.delete({
            user_id: user.id
        });

        const generateRefreshToken = new GenerateRefreshTokenProvider();
        const refreshToken = await generateRefreshToken.execute(user.id);

        const role = await usersRepositories.findOne({
            id: user.id 
        }, { relations: ["role"] });

        return { token, refreshToken, role : role.role.label };
    }
}

export { AuthenticateUserService }