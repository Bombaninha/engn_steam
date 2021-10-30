import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Request } from "./Request";

@Entity("request_types")
class RequestType {

    @PrimaryColumn()
    readonly id: string;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @OneToMany(() => Request, request => request.requestType)    
    requests: Request[];

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { RequestType };