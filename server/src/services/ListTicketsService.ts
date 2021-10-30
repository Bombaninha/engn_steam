import { getCustomRepository } from 'typeorm';
import { TicketsRepositories } from '../repositories/TicketsRepositories';
import { classToPlain } from 'class-transformer';

class ListTicketsService {

    async execute() {
        const ticketsRepositories = getCustomRepository(TicketsRepositories);

        const tickets = await ticketsRepositories.find();

        return classToPlain(tickets);
    }
}

export { ListTicketsService }