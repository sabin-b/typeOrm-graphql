import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field()
  @Column({ unique: true })
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ default: true })
  isActive?: boolean;

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  profile: Profile;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
