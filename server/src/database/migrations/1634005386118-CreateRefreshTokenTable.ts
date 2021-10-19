import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokenTable1634005386118 implements MigrationInterface {

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
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("refresh_token");        
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("FKUserRefreshToken", foreignKey);
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}