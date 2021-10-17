import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "../entities/RefreshToken"

@EntityRepository(RefreshToken)
class RefreshTokenRepositories extends Repository<RefreshToken>{}

export { RefreshTokenRepositories };