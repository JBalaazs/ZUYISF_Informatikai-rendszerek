import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class Car{

    @PrimaryGeneratedColumn()
    Id: number | undefined
    
    @Column()
    license_plate: string | undefined

    @Column()
    model: string | undefined

    @Column()
    fuel: string | undefined

    @Column()
    consumption: number | undefined

    @Column()
    starting_mileage: number | undefined

}