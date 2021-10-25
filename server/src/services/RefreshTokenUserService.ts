import dayjs from "dayjs";

import { getCustomRepository } from "typeorm";
import { RefreshTokenRepositories } from "../repositories/RefreshTokenRepositories";
import { GenerateTokenProvider } from '../providers/GenerateTokenProvider';
import { GenerateRefreshTokenProvider } from "../providers/GenerateRefreshTokenProvider";

class RefreshTokenUserService {
    async execute(refresh_token: string) {
        const refreshTokenRepository = getCustomRepository(RefreshTokenRepositories);

        const refreshToken = await refreshTokenRepository.findOne({
            where: {
                id: refresh_token
            }
        });

        if(!refreshToken) {
            throw new Error("Refresh Token invalid");
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(parseInt(refreshToken.expires_in)));

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.user_id);

        if(refreshTokenExpired) {
            // Deletar todos refresh token 
            await refreshTokenRepository.delete({
                user_id: refreshToken.user_id
            });

            const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.user_id);

            return { token, refreshToken: newRefreshToken }
        }

        return { token }
    } 
}

export { RefreshTokenUserService }