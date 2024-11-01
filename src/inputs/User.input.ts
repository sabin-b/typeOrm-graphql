import { Field, InputType } from "type-graphql";

@InputType()
export class BaseUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ defaultValue: true })
  isActive?: boolean;
}

// Extends BaseUserInput for creating a user without profile
@InputType()
export class CreateUserInput extends BaseUserInput {}

// Extends BaseUserInput and adds profile-specific fields
@InputType()
export class CreateUserWithProfile extends BaseUserInput {
  @Field()
  gender: "Male" | "Female" | "Others";

  @Field({ nullable: true })
  skill?: string;
}
