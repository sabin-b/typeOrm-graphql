import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ObjectIdColumn, OneToOne } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Profile {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field()
  @Column({ nullable: false })
  gender: "Male" | "Female" | "Others";

  @Field({ nullable: true })
  @Column({ nullable: true })
  skill?: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
