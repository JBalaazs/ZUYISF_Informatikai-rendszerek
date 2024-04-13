import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class User{
    
    @PrimaryGeneratedColumn()
    Id: number | undefined

    @Column()
    username: string | undefined

    @Column()
    password: string | undefined

}