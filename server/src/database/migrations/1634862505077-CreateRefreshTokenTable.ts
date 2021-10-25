import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokenTable1634862505077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: "refresh_token",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "expires_in",
                        type: "int"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserRefreshToken",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("refresh_token");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
