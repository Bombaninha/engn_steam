import { getCustomRepository } from "typeorm";
import { TicketsRepositories } from "../repositories/TicketsRepositories";

interface ICreateTicketRequest {
    description: string;
    user_id: string;
}

class CreateTicketService {
    async execute({ description, user_id } : ICreateTicketRequest) {
        const ticketsRepository = getCustomRepository(TicketsRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!description) {
            throw new Error("Incorrect description");
        }

        if(!user_id) {
            throw new Error("Incorrect user_id");
        }

        const ticket = ticketsRepository.create({
            description,
            user_id
        });

        await ticketsRepository.save(ticket);

        return ticket;
    }
}

export { CreateTicketService }