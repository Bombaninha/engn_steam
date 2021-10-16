import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o Token
    const authToken = request.headers.authorization;
    
    // Validar se o token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }
    
    const [,token] = authToken.split(" ");

    try {
        // Validar se o token é válido
        const { id } = verify(token, process.env.SECRET_KEY) as ITokenPayload;

        request.user_id = id;

        return next();
    } catch(err) {
        return response.status(401).end();
    }
    
    //verify(token)
    // Recuperar informações do usuário 
}