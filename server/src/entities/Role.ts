import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity("roles")
class Role {

    @PrimaryColumn()
    readonly id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    label: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => User, user => user.role)    
    users: User[];

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: "roles_permissions",
        joinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "permission_id",
            referencedColumnName: "id"
        }
    })
    permissions: Permission[];
    
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Role };