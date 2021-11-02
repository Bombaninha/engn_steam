import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

import { BaseEntity } from "./BaseEntity";

@Entity("roles")
class Role extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    label: string;

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
    /*
    @JoinTable({
        name: "roles_permissions",
        joinColumns: [{ name: "role_id" }],
        inverseJoinColumns: [{ name: "permission_id" }]
    })
    */
}

export { Role };