import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGamesDevelopersTable1635198861261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "games_developers",
                columns: [
                    {
                        name: "game_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'games',
                        referencedColumnNames: ['id'],
                        columnNames: ['game_id'],
                    },
                    {
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("games_developers");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}