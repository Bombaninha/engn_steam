import { EntityRepository, Repository } from "typeorm";
import { BuyType } from "../entities/BuyType"

@EntityRepository(BuyType)
class BuyTypesRepositories extends Repository<BuyType>{}

export { BuyTypesRepositories };