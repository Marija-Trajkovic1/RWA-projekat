import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VisitedAttraction } from 'src/visited-attractions/visited-attractions.entity';
import { SavedAttraction } from 'src/saved-attractions/saved-attractions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({unique:true})
  email: string;

  @Column()
  password:string;

  @Column()
  username: string;

  @OneToMany(()=>VisitedAttraction, (visited)=>visited.user )
  visitedAttractions: VisitedAttraction[];

  @OneToMany(()=>SavedAttraction, (saved)=>saved.user)
  savedAttractions: SavedAttraction[];
}
