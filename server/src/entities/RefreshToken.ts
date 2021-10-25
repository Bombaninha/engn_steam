import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("refresh_token")
class RefreshToken {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    expires_in: string;

    @Column()
    user_id: string;

    @OneToOne(() => User, user => user.refreshToken)
    @JoinColumn({ name: 'user_id' })
    user: User;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { RefreshToken };