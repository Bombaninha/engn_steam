import { getCustomRepository } from "typeorm";

import { BuyTypesRepositories } from "../repositories/BuyTypesRepositories";

import { classToPlain } from 'class-transformer';

interface ICreateBuyTypeRequest {
    name: string;
}

class CreateBuyTypeService {
    async execute({ name } : ICreateBuyTypeRequest) {
        const buyTypesRepositories = getCustomRepository(BuyTypesRepositories);

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }
        
        const buyTypeExists = await buyTypesRepositories.findOne({
            name
        });

        if(buyTypeExists) {
            throw new Error("Buy Type already exists!");
        }

        const buyType = buyTypesRepositories.create({
            name
        });

        await buyTypesRepositories.save(buyType);

        return classToPlain(buyType);

    }
}

export { CreateBuyTypeService }