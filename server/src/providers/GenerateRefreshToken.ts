import dayjs from 'dayjs';

import { CreateRefreshTokenService } from '../services/CreateRefreshTokenService';

class GenerateRefreshToken {

    async execute(user_id: string) {
        console.log("me chamou");
        const createRefreshTokenService = new CreateRefreshTokenService();

        const expiresIn = dayjs().add(15, "second").unix();
        const generateRefreshToken = await createRefreshTokenService.execute({ user_id, expiresIn });

        return generateRefreshToken;
    } 
}

export { GenerateRefreshToken }