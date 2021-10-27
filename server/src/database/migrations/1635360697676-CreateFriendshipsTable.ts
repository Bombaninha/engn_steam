
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFriendshipsTable1635360697676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "friendships",
                columns: [
                    {
                        name: "first_user_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "second_user_id",
                        type: "uuid",
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['first_user_id'],
                    },
                    {
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['second_user_id'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("friendships");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}