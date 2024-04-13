import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class Trip{

    @PrimaryGeneratedColumn()
    Id: number | undefined

    @Column()
    car: string | undefined

    @Column()
    driver: string | undefined

    @Column()
    startDate: string | undefined

    @Column()
    tripType: string | undefined

    @Column()
    startPlace: string | undefined

    @Column()
    endPlace: string | undefined

    @Column()
    distance: number | undefined

    @Column()
    newMileage: number | undefined

}