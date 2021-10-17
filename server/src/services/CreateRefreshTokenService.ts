import { getCustomRepository } from "typeorm";
import { RefreshTokenRepositories } from "../repositories/RefreshTokenRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ICreateRefreshTokenRequest {
    user_id: string;
    expiresIn: number;
}

class CreateRefreshTokenService {
    async execute({ user_id, expiresIn } : ICreateRefreshTokenRequest) {
        const userRepository = getCustomRepository(UsersRepositories);
        const refreshTokenRepository = getCustomRepository(RefreshTokenRepositories);
        
        // Validação: Verificando se todos os campos foram recebidos
        if(!user_id) {
            throw new Error("Incorrect UserId");
        }

        if(!expiresIn) {
            throw new Error("Incorrect ExpiresIn");
        }

        // Validação: Verificando se existe alguma role com o mesmo nome
        const userExists = await userRepository.findOne({
            id: user_id
        });

        if(!userExists) {
            throw new Error("User doesn't exists");
        }

        const refreshToken = refreshTokenRepository.create({
            user_id,
            expires_in: expiresIn.toString()
        });

        await refreshTokenRepository.save(refreshToken);

        return refreshToken;
    }
}

export { CreateRefreshTokenService }