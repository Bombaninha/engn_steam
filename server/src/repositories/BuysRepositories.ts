import { EntityRepository, Repository } from "typeorm";
import { Buy } from "../entities/Buy"

@EntityRepository(Buy)
class BuysRepositories extends Repository<Buy>{}

export { BuysRepositories };