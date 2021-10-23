import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermissionsTable1634862751883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "roles_permissions",
                columns: [
                    {
                        name: "role_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "permission_id",
                        type: "uuid",
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                        columnNames: ['role_id'],
                    },
                    {
                        referencedTableName: 'permissions',
                        referencedColumnNames: ['id'],
                        columnNames: ['permission_id'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles_permissions");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}