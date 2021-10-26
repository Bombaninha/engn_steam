import { getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { RoleSeed } from "../seeds/RolesDataSeed";

export class CreateRolesSeed1635204730457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await getRepository("roles").save(
        //    RoleSeed
        //);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}