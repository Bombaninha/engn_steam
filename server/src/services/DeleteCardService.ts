import { getCustomRepository } from "typeorm";
import { CardsRepositories } from "../repositories/CardsRepositories";

interface IDeleteCardRequest {
    id: string;
}

class DeleteCardService {
    async execute({ id } : IDeleteCardRequest) {
        const cardsRepositories = getCustomRepository(CardsRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!id) {
            throw new Error("Incorrect Id");
        }

        const cardExists = await cardsRepositories.findOne({
            id
        });

        if(!cardExists) {
            throw new Error("Card doesnt exists");
        }

        const card = cardsRepositories.delete({
            id
        });

        return cardExists;
    }
}

export { DeleteCardService }