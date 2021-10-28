import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToMany, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Game } from "./Game";
import { RequestType } from "./RequestType";

@Entity("requests")
class Request {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    request_type_id: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @ManyToOne(() => RequestType, requestType => requestType.requests)
    @JoinColumn({ name: 'request_type_id' })
    requestType: RequestType;

    @Column()
    game_id: string;
    @OneToOne(() => Game, game => game.request) 
    @JoinColumn({ name: 'game_id' })
    game: Game;
    
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Request };