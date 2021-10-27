import { MigrationInterface, QueryRunner} from "typeorm";

import { Role } from "../../entities/Role";

import { RolesDataSeed } from "../seeds/RolesDataSeed";

export class CreateRolesSeed1635204730457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(Role, RolesDataSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}