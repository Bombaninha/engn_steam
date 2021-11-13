import { EntityRepository, Repository } from "typeorm";
import { RequestUser } from "../entities/RequestUser"

@EntityRepository(RequestUser)
class RequestsRepositories extends Repository<RequestUser>{}

export { RequestsRepositories };