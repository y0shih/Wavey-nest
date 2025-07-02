import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text', { array: true })
  artist: string[];

  @Column({ type: 'varchar', length: 255 })
  album: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  genre?: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'varchar', length: 5 })
  duration: string; // HH:MM format

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
