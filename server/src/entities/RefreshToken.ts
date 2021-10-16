import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("refresh_token")
class RefreshToken {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    expires_in: string;

    @JoinColumn({ name: 'user_id' })
    @OneToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { RefreshToken };