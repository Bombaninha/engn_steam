import { EntityRepository, Repository } from "typeorm";
import { RequestType } from "../entities/RequestType"

@EntityRepository(RequestType)
class RequestTypesRepositories extends Repository<RequestType>{}

export { RequestTypesRepositories };