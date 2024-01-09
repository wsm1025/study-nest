import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';
@Entity()
export class Sql {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户名', // 注释
    nullable: false, // 非空
    default: 'guest', // 默认值
  })
  name: string;

  @Column({
    select: true, // 查询时允许被选择
    comment: '密码',
    default: '123456',
    length: 50,
    nullable: false,
  })
  password: string;

  @Column()
  age: number;

  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: ['0', '1'],
    default: '0',
  })
  sex: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: Date;

  @Column({
    type: 'simple-array',
    comment: '朋友列表',
    nullable: false,
  })
  nameList: string[];

  @Column('simple-json')
  friends: {
    name: string;
    age: number;
  };
}
