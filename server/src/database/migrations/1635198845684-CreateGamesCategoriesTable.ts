import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGamesCategoriesTable1635198845684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "games_categories",
                columns: [
                    {
                        name: "game_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "category_id",
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
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        columnNames: ['category_id'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("games_categories");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}