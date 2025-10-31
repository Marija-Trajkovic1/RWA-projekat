import { Attraction } from "src/attractions/attraction.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 

@Entity()
export class Place{
    @PrimaryGeneratedColumn()
    id:number;
   
    @Column()
    placeName:string;

    @Column({ type: 'double precision', nullable: true })
    latitude: number;

    @Column({ type: 'double precision', nullable: true })
    longitude: number;

    @OneToMany(()=>Attraction, (attraction)=>attraction.place)
    attractions: Attraction[];
}