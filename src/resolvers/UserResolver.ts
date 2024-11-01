import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Profile } from "./../entities/Profile";

import { MongoError } from "typeorm";
import { CreateUserInput, CreateUserWithProfile } from "../inputs/User.input";
import { Context } from "../types/Context";
import { mongodbError } from "../utils/handle.mongoError";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Ctx() ctx: Context): Promise<User[]> {
    try {
      return await ctx.db.getRepository(User).find();
    } catch (error: unknown) {
      throw mongodbError(error as MongoError);
    }
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") data: CreateUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    try {
      const userRepo = ctx.db.getRepository(User);
      const newUser = userRepo.create(data);
      return await userRepo.save(newUser);
    } catch (error: unknown) {
      throw mongodbError(error as MongoError);
    }
  }

  @Mutation(() => User)
  async createUserWithProfile(
    @Arg("data") data: CreateUserWithProfile,
    @Ctx() ctx: Context
  ): Promise<User> {
    try {
      const user = new User();
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.isActive = data.isActive;

      const profile = new Profile();
      profile.gender = data.gender;
      profile.skill = data.skill;

      const newProfile = await ctx.db.getRepository(Profile).save(profile);

      // assign the profile
      user.profile = newProfile;

      return ctx.db.getRepository(User).save(user);
    } catch (error) {
      throw mongodbError(error as MongoError);
    }
  }
}
