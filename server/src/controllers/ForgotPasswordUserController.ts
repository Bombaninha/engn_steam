import { Request, Response } from 'express';
import { ForgotPasswordUserService } from '../services/ForgotPasswordUserService';

class ForgotPasswordUserController {
    async handle(request: Request, response: Response) {
        const { email } = request.body

        const forgotPasswordUserService = new ForgotPasswordUserService();

        const forgotPassword = await forgotPasswordUserService.execute(email);

        return response.json(forgotPassword);
    }
}

export { ForgotPasswordUserController }