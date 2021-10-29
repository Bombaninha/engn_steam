import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity("tickets")
class Ticket {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    description: string;

    @Column({ default: false })
    is_finished: boolean;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    user_id: string
    @ManyToOne(() => User, user => user.tickets)
    @JoinColumn({ name: 'role_id' })
    user: User;
    
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Ticket };