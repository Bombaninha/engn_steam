import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId: string) {
        const token = sign(
            { id: userId }, 
            process.env.SECRET_KEY, 
            { expiresIn: '20s' }
        );

        return token;
    }
}

export { GenerateTokenProvider }