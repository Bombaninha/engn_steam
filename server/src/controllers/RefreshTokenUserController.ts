import { Request, Response } from 'express';
import { RefreshTokenUserService } from '../services/RefreshTokenUserService';

class RefreshTokenUserController {
    async handle(request: Request, response: Response) {
        const { refresh_token } = request.body

        const refreshTokenUserService = new RefreshTokenUserService();

        const token = await refreshTokenUserService.execute(refresh_token);

        return response.json(token);
    }
}

export { RefreshTokenUserController }