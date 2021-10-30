import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "../entities/Ticket"

@EntityRepository(Ticket)
class TicketsRepositories extends Repository<Ticket>{}

export { TicketsRepositories };