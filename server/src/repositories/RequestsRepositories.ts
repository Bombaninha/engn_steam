import { EntityRepository, Repository } from "typeorm";
import { RequestUser } from "../entities/Request"

@EntityRepository(RequestUser)
class RequestsRepositories extends Repository<RequestUser>{}

export { RequestsRepositories };