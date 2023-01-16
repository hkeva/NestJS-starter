import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isMuted: boolean;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: null })
  emailVerificationToken: string;

  @Column({ type: 'timestamp', default: null })
  emailVerificationTokenExpiredAt: Date;
}
