import { EntityRepository, Repository } from "typeorm";
import { Role } from "../entities/Role"

@EntityRepository(Role)
class RolesRepositories extends Repository<Role>{}

export { RolesRepositories };