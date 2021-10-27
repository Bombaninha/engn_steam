import { MigrationInterface, QueryRunner} from "typeorm";

import { User } from "../../entities/User";

//import { UsersSeed } from "../seeds/UsersDataSeed";

export class CreateUsersSeed1635295748438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.manager.save(User, UsersSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}