import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { TicketsRepositories } from "../repositories/TicketsRepositories";

import { hash } from "bcryptjs";

interface ICloseTicketRequest {
    id: string;
}

class CloseTicketService {
    async execute({ id } : ICloseTicketRequest) {
        const ticketsRepositories = getCustomRepository(TicketsRepositories)

        if(!id) {
            throw new Error("Incorrect Id");
        }

        const ticketExists = await ticketsRepositories.findOne({
            id
        });

        if(!ticketExists) {
            throw new Error("ticket doesnt exists");
        }

        const ticket = ticketsRepositories.update({
            id
        }, {
            is_finished: true
        });

        const ticketUpdated = await ticketsRepositories.find({
            id
        });

        return classToPlain(ticketUpdated);
    }
}

export { CloseTicketService }