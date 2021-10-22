import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity("roles")
class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;

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
    @JoinTable()
    permissions: Permission[];
    
    /*
    addPermission(permission: Permission) {
        if(this.permissions == null) {
            this.permissions = new Array<Permission>();
        }
        this.permissions.push(permission);
    }
    */
}

export { Role };