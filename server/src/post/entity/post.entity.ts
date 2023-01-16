import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column()
  imageFile: string;

  @Column('longtext')
  text: string;

  @Column('simple-array', { nullable: true })
  commentIds: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: null })
  updatedAt: string;

  @Column({ type: 'timestamp', default: null })
  scheduledTime: Date;
}
