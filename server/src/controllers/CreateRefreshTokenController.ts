import { Request, Response } from 'express';
import { CreateRefreshTokenService } from '../services/CreateRefreshTokenService';

class CreateRefreshTokenController {
    async handle(request: Request, response: Response) {
        const { user_id } = request.body

        const createRefreshTokenService = new CreateRefreshTokenService();

        const refreshToken = await createRefreshTokenService.execute({ user_id });

        return response.json(refreshToken);
    }
}

export { CreateRefreshTokenController }