import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("refresh_token")
class RefreshToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    expires_in: string;

    @Column()
    userId: string;

    @OneToOne(() => User, user => user.refreshToken, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}

export { RefreshToken };