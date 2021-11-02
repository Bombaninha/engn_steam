import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

import { BaseEntity } from "./BaseEntity";

@Entity("tickets")
class Ticket extends BaseEntity {

    @Column()
    description: string;

    @Column({ default: false })
    is_finished: boolean;
    
    @Column()
    user_id: string
    @ManyToOne(() => User, user => user.tickets)
    @JoinColumn({ name: 'role_id' })
    user: User;
    
}

export { Ticket };