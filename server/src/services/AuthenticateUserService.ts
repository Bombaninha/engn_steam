import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { GenerateRefreshToken } from '../providers/GenerateRefreshToken';

interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

interface ICreateRefreshTokenRequest {
    user_id: string;
}

class AuthenticateUserService {

    async execute({ email, password } : IAuthenticateUserRequest) {
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
        const token = sign({ id: user.id }, process.env.SECRET_KEY , { expiresIn: '20s' });

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(user.id);

        // 01:03:15
        return { token, refreshToken };
    }
}

export { AuthenticateUserService }