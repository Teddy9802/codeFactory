import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
  // 1) 길이가 20을 넘지 않음.
  // 2) 유일무이한 값
  nickname: string;

  @Column({
    unique: true,
  })
  // 1) 유일무이한 값
  email: string;

  @Column()
  password: string;
}
