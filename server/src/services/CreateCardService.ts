import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../repositories/UsersRepositories";
import { CardsRepositories } from "../repositories/CardsRepositories";

import { classToPlain } from 'class-transformer';

interface ICreateCardRequest {
    name: string;
    number: string;
    security_code: string;
    validity_month: string;
    validity_year: string;
    is_credit_card: boolean;
    user_id: string;
}

class CreateCardService {
    async execute({ name, number, security_code, validity_month, validity_year, is_credit_card, user_id } : ICreateCardRequest) {
        const cardsRepositories = getCustomRepository(CardsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        if(!number) {
            throw new Error("Incorrect Number");
        }

        if(!security_code) {
            throw new Error("Incorrect SecurityCode");
        }

        if(!validity_month) {
            throw new Error("Incorrect ValidityMonth");
        }

        if(!validity_year) {
            throw new Error("Incorrect ValidityYear");
        }

        if(!user_id) {
            throw new Error("Incorrect UserId");
        }      
        
        const userExists = await usersRepositories.findOne(user_id);

        if(!userExists) {
            throw new Error("User does not exists!");
        }

        const card = cardsRepositories.create({
            name, 
            number, 
            security_code, 
            validity_month, 
            validity_year, 
            is_credit_card,
            user_id
        });

        await cardsRepositories.save(card);

        return classToPlain(card);

    }
}

export { CreateCardService }