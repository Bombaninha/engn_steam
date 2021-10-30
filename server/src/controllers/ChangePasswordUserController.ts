import { Request, Response } from 'express';
import { ChangePasswordUserService } from '../services/ChangePasswordUserService';

class ChangePasswordUserController {
    async handle(request: Request, response: Response) {
        const { email, password, redefine_password_token } = request.body

        const changePasswordUserService = new ChangePasswordUserService();

        const changePassword = await changePasswordUserService.execute({ email, password, redefine_password_token });

        return response.json(changePassword);
    }
}

export { ChangePasswordUserController }